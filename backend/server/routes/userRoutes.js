const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateToken,isAuth } = require('../../utils');
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

router.put('/profile',isAuth, async (req, res) => {
  const user = await User.findById(req.user._id);

  
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (user) {
    try {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }
      const updateUser = await user.save();
      res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser)
      });
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ message: 'Message Not found'});

  }
    

})




module.exports = router