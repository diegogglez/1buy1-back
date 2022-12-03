const puppeteer = require("puppeteer");


async function main(genericProducts) {
    
    console.log("DIA");

    const browser = await puppeteer.launch({
		headless: true,
	});

	const page = await browser.newPage();
	await page.goto("https://www.dia.es/compra-online/frescos/carne/cf");

	const pageProducts = await page.evaluate(() => {
		const links = document.querySelectorAll("div.product-list__item .prod_grid");

		return Array.from(links).map((a) => {
			const productName = a.querySelector(".details")?.innerText.trim();

			const code = a.getAttribute("data-productcode").trim();

			const priceUd = parseFloat(a.querySelector(".price")?.innerText.split("€")[0].trim().replace(",", "."));

			const priceKg = parseFloat(a
				.querySelector(".pricePerKilogram")
				?.innerText.split("€")[0]
				.trim()
				.replace(",", "."));

			return { productName, code, priceUd, priceKg };
		});
	});

	genericProducts.forEach((product) => {
		let specificProduct;

		product.productCode.forEach((supermarket) => {
			if (supermarket.supermarketName === "dia") {
				specificProduct = pageProducts.find((product) => {
					return product.code === supermarket.supermarketCode;
				});

				specificProduct = { ...specificProduct, supermarketName: "dia", logo: "CHANGE ME" };
			}
		});

		product.supermarkets.push(specificProduct);
	});

	console.log(genericProducts[0]);
	await browser.close();
}

module.exports = main;
