require('dotenv').config()
const express = require('express')
const app = express();
const data = require('./data')
PORT = process.env.PORT || 5000
const cors = require('cors')
const mainRoute = require('./server/routes/mainRoutes')
const productRoute = require('./server/routes/productRoutes');
const userRoute = require('./server/routes/userRoutes');
const orderRoute = require('./server/routes/orderRoutes')
const mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173", "https://mern-ecommerce-app.onrender.com"]
}));

 mongoose.connect(process.env.DB_C);
    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to the database'));

app.get('/api/keys/paypal', (req,res) => {
    res.send(process.env.CLIENT_ID || 'sb')
})

app.use('/api/seed', mainRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);



app.listen(PORT, () => console.log(`app is listening at port ${PORT}`))
