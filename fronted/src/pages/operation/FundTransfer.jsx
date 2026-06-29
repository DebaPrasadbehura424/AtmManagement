import React, { useState } from "react";
import atmback from "../utils/atmimg.jpg";
import axios from "axios";
import Swal from "sweetalert2";

function FundTransfer(props) {
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState(0.0);

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const handleAmountChange = (event) => {
    setBalance(event.target.value);
  };

  const chunks = {
    accountNumber,
    balance,
  };

  const token = localStorage.getItem("token");

  const handleSend = async () => {
    if (
      !accountNumber ||
      !balance ||
      isNaN(balance) ||
      parseFloat(balance) <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter valid account number and amount.",
      });
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8080/atmBalance/fundTransfer/${token}`,
        chunks
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Fund transfer successful!",
        });

        setAccountNumber("");
        setBalance(0.0);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Fund transfer failed. Please try again.",
        });
      }
    } catch (error) {
      let errorMessage =
        "An error occurred during the fund transfer. Please try again later.";
      if (error.response) {
        errorMessage = `Fund transfer failed: ${
          error.response.data.message || error.response.statusText
        }`;
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = "Error setting up the request.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden perspective-800">
      <div className="absolute inset-0">
        <img
          src={atmback}
          alt="ATM Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10  p-8 rounded-lg  w-96  mr-60 mb-25">
        <div className="mb-4">
          <label
            htmlFor="accountNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Account Number:
          </label>
          <input
            type="text"
            id="accountNumber"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            min="0"
            step="100"
            autoComplete="off"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            value={balance}
            onChange={handleAmountChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default FundTransfer;
