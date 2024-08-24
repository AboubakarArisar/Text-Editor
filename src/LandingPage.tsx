import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className='flex flex-col h-screen '>
        <div className='flex justify-between items-center h-screen px-14'>
          <div className='w-1/2'>
            <h1 className='text-5xl font-bold mb-4'>DocEditor</h1>
            <p className='text-lg text-gray-600 mb-8'>
              Create, edit, and share documents online
            </p>
          </div>
          <div className='w-1/2 flex justify-center items-center h-full'></div>
        </div>
        <div className='p-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-4'>
              Start creating and editing documents online
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Collaborate with others in real-time, store your documents
              securely, and access them from anywhere
            </p>
            <button
              onClick={() => navigate("/signup")}
              className='bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-2 px-4 rounded'
            >
              Sign up for free
            </button>
            <button
              onClick={() => navigate("/signin")}
              className='bg-[#DB4437] hover:bg-[#C9322F] text-white font-bold py-2 px-4 rounded ml-4'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
