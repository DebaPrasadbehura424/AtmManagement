import React, { useEffect, useState } from "react";
import atmback from "../utils/atmimg.jpg";

import axios from "axios";

function BalanceInquiry() {
  const loading = false;
  const error = null;
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(0.0);
  useEffect(() => {
    const fetchBalance = async () => {
      await axios
        .get(`http://localhost:8080/atmBalance/balanceEnquiry/${token}`)
        .then((response) => {
          if (response.status === 202) {
            setBalance(response.data);
          }
        })
        .catch((err) => {
          alert(err);
        });
    };
    fetchBalance();
  }, [token]);

  return (
    <div className="balance-inquiry-container relative flex justify-center items-center h-screen overflow-hidden perspective-800">
      {" "}
      <div className="absolute inset-0">
        <img
          src={atmback}
          alt="ATM Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="atm-screen absolute  text-green-950 p-6 rounded-[10px] shadow-lg w-[31%] h-83 mb-27 mr-[16%] z-10 transform-style-3d preserve-3d  rotate-x-12">
        <div className="screen-content text-center  h-70 flex items-center justify-center">
          {loading && (
            <p className="loading-message text-yellow-400">
              Loading balance...
            </p>
          )}
          {error && (
            <p className="error-message text-red-500">Error: {error}</p>
          )}
          {balance !== null && (
            <div>
              <p className="balance-label text-2xl mb-2 font-extrabold">
                Your Balance:
              </p>
              <p className="balance-amount text-4xl font-extrabold">
                ₹{balance.toFixed(2)}
              </p>
            </div>
          )}
          {balance === null && !loading && !error && (
            <p>Could not retrieve balance.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BalanceInquiry;
