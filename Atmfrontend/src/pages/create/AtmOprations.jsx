import React from "react";
import { NavLink } from "react-router-dom";
import atmback from "../utils/atmimg.jpg";

function AtmOperations() {
  const handleExtract = () => {
    new Audio(insert).play();
    setTimeout(() => {
      navigate("/login");
    }, 6000);
  };

  return (
    <div className="atm-operations-container relative flex justify-center items-center h-screen overflow-hidden perspective-800">
      <div className="absolute inset-0">
        <img
          src={atmback}
          alt="ATM Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="atm-operations-content relative p-10 rounded-[10px] shadow-lg w-[31%] h-83 mb-20 mr-[16%] z-10 transform-style-3d preserve-3d rotate-x-12">
        <div className="grid grid-cols-2 gap-4">
          <NavLink to="/withdraw">
            <button className=" opacity-[0.5] hover:opacity-[1] text-white border-2 border-gray-300 font-bold py-2 px-14 rounded cursor-pointer">
              Withdraw
            </button>
          </NavLink>

          <NavLink to="/deposit">
            <button className=" opacity-[0.5] hover:opacity-[1] border-2 border-gray-300 text-white font-bold py-2 px-16 rounded cursor-pointer">
              Deposit
            </button>
          </NavLink>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 ">
          <NavLink to="/balanceInquery">
            <button className=" opacity-[0.5] hover:opacity-[1] border-2 border-gray-300 text-white font-bold py-2 px-9 rounded cursor-pointer">
              Balance Inquiry
            </button>
          </NavLink>

          <NavLink to="/mobileRecharge">
            <button className="opacity-[0.5] hover:opacity-[1] border-2 border-gray-300 text-white font-bold py-2 px-8 rounded cursor-pointer">
              Mobile Recharge
            </button>
          </NavLink>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <NavLink to="/changepin">
            <button className="opacity-[0.5] hover:opacity-[1] border-2 border-gray-300 text-white font-bold py-2 px-13 rounded cursor-pointer">
              Change PIN
            </button>
          </NavLink>
          <NavLink to="/fund">
            <button className="opacity-[0.5] hover:opacity-[1] border-2 border-gray-300 text-white font-bold py-2 px-11 rounded cursor-pointer">
              Fund Transfer
            </button>
          </NavLink>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <NavLink to="/trasanction">
            <button className="opacity-[0.5] hover:opacity-[1] border-2 border-gray-300 text-white font-bold py-2 px-5 rounded cursor-pointer">
              Transaction History
            </button>
          </NavLink>

          <NavLink to="/login">
            <button className="opacity-[0.5] hover:opacity-[1] border-2 border-gray-300 text-white font-bold py-2 px-19 rounded cursor-pointer">
              Back
            </button>
          </NavLink>
        </div>
        <div className="mt-4 text-center">
          <button
            className="bg-darkred text-white font-bold py-2 px-12 rounded cursor-pointer bg-red-800"
            onClick={handleExtract}
          >
            Extract ATM
          </button>
        </div>
      </div>
      <div className="absolute bottom-5 w-full text-center">
        <div className="text-white text-sm">
          &copy; 2025 ATM Operations. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default AtmOperations;
