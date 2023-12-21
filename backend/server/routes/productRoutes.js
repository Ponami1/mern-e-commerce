const express = require('express');
const Product = require('../models/productModel');
const mongoose = require('mongoose')

const router = express.Router();


router.get('/:id', async (req,res) => {
  const product = await Product.findById(req.params.id)
   //Handle unknow id
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({erro:"no such workout"})
  }

  if (product) {
    res.send(product);
  }
  else {
    res.status(404).json({message:'Product Not found'})
  }
})


router.get('/slug/:slug', async(req,res) => {
  const product = await Product.findOne({slug:req.params.slug})
  if (product) {
    res.send(product);
  }
  else {
    res.status(404).json({message:'Product Not found'})
  }
})







router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products)
})




module.exports = router