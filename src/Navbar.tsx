import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className='bg-white p-4 shadow-xl sticky top-0'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <img
            src='doc.png'
            alt='Logo'
            className='w-8 h-8 mr-2 hover:pointer'
          />
          <h2
            className='text-lg font-bold hover:pointer'
            onClick={() => navigate("/")}
          >
            DocEditor
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
