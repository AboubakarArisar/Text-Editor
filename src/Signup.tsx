import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const baseURL =
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.VITE_PROD_URL
      : import.meta.env.VITE_DEV_URL;

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${baseURL}/api/users/signup`, {
        name,
        email,
        password,
      });
      toast.success("Successfully signed up!");
      navigate("/signin");
    } catch (error) {
      toast.error(
        (error as any).response?.data?.error ||
          "An error occurred during signup"
      );
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-300'>
      <div className='container mx-auto p-4 w-4/5 md:w-2/5 xl:w-1/3 2xl:w-1/4 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
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
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
            onClick={handleSignUp}
            type='button'
          >
            Sign Up
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-700'>Already have an account?</p>
          <button
            className='text-blue-500 hover:text-blue-700 font-semibold'
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
