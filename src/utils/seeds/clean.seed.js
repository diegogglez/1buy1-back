const mongoose = require("mongoose")
const connectDb = require("../database/db")
const Product = require("../../api/products/product.model")

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
.finally(() => mongoose.disconnect());
