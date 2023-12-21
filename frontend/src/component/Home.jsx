
import { useEffect, useReducer } from "react";
import axios from 'axios'
import Product from "./Product";
import { Helmet } from "react-helmet-async";

const reducer = (state,action) => {
  switch (action.type) {
    case 'FETCH _REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}


function Home() {
  //const [products, setProduct] = useState([])
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products:[],
    loading: true,
    error:''
  })


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('http://localhost:500/api/products')
        dispatch({type:'FETCH_SUCCESS',payload:result.data})
      } catch (error) {
        dispatch({type:'FETCH_FAIL',payload:error.message})
      }
      
     
    }
    fetchData()
  }, [])
  
  return (
    <div>
      <main className='mx-3 flex-1'>
        <Helmet>
          <title>Amazona</title>
        </Helmet>
        <h1 className='text-4xl mb-4 font-extrabold tracking-tight md:text-6xl dark:text-white'>Featured Products</h1>
        <div className='flex gap-2 flex-wrap justify-center'>
          {
            loading ? (
              <div className=" text-6xl">loading</div>
            ) : error ? (<div>{error}</div>)
              : (
            products.map(product => (
              <Product product={product} key={product.slug} />
              )))}
        </div>
      </main>
    </div>
  );
}

export default Home;