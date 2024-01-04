import { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify'
import getError from "../utils";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loading: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state
  }
}


function ProfileScreen() { 
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate();
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [{ loadingUpdate},dispatch] = useReducer(reducer, {
    loadingUpdate:false
  })
  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('password do not match')
    }
    const user = { name, email, password };


      const response = await fetch('http://localhost:500/api/users/profile', {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      })

      const json = await response.json()


      if (response.ok) {
        //save the user to local storage 
        dispatch({ type: 'UPDATE_SUCCESS' })
      
        ctxDispatch({ type: 'USER_SIGNIN', payload: json })
        localStorage.setItem('userInfo', JSON.stringify(json))
        toast.success('User Updated successfully')
        navigate('/profile')

      }
     

      if (!response.ok) {
      dispatch({ type: 'UPDATE_FAIL' })
      if (response.status === 401) {
        toast.error('Unauthorized. Please log in again.');
      } else {
        toast.error('Failed to update user profile.');
      }
    }

  
  }
  return (
    <div>
      <Helmet>
        <title>User Profile</title>
      </Helmet>

      <h1 className="text-xl mx-5 mt-8 font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">User Profile</h1>
      <div className="flex flex-col items-center justify-center px-2 py-8  md:h-screen lg:py-0">
      <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required="" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        </div>


        <button type="submit" className=" font-bold  bg-yellow-600 hover:bg-blue-700 focus:ring-4 focus:outline-none border-2 focus:ring-primary-300 rounded-lg text-[17px] px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Update</button>
        
        </form>
        </div>
    </div>
  );
}

export default ProfileScreen;