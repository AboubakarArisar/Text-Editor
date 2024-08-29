import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL =
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.REACT_APP_PROD_URL
      : import.meta.env.REACT_APP_DEV_URL;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("please fill in all fields!");

      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/users/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/editor");
    } catch (error) {
      toast.error("login failed!");
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
