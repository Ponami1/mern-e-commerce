const express = require('express');
const router = express.Router();
const { isAuth } = require('../../utils');
const Order = require('../models/orderModel');
const mongoose = require('mongoose');
const expressAsync = require('express-async-handler')

//const bycript = require('bcrypt');


router.post('/', isAuth, expressAsync(async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress:req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: 'New Order Created ', order })
})

)


//router.get('/mine', isAuth, expressAsync(async (req, res) => {
  //const orders = await Order.find({user:req.user._id})
  //res.json(orders)
//console.log(orders)
//})

//)

router.get('/mine', isAuth, expressAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });


    res.json(orders);

}));

router.get('/:id', isAuth, expressAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    res.send(order)
  } else {
    res.status(404).send({message:'Order not found'})
  }

})

)

router.put('/:id/pay', isAuth, expressAsync(async (req, res) => {
    const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updated_time: req.body.updated_time,
      email_address: req.body.email_address,
    }
    const updateOrder = await order.save()
    res.send({message:'Order Paid',order:updateOrder})
  } else {
    res.status(404).send({message:'Order not found'})
  }
})

)

module.exports = router