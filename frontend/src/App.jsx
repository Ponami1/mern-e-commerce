import Navbar from './component/Navbar';
import Home from './component/Home';
import './App.css'
import { Route, Routes,Navigate } from 'react-router-dom';
import ProductScreen from './component/ProductScreen';
import Footer from './component/Footer';
import CartScreen from './component/CartScreen';
import SigninScreen from './User/SigninScreen';
import { useContext } from 'react';
import { Store } from './Store';
import SignUp from './User/SignUp';
import ShippingAddress from './component/ShippingAddress';
import PaymentMethodScreen from './component/PaymentMethodScreen';
import PlaceOrderScreen from './component/PlaceOrderScreen';
import OrderScreen from './component/OrderScreen';


function App() {
  const { state } = useContext(Store)
  return (
    <div className=' min-h-[100vh]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shopping-cart' element={<CartScreen />} ></Route>
        <Route path='/signin' element={ <SigninScreen />  } ></Route>
        <Route path='/shipping' element={ <ShippingAddress />  } ></Route>
        <Route path='product/:slug' element={<ProductScreen />}></Route>
        <Route path='/signup' element={<SignUp/>} ></Route>
        <Route path='/payment' element={<PaymentMethodScreen />} ></Route>
        <Route path='/placeorder' element={<PlaceOrderScreen />} ></Route>
        <Route path='/order/:id' element={<OrderScreen />} ></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;