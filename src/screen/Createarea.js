import React, { useState, useEffect} from "react";
import axios from "axios";
import Simplequiz from "../components/Simplequiz";
import Categorize from "../components/Categorize";
import ClozeQuestionForm from "../components/Cloze";
import ComprehensionForm from "../components/Comprehension";
import SidebarPage from "../components/SidebarPage";
import { Link } from "react-router-dom";
import "../App.css";
import Preview from "./Preview";
import Navbar from "../components/Navbar";

function Createarea({handlecreateClick}) {
  
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
   
  const userEmail = localStorage.getItem("userEmail");
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [iscreating, setIscreating] = useState(false);
  const [checked, setChecked] = useState(false);
  const [simpleQuizData, setSimpleQuizData] = useState({});
  const [categorizeData, setCategorizeData] = useState({});
  const [clozeData, setClozeData] = useState({});
  const [comprehensionData, setComprehensionData] = useState({});
  const [mainDataSet, setMainDataSet] = useState({
    userEmail: userEmail,
    simpleQuizData: {
      formName: "",
      formImage:"",
    },
    categorizeData: {},
    clozeData: {},
    comprehensionData: {
      referenceImage:"",
    },
  });

  const formName = mainDataSet.simpleQuizData.formName;
  const formImage = mainDataSet.simpleQuizData.formImage;
  const referenceImage = mainDataSet.comprehensionData.referenceImage;
 

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        
        resolve(null);
      }
    });
  }
  

  
  const handleMainDataSubmit = async() => {

    if (formName.trim() === "") {
      alert("Form name is required!");
      return;
    }


    const isConfirmed = window.confirm(
      "Are you sure you want to save the data?"
    );
    if (!isConfirmed) {
      return;
    }
    setLoading(true);

     const referenceBase64 = await convertFileToBase64(referenceImage);
     const formImageBase64 = await convertFileToBase64(formImage);


  const updatedMainDataSet = {
    ...mainDataSet,
    simpleQuizData: {
      ...mainDataSet.simpleQuizData,
      formImage: formImageBase64,
      
    },
    comprehensionData:{
      ...mainDataSet.comprehensionData,
      referenceImage: referenceBase64,
    },
  };

    axios
      .post(`${BASE_URL}/api/auth/upload`, {mainDataSet: updatedMainDataSet})
      .then((response) => {
        console.log("MainData uploaded successfully:", response.data);
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
          setShowPreview(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000); 
        }, 3000); 
      })
      .catch((error) => {
        console.error("Error uploading MainData:", error);
        setLoading(false);
      });
  };

  console.log("form:", mainDataSet);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleChangeS = (data) => {
    setMainDataSet((prevData) => ({
      ...prevData,
      simpleQuizData: data,
    }));
  };

  const handleChangeCt = (data) => {
    setMainDataSet((prevData) => ({
      ...prevData,
      categorizeData: data,
    }));
  };

  const handleChangeCl = (data) => {
    setMainDataSet((prevData) => ({
      ...prevData,
      clozeData: data,
    }));
  };

  const handleChangeCm = (data) => {
    setMainDataSet((prevData) => ({
      ...prevData,
      comprehensionData: data,
    }));
  };

  


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "All progress will be lost. Are you sure?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);



  return (
    <>
     <Navbar/>
    {isPreview ? 
    <Preview fN={formName} />

  :
   
    <div className="flex">
      <div className="w-1/5">
        <SidebarPage className="" />
      </div>

      <div className="flex-1 bg-gray-100">
        {iscreating ? (
          <div className="flex-1  p-4 overflow-y-auto ">
            <div className="container mx-auto">
              <div className="w-[80%] mx-auto">
                <Simplequiz onChange={handleChangeS} />
                <Categorize onChange={handleChangeCt} />
                <ClozeQuestionForm onChange={handleChangeCl} />
                <ComprehensionForm onChange={handleChangeCm} />
                <div className="flex flex-row">
                  <Link
                   
                    className="preview-button flex justify-center items-center text-md bg-white hover:bg-black text-black border border-black hover:text-white font-bold rounded-full w-1/6 h-10 rounded ml-4"
                    onClick={handleMainDataSubmit}
                  >
                    Save
                  </Link>
                  {loading && (
                    <div className="loading">
                      <div className="loader"></div>
                      <p>Saving data...</p>
                    </div>
                  )}
                  {success && (
                    <div className="success">
                      <p>Your data has been successfully saved!</p>
                    </div>
                  )}
                  {showPreview && (
                    <button onClick={()=>setIsPreview(true)} class="ml-auto learn-more">
                          <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                          </span>
                          <span class="button-text">Preview</span>
                        </button>
                    
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-gray-100 p-4 r h-screen">
            <div
              className="w-full my-6 flex flex-wrap"
              onClick={() => {
                setIscreating(true);
              }}
            >
              <div className="bg-gray-50 w-[300px] mr-4 mb-4 cursor-pointer border rounded-md p-2 hover:border-black hover:bg-cyan-50">
                <div className="h-[200px] w-full border overflow-hidden rounded-md shadow-sm">
                  <img
                    src="https://img.freepik.com/premium-vector/hand-drawn-mathematics-symbol-plus-sign-sticker-style-vector-illustration_755164-11166.jpg?w=2000"
                    alt="blank"
                    className="w-full h-full object-cover"
                    referrerpolicy="no-referrer"
                  />
                </div>
                <div className="mt-2 p-2">
                  <p className="text-sm mb-1.5 font-medium">Blank</p>
                  <p className="text-xs text-gray-500">Create a blank form</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    }
    </>
  );
}

export default Createarea;
