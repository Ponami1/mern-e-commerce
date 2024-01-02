import { Link,  useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { Store } from '../Store'
import { toast } from 'react-toastify'


function SigninScreen() {
  const navigate = useNavigate()
  const { search } = useLocation();
  console.log(search)
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch} = useContext(Store)
  const {userInfo }= state

  const submitHandler = async (e) => {
    e.preventDefault()
    const user = { email, password };



      const response = await fetch('http://localhost:500/api/users/signin', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if (response.ok) {
        //save the user to local storage 
        ctxDispatch({ type: 'USER_SIGNIN', payload: json })
        localStorage.setItem('userInfo', JSON.stringify(json))
        navigate(redirect || '/')
        console.log(json)

      }

    if (!response.ok) {
      toast.error('Invalid email or password')
      console.log('bad')
    }

      




    //try {
      //const user  = await axios.post('http://localhost:500/api/users/signin', email, password)
      //console.log(user)
    //} catch (error) {
      //console.log(error.message)
    //}
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }

  },[userInfo,redirect,navigate])

  return (
    <div>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-yellow-400 dark:text-white">
            
             amazona
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <form className="space-y-4 md:space-y-6"  onSubmit={submitHandler}>
                <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                </div>
                <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                
  
                <button type="submit" className=" font-bold  bg-yellow-600 hover:bg-blue-700 focus:ring-4 focus:outline-none border-2 focus:ring-primary-300 rounded-lg text-[17px] px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Login here</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  New Customer? <Link to={`/signup?redirect=${redirect}`} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}

export default SigninScreen;