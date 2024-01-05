const express = require('express');
const Product = require('../models/productModel');
const User = require('../models/UserModel')
const data = require('../../data');
const router = express.Router();

router.get('/', async(req,res) => {
  //await Product.remove({});
  const createdProducts = await Product.insertMany(data.products)
  res.send({ createdProducts })

  //const createdUsers = await User.insertMany(data.users);
  //res.send({createdUsers})
})


module.exports = router

