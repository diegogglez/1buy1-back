const puppeteer = require("puppeteer");

async function main(genericProducts) {
	console.log("ALCAMPO");

	const links = [
		"https://www.alcampo.es/compra-online/frescos/carne/pollo/c/W1301",
		"https://www.alcampo.es/compra-online/frescos/carne/vacuno/c/W1304?q=%3Arelevance",
		"https://www.alcampo.es/compra-online/frescos/pescados-mariscos-y-moluscos/c/W14?q=%3Arelevance%3AcategoryChild%3AW1401%3AEspecie%3ASalm%C3%B3n&text=",
		"https://www.alcampo.es/compra-online/frescos/pescados-mariscos-y-moluscos/c/W14?q=%3Arelevance%3AcategoryChild%3AW1401%3AEspecie%3AMerluza&text=",
		"https://www.alcampo.es/compra-online/bebidas/agua-soda-y-gaseosas/c/W1101",
		"https://www.alcampo.es/compra-online/bebidas/zumos-de-frutas/c/W1102?q=%3Arelevance%3AbrandCode%3A436&text=",
		"https://www.alcampo.es/compra-online/alimentacion/aceite-vinagre-salsas-especias/aceites/c/W2301?q=%3Arelevance%3AisAlcampoBrand%3Atrue&text=",
		"https://www.alcampo.es/compra-online/alimentacion/caldos-pasta-arroz-legumbres-pure/pasta/c/W100501?q=%3Arelevance%3AisAlcampoBrand%3Atrue%3AcategoryChild%3AW100501002",
		"https://www.alcampo.es/compra-online/alimentacion/leche-huevos-yogures-y-lacteos/leche/c/W1603?q=%3Arelevance%3AisAlcampoBrand%3Atrue&text=",
		"https://www.alcampo.es/compra-online/frio-y-congelados/helados/c/W200220184?q=%3Arelevance%3AisAlcampoBrand%3Atrue%3AcategoryChild%3AW120806",
		"https://www.alcampo.es/compra-online/frio-y-congelados/congelados/verduras/esparragos-y-guisantes/c/W120302",
	];

	// await page.waitForTimeout(3000);
	for (let link of links) {
		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();

		await page.goto(link);

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
				const productName = product.querySelector(".productName span")?.innerText.trim();

				const code = product.querySelector("h2 a").getAttribute("data-id");

				const price = product.querySelector(".long-price").innerText.trim();
				const priceUd = parseFloat(price.split("\n")[0].split(" ")[0].replace(",", "."));
				const priceKg = parseFloat(
					price.split("\n")[1].replace("(", "").split(" ")[0].replace(",", ".")
				);

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
					if (specificProduct) {
						specificProduct = {
							...specificProduct,
							supermarketName: "alcampo",
							logo: "CHANGE ME",
						};
					}
				}
			});

			if (specificProduct) {
				product.supermarkets.push(specificProduct);
			}
		});

		await browser.close();
	}

	genericProducts.forEach((product) => console.log(product));
}

module.exports = main;
