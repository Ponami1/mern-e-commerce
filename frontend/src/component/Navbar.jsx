import { Link } from "react-router-dom";
import { Store } from "../Store";
import { useContext } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  }
  return (
    <div>
      <ToastContainer position="bottom-center" limit={1} />
      




      <header className='bg-slate-900 font-bold p-4 flex justify-between items-center'>
        
        <Link className=' text-yellow-50  text-[26px]' to='/'>amazona</Link>
        <Link className=' text-slate-500 text-[22px] border-2 flex  p-2' to='/shopping-cart'>
          Cart
          {cart.cartItems.length > 0 && (
            <div className=" bg-red-600 text-[10px] rounded-full p-2  text-white">
              {cart.cartItems.reduce((a, c) =>a + c.quantity,0)}
            </div>
          )}
          </Link>
        {userInfo ? (
          <div className=" flex gap-2 items-center">
            <p className=" text-white ">{userInfo.name}</p>
            <Link className=" text-white border-2 p-2">User Profile</Link>
            <Link to='/orderhistory' className=" text-white border-2 p-2">Order History</Link>
            <Link className=" text-white border-2 p-2 " onClick={signoutHandler}>Sign Out</Link>
          </div>
        ) : (
            <div className=" flex gap-2">
              <Link to='/signin' className=" text-white">Sign in</Link>
              <p>|</p>
              <Link to='/signup' className=" text-white">Sign Up</Link>
            </div>
        )}
      </header>
      
    </div>
  );
}

export default Navbar;