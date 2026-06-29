import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import atmback from "../utils/atmimg.jpg";
import fail from "../audios/fail.mp3";
import success from "../audios/success.mp3";

function MobileRecharge(props) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [sim, setSim] = useState("airtel");
  const [plan, setPlan] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const plans = [
    { price: 199, validity: "24 days", data: "2GB/day", GST: 1 },
    { price: 299, validity: "28 days", data: "3GB/day", GST: 1 },
    { price: 399, validity: "56 days", data: "1.5GB/day", GST: 1 },
    { price: 599, validity: "84 days", data: "2GB/day", GST: 1 },
  ];

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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error fetching balance. Please try again later.",
        });
      }
    };

    fetchBalance();
  }, [token]);

  const handleRecharge = async () => {
    if (mobileNumber.length != 10) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid number.",
      });
      return;
    }
    if (!mobileNumber) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a mobile number.",
      });
      return;
    }
    if (!plan) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a plan.",
      });
      return;
    }

    const totalAmount = plan.price + plan.GST;

    if (totalAmount > balance) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Insufficient balance.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:8080/atmBalance/recharge/${token}/${totalAmount}`
      );

      if (response.status === 200 || response.status === 202) {
        new Audio(success).play();
        setBalance((prevBalance) => prevBalance - totalAmount);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Recharge of ₹${plan.price} successful! (Including ₹${plan.GST} GST)`,
        });
        setMobileNumber("");
        setPlan(null);
      } else {
        new Audio(fail).play();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Recharge failed. Please try again.",
        });
      }
    } catch (err) {
      new Audio(fail).play();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during recharge.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="absolute inset-0">
        <img
          src={atmback}
          alt="ATM Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className=" p-8 rounded-lg  w-full max-w-sm z-10 h-32 mb-70 mr-65">
        <div className="mb-4">
          <input
            type="tel"
            id="mobileNumber"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <select
            id="sim"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sim}
            onChange={(e) => setSim(e.target.value)}
          >
            <option value="airtel">Airtel</option>
            <option value="jio">Jio</option>
            <option value="bsnl">BSNL</option>
            <option value="idea">Idea</option>
          </select>
        </div>
        <div className="mb-6">
          <select
            id="plan"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={plan ? plan.price : ""}
            onChange={(e) => {
              const selectedPlan = plans.find(
                (p) => p.price === parseInt(e.target.value, 10)
              );
              setPlan(selectedPlan || null);
            }}
          >
            <option value="">Select a plan</option>
            {plans.map((p) => (
              <option key={p.price} value={p.price}>
                ₹{p.price} ({p.data} for {p.validity} & GST ₹{p.GST})
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleRecharge}
          disabled={loading}
        >
          {loading ? "Recharging..." : "Recharge"}
        </button>
      </div>
    </div>
  );
}

export default MobileRecharge;
