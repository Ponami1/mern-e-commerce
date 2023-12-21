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


app.use('/api/products',productRoute)









app.listen(PORT,()=>console.log(`app is listening at port ${PORT}`))