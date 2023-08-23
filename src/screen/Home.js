import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Createarea from "./Createarea";
import { useEffect, useState } from "react";

export default function Home() {

  const [logout, setLogout] = useState(true);

  
  
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <div>
            <Createarea />
          </div>
        </>
      ) : (
        <>
          <Navbar logout={logout} />
          <div className="flex min-h-screen">
           
            <div className="w-1/2 flex text-black justify-center items-center p-10">
              <div className="mb-8 relative top-[-50px]">
                {" "}
               
                <h1 className="text-3xl font-bold ">Welcome to Keeper!</h1>
               <h1 className="text-xl font-bold mb-4"> Transform your Forms Into Interactive Workflows.</h1>
                <h2 className="text-xl  mb-4">
                   Keeper is
                  a Forms add on that allows you to add conditional logic
                  to your forms. With Keeper, you can create interactive
                  workflows, approval flows & automate processes.
                </h2>
              </div>
              
            </div>

           
            <div className="w-1/2 bg-gray-100  flex text-black justify-center items-center min-h-screen">
            <div className="text-center relative top-[-60px]">
                <h2 className="text-2xl font-bold mb-6">Get Started!</h2>
                <Link
                  to="/login"
                  className="inline-block px-6 py-3 bg-white text-black font-medium rounded-full mr-4 border border-black hover:bg-black hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-block px-6 py-3 bg-white text-black font-medium rounded-full border border-black hover:bg-black hover:text-white"
                >
                  Sign Up
                </Link>
                </div>
              </div>
          </div>
        </>
      )}
    </>
  );
}
