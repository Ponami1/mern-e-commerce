//
const mongoose = require('mongoose');
const bycript = require('bcryptjs');
const validator = require('validator')

const schema = mongoose.Schema;

const customerSchema = new schema({
  name: {
    type: String,
    required: true
  },
   
  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default:false
  },
},
  {
    timestamps:true
  }
);

customerSchema.statics.signup = async function (email, password,name) {
  if (!email || !password || !name) {
    throw Error('All fields mus be filled ')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  const exists = await this.findOne({ email })
  
  if (exists) {
    throw Error('Email already in use');
  }
  const salt = bycript.genSalt(10)
  const pass = password.toString()

  //Hashing password
  const hash = await bycript.hash(pass, parseInt(salt))
  
  const user = await this.create({ email, password: hash,name });
  
  return user
}

module.exports = mongoose.model('Customer', customerSchema)