import React, { useEffect, useState } from "react";
import atmback from "../utils/atmimg.jpg";
import fail from "../audios/fail.mp3";
import receipt from "../audios/Receipt.mp3";
import axios from "axios";

function Withdrawal() {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const token = localStorage.getItem("token");
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

  const handleWithdrawalChange = (e) => {
    setWithdrawalAmount(e.target.value);
    setError(null);
    setSuccessMessage(null);
  };

  const handleWithdrawal = async () => {
    const amount = parseFloat(withdrawalAmount);

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (amount % 100 !== 0) {
      setError("Amount must be a multiple of 100.");
      return;
    }

    if (amount > balance) {
      setError("Insufficient balance.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.patch(
        `http://localhost:8080/atmBalance/withdraw/${token}/${amount}`
      );

      if (response.status === 200 || response.status === 202) {
        new Audio(receipt).play();
        setTimeout(() => {
          setBalance((prevBalance) => prevBalance - amount);
          setSuccessMessage("");
        }, 9000);
        setSuccessMessage("Withdrawal successful!");
        setWithdrawalAmount("");
      } else {
        new Audio(fail).play();
        setError(
          response.data.message || "Withdrawal failed. Please try again."
        );
      }
    } catch (err) {
      new Audio(fail).play();
      setError("An error occurred during withdrawal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden perspective-800 ">
      <div className="absolute inset-0">
        <img
          src={atmback}
          alt="ATM Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="atm-screen absolute text-green-950 p-6 rounded-[10px] shadow-lg w-[31%] h-83 mb-27 mr-[16%] z-10 transform-style-3d preserve-3d rotate-x-12 bg-[#7B7B7B] backdrop-blur-sm">
        <div className="screen-content h-70 flex flex-col justify-center items-center">
          <p className="text-2xl font-bold mb-4">Withdrawal</p>
          <p className="text-xl mb-2">Current Balance: ₹{balance.toFixed(2)}</p>
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full text-black"
            placeholder="Enter amount"
            value={withdrawalAmount}
            onChange={handleWithdrawalChange}
            min="0"
            step="100"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-2">{successMessage}</p>
          )}
          <button
            onClick={handleWithdrawal}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Withdrawing..." : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;
