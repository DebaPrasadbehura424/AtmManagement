import React, { useState, useEffect } from "react";
import atmback from "../utils/atmimg.jpg";

import receipt from "../audios/Receipt.mp3";
import axios from "axios";

function Deposit() {
  const token = localStorage.getItem("token");
  const [depositAmount, setDepositAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/atmBalance/balanceEnquiry/${token}`
        );
        if (response.status === 202) {
          setBalance(response.data);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError("Error fetching balance. Please try again later.");
      }
    };

    fetchBalance();
  }, [token]);

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
    setError(null);
    setSuccessMessage(null);
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    // Validation for deposit to be a multiple of 100
    if (amount % 100 !== 0) {
      setError("Amount must be a multiple of 100.");
      return;
    }

    // Proceed with deposit
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.patch(
        `http://localhost:8080/atmBalance/deposit/${token}/${amount}`
      );

      if (response.status === 200 || response.status === 202) {
        new Audio(receipt).play();
        setTimeout(() => {
          setBalance((prevBalance) => prevBalance - amount);
          setSuccessMessage("");
        }, 9000);
        setSuccessMessage("Deposit successful!");
        setDepositAmount("");
      } else {
        setError(response.data.message || "Deposit failed. Please try again.");
      }
    } catch (err) {
      console.error("Deposit error:", err);
      setError("An error occurred during deposit.");
    } finally {
      setLoading(false);
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
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="atm-screen absolute text-green-950 p-6 rounded-[10px] shadow-lg w-[31%] h-82 mb-28 mr-[16%] z-10 transform-style-3d preserve-3d rotate-x-[12] bg-[#7B7B7B] backdrop-blur-sm">
        <div className="screen-content h-70 flex flex-col justify-center items-center">
          <p className="text-2xl font-bold mb-4">Deposit</p>
          <p className="text-xl mb-2">Current Balance: ₹{balance.toFixed(2)}</p>
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full text-black"
            placeholder="Enter amount"
            value={depositAmount}
            onChange={handleDepositChange}
            min="0"
            step="100"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-2">{successMessage}</p>
          )}
          <button
            onClick={handleDeposit}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Depositing..." : "Deposit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
