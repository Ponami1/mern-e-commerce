import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
function PaymentMethodScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const navigate = useNavigate()
  const {
    cart:{shippingAddress,paymentMethod}
  } = state
  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal')
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  },[shippingAddress,navigate])
  const submitHandler = (e) => {
    e.preventDefault()
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
    localStorage.setItem('paymentMethod', paymentMethodName)
    navigate('/placeorder')
  }
  return (
    <div>
      <Helmet>
        <title>Payment method</title>
      </Helmet>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        
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
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">3</a>
                <span className="font-semibold text-gray-900">Payment</span>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">4</a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h1 className=" text-4xl mt-4 mx-3 font-semibold">Payment method</h1>
      <form onSubmit={submitHandler}>
        <div className=" mx-4 ">
          <label className=" block text-2xl font-medium">Paypal</label>
          <input className=" block" type='radio' id="PayPal" value='PayPal' checked={paymentMethodName == 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} />
          <label className=" block text-2xl font-medium">Stripe</label>
          <input className=" block" type='radio' id="Stripe" value='Stripe' checked={paymentMethodName == 'Stripe'} onChange={(e) => setPaymentMethod(e.target.value)} />
          <button className=" border-2 p-2 mt-2 text-[18px] rounded-full bg-yellow-300 font-medium">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;