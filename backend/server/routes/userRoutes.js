const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils');
const validator = require('validator')
//const bycript = require('bcrypt');


router.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token:generateToken(user)
      });
      return;
    }
  }
  res.status(401).send({message:'Invalid email or password'})
})



router.post('/signup', async (req, res) => {

  const { email, password, name } = req.body


    try {
    const user = await User.signup(email, password,name );
    //Response 
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token:generateToken(user)
      });

    
    

      
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}
  

  //const user = await newUser.save()

)
module.exports = router