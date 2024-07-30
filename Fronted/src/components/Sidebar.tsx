"use client"
import { showForm } from "@/Data/store/features/Task-Form/taskFormSLice";
import { RootState } from "@/Data/store/store";
import {
  addIcons,
  analyticsICon,
  arrowICon,
  bellIcon,
  boardsIcon,
  downloadIcon,
  homeIcon,
  moodIcon,
  profileIcon,
  settingIcon,
  teamIcon,
} from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";


const Sidebar = () => {
  const [name,setName]=useState("")
  const dispatch=useDispatch();
  const router=useRouter()

  const handleLogout=()=>{
    localStorage.clear()
    router.push("/signin")
  }

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);


  
  return (
    <div className="h-screen p-5 bg-white flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-x-3">
          <Image src={profileIcon} alt="profile" className="w-8 h-8" />
          <h4 className="text-xl font-medium">{name || "Hello Guest"}</h4>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3">
            <Image src={bellIcon} alt="bell" />
            <Image src={moodIcon} alt="moodIcon" />
            <Image src={arrowICon} alt="arrowIcon" />
          </div>
          <button 
          onClick={handleLogout}
          className="bg-[#F4F4F4] w-20 h-12 rounded-lg p-2">
            <p className="text-gray-500 hover:text-zinc-900 text-lg font-normal">
              Logout
            </p>
          </button>
        </div>
      </div>
      <div className="mt-5">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-200"
            >
              <Image src={homeIcon} alt="home icon" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-200"
            >
              <Image src={boardsIcon} alt="board icon" />
              <span>Boards</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-200"
            >
              <Image src={settingIcon} alt="setting" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-200"
            >
              <Image src={teamIcon} alt="team icon" />
              <span>Teams</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-200"
            >
              <Image src={analyticsICon} alt="analytics" />
              <span>Analytics</span>
            </a>
          </li>
        </ul>
        <button 
        onClick={()=>dispatch(showForm())}
        className=" linear-btn-color text-white p-3 rounded-md inear-btn-color:hover flex items-center justify-center w-full mt-4 gap-x-4 font-medium">
          Create new task
          <Image src={addIcons} alt="add icons" />
        </button>
      </div>
      <div className="mt-auto">
        <div className="flex gap-x-6 bg-[#F4F4F4] rounded-lg p-3">
          <Image src={downloadIcon} alt="download Icon" />
          <div className="flex flex-col">
            <h4 className="text-xl font-medium text-gray-600">
              Download the app
            </h4>
            <h5 className="text-sm font-normal text-gray-500">
              Get the full experience
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
