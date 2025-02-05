import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import fail from "../audios/fail.mp3";
import success from "../audios/success.mp3";

function AadharInput() {
  const [aadharNumber, setAadharNumber] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios(`http://localhost:8080/user/aadharNumber/${aadharNumber}`)
      .then((response) => {
        if (response.status === 200) {
          new Audio(success).play();
          Swal.fire({
            icon: "success",
            title: "success!",
            text: "🙏",
            confirmButtonColor: "#3085d6",
          });
          localStorage.setItem("aadharNum", aadharNumber);
          navigate("/atm");
        }
      })
      .catch((err) => {
        new Audio(fail).play();
        Swal.fire({
          icon: "error",
          title: "error!",
          text: err,
          confirmButtonColor: "#3085d6",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {" "}
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        {" "}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Enter Aadhar Number
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="aadharNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              placeholder="Enter your 12-digit Aadhar Number"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AadharInput;
