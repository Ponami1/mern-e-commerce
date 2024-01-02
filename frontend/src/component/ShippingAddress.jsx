import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteeps from "./CheckoutSteeps";

function ShippingAddress() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress }
  } = state


  const [fullName, setfullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping')
    }
  }, [userInfo, navigate])
  const submitHandler = (e) => {

    e.preventDefault()
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS', payload: {
        fullName,
        address,
        city,
        postalCode,
        country
      }

    });
    localStorage.setItem('shippingAddress', JSON.stringify({
      fullName,
      address,
      city,
      postalCode,
      country
    }))
    navigate('/payment')
  }
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>


      <div>

        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-2xl font-bold text-gray-800">Shipping Address</a>
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
                  <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="/shipping">2</Link>
                  <span className="font-semibold text-gray-900">Shipping</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="/payment">3</a>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>




          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Shipping Address</p>
            <form onSubmit={submitHandler}>
              <div className="">

                <label className="mt-4 mb-2 block text-sm font-medium">Full Name</label>
                <div className="relative">
                  <input type="text" value={fullName} onChange={(e) => setfullName(e.target.value)} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>

                <label className="mt-4 mb-2 block text-sm font-medium">Address</label>
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                </div>
                <label className="mt-4 mb-2 block text-sm font-medium">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/4 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CITY" />
                <label className="mt-4 mb-2 block text-sm font-medium">Postal Code</label>
                <input type="text" value={postalCode} onChange={(e) => setpostalCode(e.target.value)} className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/4 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="POSTAL CODE" />

                <label className="mt-4 mb-2 block text-sm font-medium"> Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/4 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="COUNTRY" />


              </div>
              <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
            </form>
          </div>
        </div>

      </div>


    </div>
  );
}

export default ShippingAddress;