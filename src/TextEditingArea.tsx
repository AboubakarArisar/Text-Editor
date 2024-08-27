import { FaBold } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { MdFormatUnderlined } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CustomEditor = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [documentId, setDocumentId] = useState(""); // State to hold the document ID
  const [content, setContent] = useState(""); // State to hold the document content

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

  const handleShare = async () => {
    if (!documentId) {
      Swal.fire({
        icon: "error",
        title: "No Document ID",
        text: "Please save the document first.",
      });
      return;
    }

    try {
      const response = await axios.post(`/api/documents/${documentId}/share`);
      setLink(response.data.link);

      Swal.fire({
        title: "Shareable Link",
        text: "The link to share your document is ready.",
        input: "text",
        inputValue: response.data.link,
        inputAttributes: {
          readonly: true,
        },
        showCancelButton: true,
        confirmButtonText: "Copy Link",
        cancelButtonText: "Close",
        preConfirm: () => {
          navigator.clipboard.writeText(link);
          Swal.fire({
            icon: "success",
            title: "Link Copied!",
            text: "The shareable link has been copied to your clipboard.",
          });
        },
      });
    } catch (error) {
      console.error("Error sharing document:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to share the document.",
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/documents/document",
        { documentId, content }
      );
      setDocumentId(response.data.id); // Set document ID after creation
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Document saved successfully.",
      });
    } catch (error) {
      console.error("Error saving document:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save the document.",
      });
    }
  };

  return (
    <>
      <div className='w-full min-h-screen flex flex-col'>
        <div className='w-full h-[30vh] bg-gray-200'>
          <div className='w-full h-1/2 flex justify-between items-center'>
            <div className='flex justify-center items-center gap-2'>
              <span
                className='p-2 rounded bg-transparent cursor-pointer hover:bg-gray-300 transition duration-150'
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
              <span className='text-center text-lg font-semibold'>
                Document {documentId || "1"}
              </span>
            </div>
            <div className='w-[70%]'>
              <input
                type='text'
                className='p-2 outline-none bg-transparent border-2 border-slate-300 rounded w-1/3'
                placeholder='Search document.....'
              />
            </div>
          </div>
          <div className='w-full h-1/2 flex justify-between p-4'>
            <div className='flex gap-2'>
              <span className='p-2 rounded bg-gray-300 hover:bg-gray-400 transition duration-150 cursor-pointer'>
                <FaBold />
              </span>
              <span className='p-2 rounded bg-gray-300 hover:bg-gray-400 transition duration-150 cursor-pointer'>
                <GoItalic />
              </span>
              <span className='p-2 rounded bg-gray-300 hover:bg-gray-400 transition duration-150 cursor-pointer'>
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
              <button
                onClick={handleSave}
                className='px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-150'
              >
                Save
              </button>
              <button
                onClick={handleShare}
                className='px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-150'
              >
                Share
              </button>
              <button className='px-4 py-2 rounded border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-100 transition duration-150'>
                Comments
              </button>
              <button className='px-4 py-2 rounded border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition duration-150'>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className='w-full min-h-screen bg-gray-300 flex justify-center items-center p-6'>
          <div className='w-[65%] h-screen bg-white p-4 rounded flex flex-col'>
            <textarea
              className='w-full h-[90%] p-4 outline-none rounded'
              placeholder='One word leads to another, write that first word here....'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomEditor;
