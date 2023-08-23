import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SidebarPage from "../components/SidebarPage";
import Preview from "./Preview";
import "../App.css"
import Nodata from "../Nodata.png";
import DrawIcon from '@mui/icons-material/Draw';
import "../App.css";
import { Link } from "react-router-dom";

function FormList() {


  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const userEmail = localStorage.getItem("userEmail");
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/auth/formlist?userEmail=${userEmail}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        setLoading(false);
      });
  }, [userEmail]);

  const handleClick = (formData) => {
    setSelectedForm(formData);
    setPreview(true);
  }

  return (
    <>
      <Navbar />

      {preview ? (
        <Preview  fN={selectedForm.simpleQuizData.formName} />
      ) : (
        <div className="flex">
          <div className="w-1/5">
            <SidebarPage />
          </div>
          <div className="flex-1 bg-gray-100 p-4 overflow-y-auto ">
            <h1 className="text-2xl font-semibold ml-4 mb-4">Your Form List</h1>
            {loading && (
                    <div className="loading loading absolute top-0 left-0 z-10">
                      <div className="loader"></div>
                      <p>Loading data...please wait</p>
                    </div>
                  )}
            <div className="container  mx-auto flex flex-cols-3">
              {formData.length > 0 ? formData.map((formData, index) => (
                <div
                  key={index}
                  className="bg-gray-50 w-[300px] mr-4 mb-4 cursor-pointer border rounded-md p-2 hover:border-black hover:bg-green-50"
                  onClick={() => handleClick(formData)}
                >
                  <div className="h-[200px] w-full border overflow-hidden rounded-md shadow-sm">
                    <img
                      src={formData.simpleQuizData.formImage}
                      alt="Form"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <h2 className="text-lg font-semibold text-center">
                      {formData.simpleQuizData.formName}
                    </h2>
                  </div>
                </div>
              ))
              :
              <div className="flex flex-col ml-4">
              <div className="h-[200px] relative  w-full border mb-3 overflow-hidden rounded-md shadow-sm">
                    <img
                      src={Nodata}
                      alt="Form"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                <Link to="/createarea" className="flex justify-center bg-cyan text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-darkcyan">
               <DrawIcon/> Create new form </Link>
              </div>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormList;
