import Navbar from './component/Navbar';
import Home from './component/Home';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ProductScreen from './component/ProductScreen';
import Footer from './component/Footer';
import CartScreen from './component/CartScreen';
import SigninScreen from './User/SigninScreen';

function App() {
  
  return (
    <div className=' min-h-[100vh]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shopping-cart' element={<CartScreen />} ></Route>
        <Route path='/signin' element={<SigninScreen />} ></Route>
        <Route path='product/:slug' element={<ProductScreen />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;