import { FaBold } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { MdFormatUnderlined } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CustomEditor = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    Swal.fire({
      title: "Go to Home?",
      text: "You will lose unsaved changes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, go to Home",
      cancelButtonText: "No, stay here",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className='w-full min-h-screen flex flex-col'>
        <div className='w-full h-[20vh] bg-gray-200 '>
          <div className='w-full h-1/2 flex justify-between items-center '>
            <div className='flex justify-center items-center gap-2'>
              <span
                className='p-2 rounded bg-transparent cursor-pointer'
                onClick={handleHomeClick}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='black'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                  />
                </svg>
              </span>
              <span className='text-center'>Document 1</span>
            </div>
            <div className='w-[70%]'>
              <input
                type='text'
                className='p-2 disabled outline-none bg-transparent border-2 border-slate-300 w-1/3 rounded'
                placeholder='search document.....'
              />
            </div>
          </div>
          <div className='w-full h-1/2 flex justify-between p-4'>
            <div className='flex '>
              <span className='p-2  rounded bg-transparent w-12 h-16'>
                <FaBold />
              </span>
              <span className='p-2 rounded bg-transparent w-12 h-16'>
                <GoItalic />
              </span>
              <span className='p-2 rounded bg-transparent w-12 h-16'>
                <MdFormatUnderlined />
              </span>
              <select className='px-3 py-1 rounded border-2 border-slate-300 bg-transparent'>
                <option value='12'>12</option>
                <option value='14'>14</option>
                <option value='16'>16</option>
                <option value='18'>18</option>
                <option value='20'>20</option>
              </select>
            </div>
            <div className='flex gap-2'>
              <button className='px-3 py-1 rounded border-2 border-slate-300 bg-transparent'>
                Comments
              </button>
              <button className='px-3 py-1 rounded border-2 border-slate-300 bg-transparent'>
                Edit
              </button>
              <button className='px-3 py-1 rounded border-2 bg-blue-600'>
                Share
              </button>
            </div>
          </div>
        </div>
        <div className='w-full min-h-screen bg-gray-300 flex justify-center items-center p-6'>
          <div className='w-[65%] h-screen bg-white p-4 rounded flex'>
            <textarea
              className='w-full h-[90%] p-12 outline-none '
              placeholder='One word leads to another, write that first word here....'
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomEditor;
