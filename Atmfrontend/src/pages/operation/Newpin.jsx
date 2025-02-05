import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import atmimg from "../utils/atmimg.jpg";

function NewPin() {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
                title: "PIN Updated",
                text: "Your PIN has been updated successfully.",
              });
              localStorage.removeItem("accountNumber");
              navigate("/login");
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an error updating your PIN. Please try again.",
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

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/user/resendOtp/${accountNumber}`);
      Swal.fire({
        icon: "success",
        title: "OTP Resent",
        text: "A new OTP has been sent to your account.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to resend OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <img
        src={atmimg}
        alt="atmphoto"
        className="absolute w-full h-full object-cover"
      />

      <div className=" p-8 rounded-lg  w-full sm:w-96 transition-transform transform hover:scale-105 hover:shadow-xl z-10 mr-60 mb-30">
        {step === 1 && (
          <div>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Enter Account Number"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform"
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
                placeholder="Enter New PIN"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform"
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                id="confirmPin"
                value={confirmPin}
                onChange={handleConfirmPinChange}
                placeholder="Confirm New PIN"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          {step == 2 && (
            <button
              onClick={handleResendOtp}
              className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out transform"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
                  <span className="ml-2">Resending...</span>
                </div>
              ) : (
                "Resend OTP"
              )}
            </button>
          )}

          <button
            onClick={handleVerify}
            className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-300 ease-in-out transform"
          >
            {step === 1 ? "Verify Account" : "Set New PIN"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPin;
