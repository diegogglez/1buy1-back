const carrefourScrapper = require("./scrapperCarrefour");
const diaScrapper = require("./scrapperDia");
const alcampoScrapper = require("./scrapperAlcampo");
let genericProducts = require("./genericProducts");
const axios = require("axios")


const activateScrappers = async () => {

    console.log("Carrefour");
    await carrefourScrapper(genericProducts);
    console.log(genericProducts);

    console.log("Dia");
    await diaScrapper(genericProducts);
    console.log(genericProducts);

    console.log("Alcampo");
    await alcampoScrapper(genericProducts);
    console.log(genericProducts);

    for (let genericProduct of genericProducts) {
        await axios.post("http://localhost:8080/products/addProduct", genericProduct)
    }
}

activateScrappers();

