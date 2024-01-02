import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import axios from "axios";
import getError from "../utils";
import { Helmet } from 'react-helmet-async'
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false,successPay:false };
    default:
      return state
  }
}

function OrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const params = useParams();
  const { id: orderId } = params
  const navigate = useNavigate()
  const [{ loading, error, order,successPay,loadingPay }, dispatch] = useReducer(reducer, {
    loading: true,
    order: null,
    error: '',
    successPay: false,
    loadingPay:false
  })

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data,actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount:{value:order.totalPrice},
          }
        ]
      })
      .then((orderID) => {
      return orderID
    })
  }

  function onApprove(data,actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' })
        const { data } = await axios.put(
          `http://localhost:500/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` }
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data })
        toast.success('Order is Paid')
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) })
        toast.error(getError(err))
      }
    }

    )
  }

  function onError(err) {
    toast.error(getError(err))
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`http://localhost:500/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
        console.log(data)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })

      }
    }
    if (!userInfo) {
      return navigate('/login')
    }
    if (
      !order || successPay||  (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({type:'PAY_RESET'})
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('http://localhost:500/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          }
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      loadPaypalScript();
    }
  }, [navigate, userInfo, order, orderId, paypalDispatch,successPay])
  return (
    <div>
      {loading ?
        (<p>loading</p>)
        :
        error ? (
          <p>{error}</p>
        )
          : (
            <div>
              <Helmet>
                <title> Order {orderId}</title>

              </Helmet>
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order {orderId}</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
              </div>

              <div className=" flex justify-center">
                <div>
                  <div>
                    <div className=" border-2 p-4   mx-7 mt-3 mb-3">
                      <h2 className=" text-2xl mb-2 font-semibold">Shipping</h2>
                      <strong>Name:</strong> <span>{order.shippingAddress.fullName}</span><br />
                      <strong>Address:</strong> <span>{order.shippingAddress.address}</span>,
                      <span>{order.shippingAddress.city}</span>,<span>{order.shippingAddress.postalCode}</span>,<span>{order.shippingAddress.country}</span>

                      {order.isDelivered ? (
                        <p className=" bg-green-400 p-3 font-semibold   mt-3">  Delivered at {order.deliveredAt}</p>
                      )
                        : (
                          <p className=" bg-red-400 p-3 font-semibold   mt-3"> Not Delivered </p>
                        )
                      }
                    </div>
                  </div>
                  <div className=" border-2 p-4  mx-4 mt-3 mb-3">
                    <h2 className=" text-2xl mb-2 font-semibold">Shipping</h2>
                    <h1><strong>Method:</strong> {order.paymentMethod}</h1>
                    {
                      order.isPaid ? (
                        <p className=" bg-green-400 p-3 font-semibold   mt-3">Paid At {order.paidAt}</p>
                      ) : (
                        <p className=" bg-red-400 p-3 font-semibold   mt-3">Not paid</p>
                      )
                    }
                  </div>
                  <div className="border-2 p-4  mx-4 mt-3 mb-3">
                    <h2 className=" text-2xl mb-2 font-semibold">Items</h2>
                    <div>
                      {order.orderItems.map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                          <div className=" w-1/2">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <Link to={`/product/${item.slug}`} className=" underline text-blue-500">{item.name}</Link>
                          <p>{item.quantity}</p>
                          <p>${item.price}</p>
                        </div>

                      )
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="border-2   ml-6 w-full mt-3 mb-3 p-5">
                    <p className="text-xl font-medium mb-3">Order Summary</p>
                    <div className=" flex justify-between mx-4 mb-2">
                      <h3 className=" font-semibold">Items</h3>
                      <p>${order.itemsPrice.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className=" flex justify-between mx-4 mb-2">
                      <h3>Shipping</h3>
                      <p>${order.shippingPrice.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className=" flex justify-between mx-4 mb-2">
                      <h3>Tax</h3>
                      <p>${order.itemsPrice.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className=" flex justify-between mx-4 mt-2">
                      <h3>Order Total</h3>
                      <p>${order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      {!order.isPaid && (
                        <div>
                          {isPending ? (
                            <p>Loading</p>
                          ) : (
                            <div>
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                          )}
                          {loading && <p>Loading</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
      }
    </div>
  );
}

export default OrderScreen;