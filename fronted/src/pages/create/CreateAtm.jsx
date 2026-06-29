import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import fail from "../audios/fail.mp3";
import success from "../audios/success.mp3";

function CreateAtm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    aadharNumber: "",
    address: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/user/createAtm", formData)
      .then((response) => {
        if (response.status === 201) {
          new Audio(success).play();

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "ATM details submitted successfully!",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            new Audio(success).pause();
            navigate("/aadharInput");
          });
        } else if (response.status === 208) {
          new Audio(fail).play();
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Either email or Aadhar is already in use.",
            confirmButtonColor: "#d33",
          });
          new Audio(fail).pause();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 max-h-screen">
        <div className="flex justify-start mb-6">
          {" "}
          {/* Align logo to the left */}
          {/* <img src={bankLogo} alt="Bank Logo" className="w-20 h-20 mr-4" /> */}
          <h1 className="text-2xl font-bold text-white">Create ATM Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          {/* Reduced spacing between fields */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-white text-sm font-bold mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-white text-sm font-bold mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-white text-sm font-bold mb-1"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
              required
              pattern="[0-9]{10}"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="aadharNumber"
              className="block text-white text-sm font-bold mb-1"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
              required
              pattern="[0-9]{12}"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-white text-sm font-bold mb-1"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-bold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
              required
              autoComplete="off"
            />
            {!isValidEmail(formData.email) && formData.email && (
              <p className="text-red-500 text-xs mt-1">Invalid email format</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAtm;
