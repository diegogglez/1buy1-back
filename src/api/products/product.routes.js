const express = require('express');
const Product = require('./product.model');
const router = express.Router();
const { isAuth, isAdmin } = require('../../middleware/auth');
const { upload, deleteFile } = require('../../middleware/file');

router.get('/', async (req, res) =>{
  try {
    const allProducts = await Product.find();
    return res.status(200).json(allProducts);
  } catch (error) {
    return next(error)
  }
});

router.post("/addProduct", upload.single("img"), async (req, res, next) => {
  try {
    const product = req.body;
    if (req.file) {
      product.img = req.file.path;
    };
    const newProduct = new Product(product);
    const createdProduct = await newProduct.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;