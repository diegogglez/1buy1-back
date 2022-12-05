const puppeteer = require("puppeteer");

async function main(genericProducts) {
	
	const browser = await puppeteer.launch({
		headless: true
	});
	const page = await browser.newPage();

    // Carrefour page to scrap
	const links = [
		"https://www.carrefour.es/supermercado/productos-frescos/carniceria/cat20018/c",
        "https://www.carrefour.es/supermercado/productos-frescos/pescaderia/pescado-fresco/cat20125/c",
        "https://www.carrefour.es/supermercado/bebidas/aguas-y-zumos-carrefour/F-1123Z10si/c",
        "https://www.carrefour.es/supermercado/el-mercado/verduras-y-hortalizas/verduras-y-hortalizas-congeladas-carrefour-guisante/F-15ewZ10siZ1726/c",
        "https://www.carrefour.es/supermercado/la-despensa/helados-carrefour/F-10yoZ10si/c",
        "https://www.carrefour.es/supermercado/la-despensa/lacteos-carrefour/F-10tjZ10si/c",
        "https://www.carrefour.es/supermercado/la-despensa/alimentacion/pastas-carrefour-macarrones/F-10etZ10siZ11bp/c",
        "https://www.carrefour.es/supermercado/la-despensa/alimentacion/aceites-y-vinagres-carrefour-aceite-de-oliva-virgen-extra/F-108gZ10siZp646/c"
    ]

    await page.goto("https://www.carrefour.es");
    
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
        const numbers = await page.evaluate(() => {
            const spans = document.querySelectorAll(".pagination__results-item");

            return Array.from(spans).map(span => span.innerText)
		});

        return numbers[1] === numbers[2] ? true : false;
	};
    
    for (let link of links) {

        await page.goto(link);
        
        // Initialize products array
        let allProducts = [];
    
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
                    const productName = product.querySelector("h2.product-card__title a")?.innerText.trim();
    
                    // Takes the link and parses it
                    let code = product.querySelector("h2.product-card__title a")?.href.trim().split("/");
                    code = code[code.length - 2];
    
                    // Takes the price of the product and parses it
                    let priceUd = product.querySelector("span.product-card__price")?.innerText.trim();
                    priceUd = !priceUd
                    ? product.querySelector("span.product-card__price--current")?.innerText.trim()
                    : priceUd;
                    priceUd = parseFloat(priceUd.split(" ")[0].replace(",", "."));
                    
                    // Takes the price per kg of the product and parses it
                    const pricePerArbitraryUnit = product.querySelector("span.product-card__price-per-unit")?.innerText.split(" ");
                    let priceKg;
                    let priceL;
                    if (pricePerArbitraryUnit[1].includes("kg")) {
                        priceKg = parseFloat(pricePerArbitraryUnit[0].trim().replace(",", "."))
                    } else if (pricePerArbitraryUnit[1].includes("l")){
                        priceL = parseFloat(pricePerArbitraryUnit[0].trim().replace(",", "."))
                    }
                    
                    // Returns a made-up object with the key data
                    return { productName, code, priceUd, priceKg, priceL };
                });
            });

            // Adds the array of objects 
            allProducts = [...allProducts, ...pageProducts];
            
            // Checks if last page

            isLastPageScrapped = await isLastPage(page)
    
            console.log("Going to the next page");
        }
    
        genericProducts.forEach( product => {
    
            let specificProduct;
    
            product.productCode.forEach( supermarket => {
                if (supermarket.supermarketName === "carrefour") {
                    specificProduct = allProducts.find( product => {
                        return product.code === supermarket.supermarketCode
                    })
    
                    if ( specificProduct ) {
                        specificProduct = {
                            ...specificProduct, 
                            supermarketName: "carrefour", 
                            logo: "https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670203726/icons/supermarket-logos/superLogos-03_v3ulsb.svg"}
                    }
                }
                    
            })
    
            if (specificProduct) {
                product.supermarkets.push(specificProduct)
            }
    
        })
    
    }

	/* fs.writeFileSync(path.resolve(__dirname, "./genericProducts.js"), JSON.stringify(genericProducts)) */
	

    // Exits
	await browser.close();
}

module.exports = main;
