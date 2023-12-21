const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

Product.getMaxListeners('/', async (req, res) => {
  const products = Product.find();
  res.send(products)
})



module.exports = router