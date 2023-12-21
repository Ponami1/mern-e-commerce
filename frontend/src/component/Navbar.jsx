import { Link } from "react-router-dom";
import { Store } from "../Store";
import { useContext } from "react";

function Navbar() {
  const { state } = useContext(Store)
  const { cart } = state;
  return (
    <div>
      <header className='bg-slate-900 font-bold p-4 flex justify-between'>
        <Link className=' text-yellow-50  text-[26px]' to='/'>amazona</Link>
        <Link className=' text-slate-500 text-[20px] border-2 p-2 flex' to='/shopping-cart'>
          Cart
          {cart.cartItems.length > 0 && (
            <div className=" bg-red-600 text-[15px] p-[6px] text-white">
              {cart.cartItems.reduce((a, c) =>a + c.quantity,0)}
            </div>
          )}
        </Link>
      </header>
    </div>
  );
}

export default Navbar;