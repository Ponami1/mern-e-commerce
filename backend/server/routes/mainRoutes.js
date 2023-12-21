const express = require('express');
const Product = require('../models/productModel');
const data = require('../../data');
const router = express.Router();

router.get('/', async(req,res) => {
  //await Product.remove({});
  const createdProducts = await Product.insertMany(data.products)
  res.send({createdProducts})
})


module.exports = router

