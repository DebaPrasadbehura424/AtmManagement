import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import atmimg from "../utils/atmimg.jpg";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import fail from "../audios/fail.mp3";
import success from "../audios/success.mp3";

function Login() {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNewPin = () => {
    // Your logic for handling new PIN request
  };

  const handleForgetPin = () => {
    // Your logic for handling forget PIN request
  };

  const EncapsuleOfAccAndPin = {
    accountNumber,
    pin,
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/accNum/pin",
        EncapsuleOfAccAndPin
      );
      if (response.status === 200) {
        new Audio(success).play();
        Swal.fire({
          icon: "success",
          title: "Verified",
          text: "Verified your account successfully",
          confirmButtonColor: "#00ff00",
        }).then(() => {
          localStorage.setItem("token", response.data.token);
          navigate("/atmopration");
        });
      }
    } catch (err) {
      new Audio(fail).play();
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred.";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#ff0000",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <img
        src={atmimg}
        alt="atmphoto"
        className="absolute w-full h-full object-cover"
      />
      <div className=" p-8 rounded-lg  w-full max-w-md z-10  mr-60 mb-25">
        <input
          type="text"
          id="accountinput1"
          name="accountinput1"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter Account Number"
          className="w-full mb-4 bg-gray-200 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          autoComplete="off"
          required
        />
        <input
          type="password"
          id="pins1"
          name="pins1"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          className="w-full mb-6 bg-gray-200 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />
        <div className="flex justify-between mb-4">
          <NavLink to="/newpin">
            <button
              type="button"
              onClick={handleNewPin}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-2 transition duration-300"
            >
              New PIN
            </button>
          </NavLink>

          <NavLink to="/forgetpassword">
            <button
              type="button"
              onClick={handleForgetPin}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Forget PIN
            </button>
          </NavLink>
        </div>

        <button
          type="button"
          onClick={handleVerify}
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          {loading ? "Loading..." : "Verify"}
        </button>

        {message && (
          <p className={`mt-4 text-${error ? "red-500" : "green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
