const puppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();

    // Carrefour page to scrap
	const link =
		"https://www.carrefour.es/supermercado/productos-frescos/carniceria/cat20018/c";

	await page.goto(link);

    // Wait for cookie pop-up
	await page.waitForSelector("#onetrust-reject-all-handler");

    // Clicks cookie pop-up
	await page.evaluate(() => {
		document.querySelector("#onetrust-reject-all-handler").click();
	});

    // Auto-scroll to load all elements
	async function autoScroll(page) {
		await page.evaluate(async () => {
			await new Promise((resolve) => {
				var totalHeight = 0;
				var distance = 250;
				var timer = setInterval(() => {
					var scrollHeight = document.body.scrollHeight;
					window.scrollBy(0, distance);
					totalHeight += distance;

					if (totalHeight >= scrollHeight - window.innerHeight) {
						clearInterval(timer);
						resolve();
					}
				}, 100);
			});
		});
	}
    
    // Checks if the page is the last one of its section
	const isLastPage = async (page) => {
        const nextPage = await page.evaluate(() => {
            return document.querySelector(".pagination__next--disabled");
		});

        return nextPage ? true : false;
	};
    
    // Initialize products array
    let products = [];

    // Initialize variable which tells if you're on the last page (used as condition of the for-loop)
    let isLastPageScrapped = false
    
    // For-loop, adds cont at the end of the link going to the next page
	for (let cont = 0; !isLastPageScrapped; cont += 24) {
        
        console.log("Starting");

        // Goes to the next page, goes to home and stops if last page
        if ( cont != 0 ) {
            await page.goto(`${link}` + `?offset=${cont}`);
        }

        await autoScroll(page);

		const pageProducts = await page.evaluate(async () => {

            // Takes the card of the product
            const cards = document.querySelectorAll("ul.product-card-list__list .product-card__detail");

			return Array.from(cards).map((product) => {

                // Takes the name of the product
                const name = product.querySelector("h2.product-card__title a")?.innerText.trim();

				// Takes the link and parses it
                let id = product.querySelector("h2.product-card__title a")?.href.trim().split("/");
				id = id[id.length - 2];

                // Takes the price of the product and parses it
				let priceUd = product.querySelector("span.product-card__price")?.innerText.trim();
				priceUd = !priceUd
                ? product.querySelector("span.product-card__price--current")?.innerText.trim()
                : priceUd;
				priceUd = priceUd.split(" ")[0].replace(",", ".");

                // Takes the price per kg of the product and parses it
				let priceKg = product.querySelector("span.product-card__price-per-unit")?.innerText.trim();
				priceKg = priceKg.split(" ")[0].replace(",", ".");
                
                // Returns a made-up object with the key data
				return { name, id, priceUd, priceKg };
			});
		});

        // Adds the array of objects 
		products = [...products, ...pageProducts];
        
        // Checks if last page
        isLastPageScrapped = await isLastPage(page)

        console.log("Going to the next page");
	}

	// Filters the products into different categories
    const chickenProducts = products.filter(product => product.name.toLowerCase().includes("pollo"));
    const turkeyProducts = products.filter(product => product.name.toLowerCase().includes("pavo"));
    const porkProducts = products.filter(product => product.name.toLowerCase().includes("cerdo"));
    const beefProducts = products.filter(product => product.name.toLowerCase().includes("vacuno"));

	// Debuggin time
	console.log(chickenProducts.length);
	console.log(turkeyProducts.length);
	console.log(porkProducts.length);
	console.log(beefProducts.length);

    // Writes the file with the info
	fs.writeFileSync("./productosCarniceriaPollo", JSON.stringify(chickenProducts));
	fs.writeFileSync("./productosCarniceriaPavo", JSON.stringify(turkeyProducts));
	fs.writeFileSync("./productosCarniceriaCerdo", JSON.stringify(porkProducts));
	fs.writeFileSync("./productosCarniceriaVacuno", JSON.stringify(beefProducts));

    // Exits
	await browser.close();
}

main();
