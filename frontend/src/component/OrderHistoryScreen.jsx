import { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getError from "../utils";


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


function OrderHistoryScreen() {
  const { state } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate();

  const [{loading,error,orders},dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    orders:[],
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      
      try {
        const { data } = await axios.get('http://localhost:500/api/orders/mine',
         
          { headers: { Authorization: `Bearer ${userInfo.token}` } })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
        console.log(data)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
        
      }
    };
    if (!userInfo) {
      return navigate('/signin')
    }
    fetchData()
  },[userInfo,navigate])
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h2>Order History</h2>
      {
        loading ? (
          <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ?(
            <h2>{ error}</h2>
          ) : (
              <table className="md:w-full w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      
                        <td className="md:px-6 px-2 md:py-4">{order._id}</td>
                      <td className="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                      <td className="px-6 py-4">{order.totalPrice.toFixed(2)}</td>
                      <td className="px-6 py-4">{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                      <td className="px-6 py-4">{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'NO'}</td>
                      <td className="px-6 py-4">
                          <button type="button" onClick={() => {
                            navigate(`/order/${order._id}`)
                          }}>
                            Details
                        </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          )
      }
    </div>
  );
}

export default OrderHistoryScreen;