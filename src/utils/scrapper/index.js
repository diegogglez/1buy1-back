const carrefourScrapper = require("./scrapperCarrefour");
const diaScrapper = require("./scrapperDia");
const alcampoScrapper = require("./scrapperAlcampo");
let genericProducts = require("./genericProducts");
const axios = require("axios")


const activateScrappers = async () => {
    await carrefourScrapper(genericProducts);
    await diaScrapper(genericProducts);
    await alcampoScrapper(genericProducts);

    await axios.post("http://localhost:8080/products/addProduct", genericProducts[0])
}

activateScrappers();

