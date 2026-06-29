import React from "react";
import atmimg from "../utils/atmimg.jpg";
import { NavLink, useNavigate } from "react-router-dom";

import insert from "../audios/Atminsert.mp3";

function InsertCard() {
  const navigate = useNavigate(null);
  const handleInsert = () => {
    new Audio(insert).play();
    setTimeout(() => {
      navigate("/login");
    }, 6000);
  };
  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <img
        src={atmimg}
        alt="atmphoto"
        className="absolute w-full h-full object-cover"
      />
      <div className=" p-8 rounded-lg  z-10 mr-60 mb-30">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          ATM
        </h2>

        <button
          className="bg-green-500 hover:bg-green-700
         text-white font-bold py-3 px-6 rounded-lg 
         transition duration-300 cursor-pointer"
          onClick={handleInsert}
        >
          PUT YOUR ATM CARD
        </button>
      </div>
    </div>
  );
}

export default InsertCard;
