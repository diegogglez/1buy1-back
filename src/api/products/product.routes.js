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
    return res.status(500).json(error.message)
  }
});

module.exports = router;