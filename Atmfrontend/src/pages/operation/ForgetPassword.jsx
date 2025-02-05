import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import atmimg from "../utils/atmimg.jpg";

function ForgetPassword(props) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [otp, setOtp] = useState("");

  const handleAccountNumberChange = (e) => setAccountNumber(e.target.value);
  const handlePinChange = (e) => setPin(e.target.value);
  const handleConfirmPinChange = (e) => setConfirmPin(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleVerify = async () => {
    if (step === 1) {
      await axios
        .get(`http://localhost:8080/user/accountFinder/${accountNumber}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            localStorage.setItem("accountNumber", res.data.accountNumber);
            setStep(2);
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Account verification failed. Please try again.",
          });
        });
    } else {
      if (pin === confirmPin) {
        const accountNumber = localStorage.getItem("accountNumber");
        await axios
          .patch(
            `http://localhost:8080/user/forgetPassword/${accountNumber}/${otp}`,
            { pin: pin }
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Password Updated",
                text: "Your password has been updated successfully.",
              });
              localStorage.removeItem("accountNumber");
              navigate("/login");
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an error updating your password. Please try again.",
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "PIN and Confirm PIN do not match.",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <img
        src={atmimg}
        alt="atmphoto"
        className="absolute w-full h-full object-cover"
      />

      <div className=" p-8 rounded-lg  w-full sm:w-96 z-10 mr-60 mb-30">
        {step === 1 && (
          <div>
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Account Number:
            </label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Enter Account Number"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <div>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter PIN"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                id="confirmPin"
                value={confirmPin}
                onChange={handleConfirmPinChange}
                placeholder="Confirm PIN"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleVerify}
          className="w-full mt-6 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none"
        >
          {step === 1 ? "Verify Account" : "Update Password"}
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
