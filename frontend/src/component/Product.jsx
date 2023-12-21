import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";


function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart } = state;
  const { cartItems } = cart;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`http://localhost:500/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('sorry. product is out of stock ')
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }

  return (
    <div>
      <div  className='border-2 p-2 m-6 items-center'>
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} className=' w-[100%] max-w-[400px]' />
        </Link>
        <div className='p-5'>
          <Link to={`/product/${product.slug}`}>
            <p className='text-2xl'>{product.name}</p> 
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews}/>
          <p className='mb-3 text-2xl'><strong>$</strong>{product.price}</p>
          <div className='bottom-0 w-full'>
            <button onClick={()=>addToCartHandler(product)}  className=' text-2xl font-semibold border-[3px] border-black p-2 bg-yellow-400'>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;