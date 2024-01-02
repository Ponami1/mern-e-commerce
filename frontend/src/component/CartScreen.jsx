import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart } = state;
  const { cartItems } = cart;
  const { userInfo } = state;
  const navigate = useNavigate()

  const updateCartHandler = async (item, quantity) => {
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

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }
  return (
    <div>
      <Helmet>
        <title>Shopping cart</title>
      </Helmet>
      

      
  

      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <p className=" mt-6 flex justify-center text-4xl border-2 md:mx-40 p-3">Cart is empty <strong><Link to='/' className=" ml-2 underline">Go Shopping</Link></strong></p>
          ) : (
          <div>
              {
                cartItems.map((item) =>(
                  <div key={item._id} className="flex flex-col md:flex-row gap-4">
              
                    <div className="md:w-3/4">
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
                                  <img className="h-16 w-16 mr-4" src={item.image} alt={item.name}  />
                                  <span className="font-semibold">{ item.name}</span>
                                </div>
                              </td>
                              <td className="py-4">{ item.price}</td>
                              <td className="py-4">
                                <div className="flex items-center">
                                  <button className="border rounded-md py-2 px-4 mr-2" onClick={() => updateCartHandler(item, item.quantity - 1)} disabled={item.quantity <= 0}>-</button>
                                  <span className="text-center w-8">{ item.quantity}</span>
                                  <button className="border rounded-md py-2 px-4 ml-2" onClick={() => updateCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock}>+</button>
                                </div>
                              </td>
                              <td className="py-4">{item.price }</td>
                            </tr>
                    
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                          <span>Subtotal</span>
                          <span>({cartItems.reduce((a, c) => a + c.quantity, 0) }{'  '}
                            item)</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Taxes</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Shipping</span>
                          <span>$0.00</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold">$ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
                        </div>
                        <button onClick={checkoutHandler} type=" button" disabled={cartItems.length === 0} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                      </div>
                    </div>
                  </div>
                ))
                }
              </div>  
                )
          }
        </div>
          
      </div>
    </div>
  );
}

export default CartScreen;