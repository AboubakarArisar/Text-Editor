import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length == 0 || email.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the form",
      });
    } else {
      navigate("/editor");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-300'>
      <div className='container mx-auto p-4 w-4/5 md:w-2/5 xl:w-1/3 2xl:w-1/4 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
