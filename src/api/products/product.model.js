const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        img: {type: String, required: true},
        category: {type: String, required: true, trim: true, enum: ["lácteos, pescadería"]},
        productLinks: [
            {
                supermarketName: {type: String, trim: true},
                supermarketLink: {type: String},
            }
        ],
        supermarkets: [
            {
                name: {type: String, required: true, trim: true},
                productName: {type: String, required: true, trim: true},
                priceUd: {type: mongoose.Types.Decimal128, trim: true},
                priceKg: {type: mongoose.Types.Decimal128, trim: true},
                priceL: {type: mongoose.Types.Decimal128, trim: true},
                logo: {type: mongoose.Types.Decimal128, required: true, trim: true},
            }
        ]
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;