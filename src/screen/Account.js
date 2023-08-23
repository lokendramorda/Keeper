import React, { useState, useRef , useEffect} from "react";
import Navbar from "../components/Navbar";
import SidebarPage from "../components/SidebarPage";
import axios from "axios";
import "../App.css"

function Account() {

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [displayedProfileImg, setDisplayedProfileImg] = useState(null);
  const email = localStorage.getItem("userEmail");
  const profileImgInputRef = useRef(null);



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
  

  
  const handleUpload = async () => {
    setLoading(true);
    setSuccess(false);

    const profileImgBase64 = await convertFileToBase64(profileImg);

    axios
      .post(`${BASE_URL}/api/auth/account`, {
        email: email,
        profileImgBase64,
      })
      .then((response) => {
        console.log('Profile image uploaded successfully:', response.data);
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error uploading profile image:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setProfileLoading(true);
    axios
      .get(`${BASE_URL}/api/auth/user?email=${email}`)
      .then((response) => {
        const user = response.data;
      setUserData(user);
      if (response.data[0].profileImg) {
        setDisplayedProfileImg(response.data[0].profileImg);
        
      }
      setProfileLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setProfileLoading(false);
      });
  }, [email]);





  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImg(file);
  };

  

  return (
    <>
     {loading && (
      <div className="loading absolute top-0 left-0 z-10">
        <div className="loader "></div>
        <p>Uploading...</p>
      </div>
    )}
    {profileLoading &&(
      <div className="loading absolute top-0 left-0 z-10">
        <div className="loader "></div>
        <p>Profile loading...</p>
      </div>
    )}
    {success && (
                    <div className="success absolute top-0 left-0 z-10">
                      <p>Your profile has been successfully updated!</p>
                    </div>
                  )}
      <Navbar />
      <div className="flex">
        <div className="w-1/5">
          <SidebarPage />
        </div>
       
        <div className="flex-1 bg-gray-100">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="container mx-auto">
              <div className="w-[80%] mx-auto">
                <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
                  <h1 className="text-2xl font-semibold mb-4">
                    Account Information
                  </h1>
                  <h2 className="text-xl font-semibold mb-2">
                    Profile Picture
                  </h2>
                  <div className="mb-6 relative border w-1/3 h-[265px] rounded-md bg-white mr-4 overflow-hidden shadow-xl cursor-pointer">
        <div className="flex items-center">
          {displayedProfileImg !== null && displayedProfileImg ? (
            <img
              src={displayedProfileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-lg flex bg-cover items-center justify-center h-full">
              <img src={profileImg ?URL.createObjectURL(profileImg):"https://i.pinimg.com/736x/5b/8f/3d/5b8f3d9f30460aeedbe6a235e2d001d3.jpg"} />
            </span>
          )}
          <input
            type="file"
            ref={profileImgInputRef}
            className="opacity-0 w-full h-full cursor-pointer absolute top-0 left-0"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
      </div>
      <div className="flex flex-col">
      <span className='text-red-700 text-[11px]'>Don't upload large image files</span>
      <button
        onClick={handleUpload}
        className="mb-6 px-4 py-2 w-1/3 bg-white text-black rounded-md hover:bg-darkcyan hover:text-white border border-black"
      >
        Upload
      </button>
</div>
      <div className=" w-1/2 px-4 py-2 bg-gray-100 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200 shadow-md">Email. &nbsp;{email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
