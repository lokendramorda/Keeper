import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';


const SidebarPage = () => {



  return (



    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-1/6 bg-white p-4 text-black flex flex-col items-start fixed h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold ml-4 mb-8">Keeper</h2>
        <ul className="space-y-4 w-full">
          <li>
            <Link
              to="/createarea"
              className="flex items-center text-gray-800 hover:text-white hover:bg-black hover:bg-opacity-25 px-4 py-2 rounded-md transition-colors"
              
            >
              <AddCircleOutlineIcon className="mr-2" />
              Create
            </Link>
          </li>
          <li>
            <Link
              to="/formlist"
              className="flex items-center text-gray-800 hover:text-white hover:bg-black hover:bg-opacity-25 px-4 py-2 rounded-md transition-colors"
            >
              <ReorderIcon className="mr-2" />
              Forms
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className="flex items-center text-gray-800 hover:text-white hover:bg-black hover:bg-opacity-25 px-4 py-2 rounded-md transition-colors"
            >
              <AccountCircleIcon className="mr-2" />
              Account
            </Link>
          </li>
          
          
        </ul>
      </div>

      
     
      
      
      
    </div>
  );
};

export default SidebarPage;
