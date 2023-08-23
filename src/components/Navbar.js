import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import wavinghand from "../wavinghand.png";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Navbar = ({logout}) => {


  const BASE_URL = process.env.REACT_APP_API_BASE_URL;


  const email = localStorage.getItem("userEmail");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    if (!logout) {
      axios
        .get(`${BASE_URL}/api/auth/user?email=${email}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [email, logout]);
  
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    navigate("/login");
  };

  return (
    <nav
      className="flex flex-row sticky top-0 z-10 p-4"
      style={{ backgroundColor: "#282c34" }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Toggle button for small screens */}
        <div className="lg:hidden">
          {isMenuOpen ? (
            <button onClick={handleCloseMenu} className="text-white">
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button onClick={handleToggleMenu} className="text-white">
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3h20v2h-20v-2zm0 7h20v2h-20v-2zm0 7h20v2h-20v-2z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Navbar links */}
        <div
          className={`${
            isMenuOpen ? "lg:flex" : "hidden"
          } lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0`}
        >
          <ul className="flex flex-col lg:flex-row items-center">
            <li>
              <Link className="text-white p-4" to="/">
                Home
              </Link>
            </li>
            
            {!localStorage.getItem("token") ? (
              <>
                <li>
                  <Link className="text-white p-4" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="text-white p-4" to="/signup">
                    Sigup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="text-white ml-3">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        <span  className="flex text-white  text-xl font-bold">
         {userData.length > 0 ? 
         <>Hey  <span class="animate-waving-hand"><img className="h-[1.5rem] lg:h-[1.5rem]" src={wavinghand}/></span>,{userData[0].name}</> : <>Keeper <AutoStoriesIcon className="ml-2 "/></>}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
