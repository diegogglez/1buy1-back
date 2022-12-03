const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        img: {type: String, required: true},
        category: {type: String, required: true, trim: true},
        productCode: [
            {
                supermarketName: {type: String, trim: true},
                supermarketCode: {type: String},
            }
        ],
        supermarkets: [
            {
                supermarketName: {type: String, required: true, trim: true},
                productName: {type: String, required: true, trim: true},
                priceUd: {type: Number, trim: true},
                priceKg: {type: Number, trim: true},
                priceL: {type: Number, trim: true},
                supermarketCode: {type: String},
                logo: {type: String, required: true, trim: true},
            }
        ]
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;