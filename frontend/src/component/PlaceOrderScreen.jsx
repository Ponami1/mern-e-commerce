import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from 'react-toastify'
import getError from "../utils";
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true }
    case 'CREATE_SUCCESS':
      return { ...state, loading: false }
    case 'CREATE_FAIL':
      return { ...state, loading: false }
    default:
      return state;
  }
}

function PlaceOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  const navigate = useNavigate()

  console.log(userInfo)
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,

  })
  const round2 = (num) => Math.round(num * 10 + Number.EPSILON)
  cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)


  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(4);
  cart.taxPrice = 0.15 * cart.itemsPrice
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' })

      const response = await axios.post('http://localhost:500/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`
          }
        })

      if (response.status === 201) {
        ctxDispatch({ type: 'CART_CLEAR' });
        dispatch({ type: 'CREATE_SUCCESS' });
        localStorage.removeItem('cartItems');
        console.log(`/order/${response.data.order._id}`);
        navigate(`/order/${response.data.order._id}`);
      } else {
        dispatch({ type: 'CREATE_FAIL' });
        toast.error("Failed to create order");
      }
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
      console.log(err);
    }


  }

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [navigate, cart])
  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="/placeorder" className="text-2xl font-bold text-gray-800">Place Order</a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" to='/'
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                  ></Link>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>

              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" to='/shipping'
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                  ></Link>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>

              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" to='/payment'
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                  ></Link>
                <span className="font-semibold text-gray-900">Payment</span>
              </li>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>


              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="/placeorder">4</a>
                <span className="font-semibold text-gray-900">Place Order</span>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #13432</h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div>
              {
                cart.cartItems.map((item) => (
                  <div key={item._id} className="flex flex-col md:flex-row gap-16 ">

                    <div className="md:w-full">
                      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left font-semibold">Product</th>
                              <th className="text-left font-semibold">Price</th>
                              <th className="text-left font-semibold">Quantity</th>
                              <th className="text-left font-semibold">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-4">
                                <div className="flex items-center">
                                  <img className="h-16 w-16 mr-4" src={item.image} alt={item.name} />
                                  <span className="font-semibold mx-2"><Link to={`/product/${item.slug}`}>{item.name}</Link></span>
                                </div>
                              </td>
                              <td className="py-4">{item.price}</td>
                              <td className="py-4">
                                {item.quantity}
                              </td>
                              <td className="py-4">{item.price}</td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                ))
              }
            </div>
            <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${cart.shippingPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Tax</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${cart.taxPrice}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${cart.totalPrice}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">

                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800"><strong>Name: </strong>{cart.shippingAddress.fullName}<br />
                      <br />
                      <strong>Country:</strong> {cart.shippingAddress.country},<br />
                      <strong>City:</strong> {cart.shippingAddress.city}</p>
                  </div>

                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 fleex justify-center focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"><Link to='/shipping'>Edit Shipping Details</Link></button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">David Kent</p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">10 Previous Orders</p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email" />
                  <img className="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email" />
                  <p className="cursor-pointer text-sm leading-5 ">david89@gmail.com</p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"> {cart.shippingAddress.address} {cart.shippingAddress.address} {cart.shippingAddress.city}</p>
                  </div>

                  <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                    <div className="flex justify-between items-start w-full">
                      <div className="flex justify-center items-center space-x-4">


                        <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800"><strong>Payment: </strong>{cart.paymentMethod}<br />
                          <br />
                        </p>
                      </div>

                    </div>
                    <div className="w-full flex justify-center items-center">
                      <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 flex justify-center focus:ring-gray-800 py-5 w-96  bg-gray-800 text-base font-medium leading-4 text-white"><Link to='/payment'>Edit Method</Link></button>
                    </div>
                  </div>

                </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base  leading-4 text-gray-800">Place Order</button>
                </div>
                {loading && <p>loading</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PlaceOrderScreen;