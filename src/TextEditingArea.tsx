// import React, { useState } from "react";

// interface CustomEditorProps {
//   value: string;
//   onChange: (newValue: string) => void;
// }

// const CustomEditor: React.FC<CustomEditorProps> = ({ value, onChange }) => {
//   const [editorContent, setEditorContent] = useState(value);
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [fontSize, setFontSize] = useState(14);
//   const [isEditing, setIsEditing] = useState(false);
//   const [comment, setComment] = useState("");
//   const [isFinalized, setIsFinalized] = useState(false);

//   const handleEditorChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setEditorContent(event.target.value);
//     onChange(event.target.value);
//   };

//   const handleBoldClick = () => {
//     setIsBold(!isBold);
//   };

//   const handleItalicClick = () => {
//     setIsItalic(!isItalic);
//   };

//   const handleFontSizeChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setFontSize(parseInt(event.target.value));
//   };

//   const handleFinalizeClick = () => {
//     setIsFinalized(true);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCommentClick = () => {
//     setComment("Comment added!");
//   };

//   return (
//     <div className='flex justify-center items-center'>
//       <div className='custom-editor w-full min-h-screen'>
//         <div className='toolbar bg-gray-200 p-4 flex justify-between'>
//           <div className='flex items-center gap-2'>
//             <button
//               onClick={handleBoldClick}
//               className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
//             >
//               Bold
//             </button>
//             <button
//               onClick={handleItalicClick}
//               className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
//             >
//               Italic
//             </button>
//             <select
//               value={fontSize}
//               onChange={handleFontSizeChange}
//               className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded'
//             >
//               <option value='12'>12px</option>
//               <option value='14'>14px</option>
//               <option value='16'>16px</option>
//             </select>
//           </div>
//           <div className='flex items-center'>
//             {isFinalized ? (
//               <button
//                 onClick={handleEditClick}
//                 className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//               >
//                 Edit
//               </button>
//             ) : (
//               <button
//                 onClick={handleFinalizeClick}
//                 className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//               >
//                 Finalize
//               </button>
//             )}
//             <button
//               onClick={handleCommentClick}
//               className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
//             >
//               Comment
//             </button>
//           </div>
//         </div>
//         {isEditing ? (
//           <textarea
//             value={editorContent}
//             onChange={handleEditorChange}
//             className='editor-textarea p-4 bg-gray-200 w-full min-h-screen'
//             style={{
//               fontWeight: isBold ? "bold" : "normal",
//               fontStyle: isItalic ? "italic" : "normal",
//               fontSize: `${fontSize}px`,
//             }}
//           />
//         ) : (
//           <div className='editor-preview p-4 bg-gray-200'>
//             <p>{editorContent}</p>
//             {comment && <p>Comment: {comment}</p>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomEditor;
import { FaBold } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { MdFormatUnderlined } from "react-icons/md";
const CustomEditor = () => {
  return (
    <>
      <div className='w-full min-h-screen flex flex-col'>
        <div className='w-full h-[20vh] bg-gray-200 '>
          <div className='w-full h-1/2 flex justify-center items-center '>
            <input
              type='text'
              className='p-2 disabled outline-none bg-transparent border-2 border-slate-300 w-1/3 rounded'
              placeholder='search document.....'
            />
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
        <div className='w-full min-h-screen bg-gray-300 flex justify-center items-center'>
          <div className='w-1/2 h-screen bg-white p-4'>
            <textarea
              className='w-full h-full outline-none'
              placeholder='One word leads to another, write that first word here....'
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomEditor;
