const mongoose = require("mongoose")
const connectDb = require("../database/db")
const Product = require("../../api/products/product.model")

const productos = [
    {
        name: "yogur griego natural",
        img: "https://cdn-icons-png.flaticon.com/512/76/76208.png",
        category: "lácteos",
        productLinks: [],
        supermarkets: [
            {
                name: "carrefour",
                productName: "Yogur griego natural Carrefour Extra pack de 6 unidades de 125 g.",
                priceUd: 1.45,
                priceKg: 1.93,
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/1000px-Carrefour_logo.svg.png"
            },
            {
                name: "alcampo",
                productName: "Yogur griego sabor natural PRODUCTO ALCAMPO 4 x 125 g.",
                priceUd: 0.96,
                priceKg: 1.92,
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_Alcampo-modified.png"
            },
            {
                name: "dia",
                productName: "DIA FIDIAS yogur griego natural pack 6 unidades 125 gr",
                priceUd: 1.59,
                priceKg: 2.12,
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Dia_Logo.svg/1280px-Dia_Logo.svg.png"
            }
        ]
    },
    {
        name: "leche entera",
        img: "https://cdn-icons-png.flaticon.com/512/684/684614.png",
        category: "lácteos",
        productLinks: [],
        supermarkets: [
            {
                name: "carrefour",
                productName: "Leche entera Carrefour brik 1 l.",
                priceUd: 0.94,
                priceL: 0.94,
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/1000px-Carrefour_logo.svg.png"
            },
            {
                name: "alcampo",
                productName: "Leche entera de vaca PRODUCTO ALCAMPO 1 l.",
                priceUd: 0.94,
                priceL: 0.94,
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_Alcampo-modified.png"
            },
            {
                name: "dia",
                productName: "DIA LACTEA leche entera envase 1 lt",
                priceUd: 0.95,
                priceL: 0.95,
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Dia_Logo.svg/1280px-Dia_Logo.svg.png"
            }
        ]
    },
    {
        name: "dorada porque a Luisfer le encanta la dorada",
        img: "https://images.assetsdelivery.com/compings_v2/marysan9/marysan91909/marysan9190900118.jpg",
        category: "pescadería",
        productLinks: [],
        supermarkets: [
            {
                name: "carrefour",
                productName: "Dorada de ración Carrefour 600 g aprox",
                priceKg: 6.95,
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/1000px-Carrefour_logo.svg.png"
            },
            {
                name: "alcampo",
                productName: "Dorada grande mostrador 800 Gramos Aproximados",
                priceKg: 8.95,
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_Alcampo-modified.png"
            },
            {
                name: "dia",
                productName: "Filete de dorada bandeja (peso aprox. 350 gr)",
                priceKg: 20.80,
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Dia_Logo.svg/1280px-Dia_Logo.svg.png"
            }
        ]
    }

];

connectDb()
.then(async () => {
    const allProducts = await Product.find().lean()

    if (!allProducts.length){
        console.log("[seed]: No products found, continuing...");
    } else {
        console.log(`[seed]: ${allProducts.length} product(s) found.`);
		await Product.collection.drop();
		console.log("[seed]: Collection 'products' succesfully removed");
    }
})
.catch((error) => console.log("There has been an error removing the products ---> " + error))
.then( async () => {
    await Product.insertMany(products)
    console.log("[seed]: New products succesfully uploaded to the database");
})
.catch((error) => console.log("There has been an error inserting the products ---> " + error))
.finally(() => mongoose.disconnect());
