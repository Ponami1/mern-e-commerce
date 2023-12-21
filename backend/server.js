require('dotenv').config()
const express = require('express')
const app = express();
const data = require('./data')
PORT = process.env.PORT || 5000
const cors = require('cors')
const mainRoute = require('./server/routes/mainRoutes')
const productRoute = require('./server/routes/productRoutes')
const mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


 mongoose.connect(process.env.DB_C);
    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to the database'));


app.use('/api/seed',mainRoute)


app.get('/api/products',productRoute)


router.get('/api/products/slug/:slug', (req,res) => {
  const product = data.products.find((x) => x.slug === req.params.slug)
  if (product) {
    res.send(product);
  }
  else {
    res.status(404).json({message:'Product Not found'})
  }
})


router.get('/api/products/:id', (req,res) => {
  const product = data.products.find((x) => x._id === req.params.id)
 
  if (product) {
    res.send(product);
  }
  else {
    res.status(404).json({message:'Product Not found'})
  }
})






app.listen(PORT,()=>console.log(`app is listening at port ${PORT}`))