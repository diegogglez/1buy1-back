const puppeteer = require("puppeteer");

async function main(genericProducts) {
	console.log("DIA");

	const browser = await puppeteer.launch({
		headless: true,
	});

	const page = await browser.newPage();
	const links = [
		"https://www.dia.es/compra-online/frescos/carne/cf",
		"https://www.dia.es/compra-online/frescos/carne/vacuno/cf",
		"https://www.dia.es/compra-online/frescos/pescado-y-marisco/pescado-y-marisco-fresco/cf",
		"https://www.dia.es/compra-online/bebidas/aguas/cf/marcas+DIA",
		"https://www.dia.es/compra-online/bebidas/zumos/cf/sabor+naranja",
		"https://www.dia.es/compra-online/congelados/helados/cf/marcas+TEMPTATION",
		"https://www.dia.es/compra-online/congelados/verduras-y-hortalizas/cf/marcas+VEGECAMPO",
		"https://www.dia.es/compra-online/despensa/lacteos-y-huevos/leche/cf/marcas+DIA-LACTEA",
		"https://www.dia.es/compra-online/despensa/lacteos-y-huevos/mantequilla-y-margarina/cf",
		"https://www.dia.es/compra-online/despensa/pastas-harinas-y-masas/pastas/cf/marcas+AL-DIANTE",
		"https://www.dia.es/compra-online/despensa/aceites-vinagres-y-alinos/aceites/cf/marcas+ALMAZARA-DEL-OLIVAR",
	];

	for (let link of links) {
		await page.goto(link);

		const pageProducts = await page.evaluate(() => {
			const links = document.querySelectorAll("div.product-list__item .prod_grid");

			return Array.from(links).map((a) => {
				const productName = a.querySelector(".details")?.innerText.trim();

				const code = a.getAttribute("data-productcode").trim();

				const priceUd = parseFloat(
					a.querySelector(".price")?.innerText.split("€")[0].trim().replace(",", ".")
				);

				const priceKg = parseFloat(
					a.querySelector(".pricePerKilogram")?.innerText.split("€")[0].trim().replace(",", ".")
				);

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
					if (specificProduct) {
						specificProduct = { ...specificProduct, supermarketName: "dia", logo: "CHANGE ME" };
					}
				}
			});
			if (specificProduct) {
				product.supermarkets.push(specificProduct);
			}
		});
	}

	await browser.close();
}

module.exports = main;
