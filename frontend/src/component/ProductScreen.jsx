import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from 'axios'
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";
import getError from "../utils";
import { useContext } from "react";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH _REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}


function ProductScreen() {

  const params = useParams()
  const navigate = useNavigate()
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: ''
  })


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`http://localhost:500/api/products/slug/${slug}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
        console.log(result)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
      

    }
    fetchData()
  }, [slug])

  const { state,dispatch:ctxDispatch} = useContext(Store)
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`http://localhost:500/api/products/${product._id}`)
    if (data.countInStock<quantity) {
      window.alert('sorry. product is out of stock ')
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    navigate('/shopping-cart')
  }
  return (
    loading ? <div>loading</div>
      : error ? <div className=" bg-red-600 text-4xl p-4 flex justify-center text-white mt-8 mr-10 ml-10">{error}</div>
        :
        <div className=" mx-6">
          <div className="flex gap-4 md:gap-12 items-center md:flex-row flex-col-reverse justify-center">
            <img src={product.image} alt={product.name} className=" flex justify-center w-fit" />
            <div className=" flex gap-5">
              <div>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1 className=" text-4xl font-bold p-2">{product.name}</h1>
                <hr />
                <p className=" p-4"><Rating rating={product.rating} numReviews={product.numReviews} /></p>
                <hr />
                <p className=" text-[20px] font-semibold p-2">price:{product.price}</p>
                <hr />
                <p className=" p-3 text-[18px]"><strong>Description</strong>:<br />
                  {product.description}</p>
              </div>
              <div className=" border-2 p-6 mt-2">
                <h3 className=" text-[15px]">price:${ product.price}</h3>
                <h1 className=" text-2xl font-medium  p-2">Status:</h1>
                {product.countInStock > 0 ? <p className=" bg-green-600 p-3 bottom-0 text-white flex justify-center">In Stock</p> : <p className=" bg-slate-500 p-3 text-white">Out of stock</p>}
                {product.countInStock > 0 && (
                  <div className=" mt-6 ">
                    <button onClick={addToCartHandler} className="border-2 p-4 bg-yellow-500 border-black">Add to Cart</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  );
}

export default ProductScreen;