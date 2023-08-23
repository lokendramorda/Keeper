import React, { useState, useRef} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function Simplequiz({onChange}) {

    const [formImage, setFormImage] = useState(null);
    const [formName, setFormName] = useState('');
    const [email, setEmail] = useState("");
    const [showQA, setShowQA] = useState(false);
    const [qaList, setQAList] = useState([]);
    const formImageInputRef = useRef(null);
 
  
  
  const handleAddQA = () => {
    setShowQA(true);
    setQAList([...qaList, { question: ""}]);
  };

  const handleDeleteQA = (index) => {
    const updatedQAList = [...qaList];
    updatedQAList.splice(index, 1);
    setQAList(updatedQAList);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormImage(file);
  };

  const handleFormNameChange = (e) => {
    setFormName(e.target.value);
    onChange({ formImage, formName: e.target.value, email, qaList });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    onChange({ formImage, formName, email: e.target.value, qaList });
  };

  const handleQAChange = ({ index, e }) => {
    const updatedQAList = [...qaList];
    updatedQAList[index].question = e.target.value;
    setQAList(updatedQAList);
  
    onChange({ formImage, formName, email, qaList: updatedQAList });
  };
  


  



  return (
    <>
   <div className="flex items-center justify-center">
      <div className="bg-gray-100 p-4 w-[80%] flex flex-col  bg-white shadow-md p-6 rounded-lg">



        <form className="mb-4 max-w-md mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32 rounded-full bg-white mr-4 overflow-hidden shadow-xl cursor-pointer" >
            {formImage ? (
              <img
                src={URL.createObjectURL(formImage)}
                alt="Form Preview"
                className="w-full h-full object-cover"
              />
              
            ) : (
              <span className="text-white text-lg flex bg-cover items-center justify-center h-full">
              <img src='https://static.vecteezy.com/system/resources/previews/004/511/733/original/camera-icon-on-white-background-vector.jpg'/>
              </span>
            )}
            <input
              type="file"
              ref={formImageInputRef}
              className="opacity-0 w-full h-full cursor-pointer absolute top-0 left-0"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="formName" className="block font-medium mb-1">
              Form Name <span className='text-red-700'>*</span>
            </label>
            <input
              type="text"
              id="formName"
              className="w-72 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 shadow-md"
              value={formName}
              onChange={handleFormNameChange}
              required
            />
            <span className='text-red-700 text-[11px]'>Don't upload large image files</span>
          </div>
        </div>
      </form>


           <div className="">
          <form >
            

            <div className="mb-4 mt-4">
             
              <input
                type="email"
                id="email"
                placeholder="Description..."
                className="w-1/2 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            {showQA &&
              qaList.map((qa, index) => (
                <div className="mb-4" key={index}>
                <div className="flex mb-1 items-center justify-between">
              <label htmlFor={`question-${index}`} className="block font-medium">
                Question {index + 1}
              </label>
              <button
                type="button"
                className=" text-black opacity-60 hover:opacity-100 font-medium py-1 px-2 rounded-md transition-colors"
                onClick={() => handleDeleteQA(index)}
              >
                <DeleteIcon />
              </button>
                    
                  </div>
                  <input
                    type="text"
                    id={`question-${index}`}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                    value={qa.question}
                    onChange={(e) => handleQAChange({ index, e })}
                    required
                  />

                  
                </div>
              ))}

            <button
              type="button"
              className="text-black font-medium mt-4 hover:text-green-700"
              onClick={handleAddQA}
            >
              <AddCircleOutlineIcon className='text-green-700'/>Question
            </button>

        
          </form>
          </div>
        </div>
        </div>

     
    
    </>
  )
}

export default Simplequiz;