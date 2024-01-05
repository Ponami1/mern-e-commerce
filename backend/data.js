const bcrypt = require('bcryptjs');


const data = {

  products: [
    {
  
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/boats.jpg',
      price: 120,
      countInStock: 6,
      brand: 'Nike ',
      rating: 1,
      numReviews: 9,
      description: 'high quality shirt',
      
    },
    {

      name: 'Nike Slim Pants',
      slug: 'nike-slim-Pant',
      category: 'Pants',
      image: '/images/n1.jpg',
      price: 29,
      countInStock: 16,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 9,
      description: 'high quality product',
      
    },
    {
      name: 'Adidas Fit shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/psg.jpg',
      price: 180,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 19,
      description: 'high quality shirt',
      
    },
  ]
}

module.exports = data 