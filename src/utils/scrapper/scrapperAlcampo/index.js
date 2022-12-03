const puppeteer = require("puppeteer");

async function main(genericProducts) {

	console.log("ALCAMPO");

	const browser = await puppeteer.launch({ 
        headless: false
    });
	const page = await browser.newPage();

	await page.goto("https://www.alcampo.es/compra-online/frescos/carne/pollo/c/W1301");
	
    await page.waitForSelector(".cookie-button");

	await page.evaluate(() => {
		const cookieButton = document.querySelector(".cookie-button");
		cookieButton.click();
	});

	await page.waitForSelector(".popupMyStore");

	await page.evaluate(() => {
		document.querySelector("#header-container").click();
		setTimeout(() => {
			document.querySelector(".first-time-overlay").click();
		}, 500);
	});

	const pageProducts = await page.evaluate(() => {
		const products = document.querySelectorAll(".productGridItem");
		return Array.from(products).map((product) => {
			const productName = product.querySelector(".productName span").innerText.trim();

            const code = product.querySelector("h2 a").getAttribute("data-id")

			const price = product.querySelector(".long-price").innerText.trim();
			const priceUd = parseFloat(price.split("\n")[0].split(" ")[0].replace(",", "."));
			const priceKg = parseFloat(price.split("\n")[1].replace("(", "").split(" ")[0].replace(",", "."));

			return { productName, code, priceUd, priceKg };
		});
	});

    genericProducts.forEach((product) => {
		let specificProduct;

		product.productCode.forEach((supermarket) => {
			if (supermarket.supermarketName === "alcampo") {
				specificProduct = pageProducts.find((product) => {
					return product.code === supermarket.supermarketCode;
				});

				specificProduct = { ...specificProduct, supermarketName: "alcampo", logo: "CHANGE ME" };
			}
		});

		product.supermarkets.push(specificProduct);
	});


	console.log(genericProducts[0]);
	await browser.close();
}

module.exports = main;
