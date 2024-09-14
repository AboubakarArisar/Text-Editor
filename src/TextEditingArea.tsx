import { useState } from "react";
import { FaBold } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { MdFormatUnderlined } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { API_URL } from "./config/config";

Modal.setAppElement("#root");

const CustomEditor = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<any[]>([]);
  const [link, setLink] = useState("");
  const [documentId, setDocumentId] = useState();
  const [content, setContent] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selection, setSelection] = useState<string | null>(null);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/documents/document`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDocumentId(response.data._id);
      if (response.status === 199) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Document already saved",
        });
      } else {
        setSaved(true);
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Document saved successfully.",
        });
      }
    } catch (error) {
      console.error("Error saving document:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save the document.",
      });
    }
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
      const response = await axios.post(
        `${API_URL}/api/documents/document/${documentId}/share`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLink(response.data.link);
      setModalIsOpen(true);
    } catch (error: any) {
      console.log("Error : ", error.response);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to share the document.",
      });
    }
  };

  const handleAddComment = () => {
    const selection = window.getSelection();

    if (!selection) {
      Swal.fire({
        icon: "error",
        title: "No Selection",
        text: "Please select some text to comment on.",
      });
      return;
    }
    setCommentModalIsOpen(true);
  };
  const fetchComments = async () => {
    console.log("in comments");
    try {
      const response = await axios.get(
        `${API_URL}/api/comments/${documentId}/comments`
      );
      setComments(response.data);
      setShowComments(true);
      console.log(comments);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveComment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/comments/${documentId}/comment`,
        {
          content: comment,
          selection: {
            start: selectionStart,
            end: selectionEnd,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment("");
      setSelection(null);
      setSelectionStart(null);
      setSelectionEnd(null);
      setCommentModalIsOpen(false);
      Swal.fire({
        icon: "success",
        title: "Comment Added!",
        text: "Your comment has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add the comment.",
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeCommentModal = () => {
    setCommentModalIsOpen(false);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Link Copied!",
          text: "The shareable link has been copied to your clipboard.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
        Swal.fire({
          icon: "error",
          title: "Copy Failed",
          text: "Failed to copy the link to your clipboard.",
        });
      });
  };

  return (
    <>
      <div className='w-full min-h-screen flex flex-col relative'>
        <button
          onClick={fetchComments}
          className='px-3 py-2 bg-blue-300  h-12 absolute top-56 right-4 rounded'
        >
          comments
        </button>
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
                Document
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
          <div className='w-full h-[37%] flex justify-between p-4'>
            <div className='flex gap-2'>
              <span className='p-3 rounded bg-gray-300 hover:bg-gray-400 transition duration-150 cursor-pointer'>
                <FaBold />
              </span>
              <span className='p-3 rounded bg-gray-300 hover:bg-gray-400 transition duration-150 cursor-pointer'>
                <GoItalic />
              </span>
              <span className='p-3 rounded bg-gray-300 hover:bg-gray-400 transition duration-150 cursor-pointer'>
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
              {saved ? null : (
                <button
                  onClick={handleSave}
                  className='bg-blue-500 text-white p-2 rounded'
                >
                  Save
                </button>
              )}
              <button
                onClick={handleShare}
                className='bg-green-500 text-white p-2 rounded'
              >
                Share
              </button>
              <button
                onClick={handleAddComment}
                className='bg-yellow-500 text-white p-2 rounded'
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
        <textarea
          className='w-full min-h-screen flex-grow p-4 border-t border-gray-300 outline-none'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Start typing your document here...'
        ></textarea>
      </div>
      {showComments && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex flex-col justify-center items-center z-50'>
          <button
            onClick={() => setShowComments(false)}
            className='absolute top-4 right-4 bg-red-500 text-white p-2 rounded'
          >
            Close
          </button>
          <div className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg'>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className='w-full h-20 bg-gray-200 p-4 mb-4 rounded'
              >
                <div className='flex justify-center items-center'>
                  <div>
                    <p className='text-lg font-semibold'>{comment.author}</p>
                    <p className='text-lg'>{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "50%",
            maxWidth: "500px",
            height: "200px",
            maxHeight: "200px",
            margin: "auto",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <h2 className='text-lg font-semibold mb-4'>Shareable Link</h2>
        <input
          type='text'
          readOnly
          value={link}
          className='w-full p-2 border rounded mb-4'
        />
        <button
          onClick={copyLinkToClipboard}
          className='bg-green-500 text-white p-2 rounded mr-2'
        >
          Copy Link
        </button>
        <button
          onClick={closeModal}
          className='bg-red-500 text-white p-2 rounded'
        >
          Close
        </button>
      </Modal>
      <Modal
        isOpen={commentModalIsOpen}
        onRequestClose={closeCommentModal}
        style={{
          content: {
            width: "50%",
            maxWidth: "500px",
            height: "300px",
            maxHeight: "300px",
            margin: "auto",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <h2 className='text-lg font-semibold mb-4'>Add Comment</h2>
        <textarea
          className='w-full p-2 border rounded mb-4'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Write your comment here...'
        ></textarea>
        <button
          onClick={handleSaveComment}
          className='bg-blue-500 text-white p-2 rounded mr-2'
        >
          Save Comment
        </button>
        <button
          onClick={closeCommentModal}
          className='bg-red-500 text-white p-2 rounded'
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default CustomEditor;
