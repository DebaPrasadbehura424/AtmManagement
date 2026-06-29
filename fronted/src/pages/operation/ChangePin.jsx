import React, { useState } from "react";
import atmback from "../utils/atmimg.jpg";
import axios from "axios";
import Swal from "sweetalert2";

function ChangePin(props) {
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(0);
  const token = localStorage.getItem("token");

  const handleVerify = async () => {
    if (step === 0) {
      try {
        const response = await axios.post(
          `http://localhost:8080/atmBalance/changePin/${token}`,
          {
            pin: pin,
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Verify successfully",
            text: "🙏",
          });
          setStep(1);
        } else if (response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Incorrect PIN",
            text: "Please enter the correct old PIN.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "PIN Check Failed",
            text: "Unable to verify the PIN. Please try again later.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while checking the PIN. Please try again later.",
        });
      }
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:8080/atmBalance/update/${token}`,
          {
            pin: newPassword,
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "PIN Updated",
            text: "Your PIN has been updated successfully.",
          });
          setPin("");
          setNewPassword("");
          setStep(0);
        } else {
          console.log("PIN update failed");
          Swal.fire({
            icon: "error",
            title: "PIN Update Failed",
            text: "Unable to update the PIN. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Error updating PIN:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating the PIN. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute inset-0">
        <img
          src={atmback}
          alt="ATM Background"
          className="object-cover w-full h-full"
        />
         <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className=" p-8 rounded-lg w-full max-w-sm z-10 mr-60 mb-30">
        {step === 0 ? (
          <input
            type="password"
            placeholder="Enter old password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default ChangePin;
