const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }, process.env.SECRET, {
    expiresIn:'30d',
  })
}

const isAuth = (req,res,next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(
      token,
      process.env.SECRET,
      (err,decode) => {
        if (err) {
          res.status(401).send({message:'Invalid Token'})
        } else {
          req.user = decode;
          next()
        }
      }
    )
  } else {
    res.status(401).send({message:'No Token'})
  }
}

module.exports ={ generateToken,isAuth}