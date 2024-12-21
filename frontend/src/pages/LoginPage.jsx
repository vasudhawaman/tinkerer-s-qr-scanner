
import React from 'react'
import img from '../assets/1.jpg'
import Navbar from "../components/Navbar";
const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen relative" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      <div className="relative z-10 bg-blue-600 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-extrabold text-white text-3xl text-center mb-6">Login</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-white mb-2">Username</label>
            <input type="text" placeholder="Username" className="p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Password</label>
            <input type="password" placeholder="Password" className="p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
