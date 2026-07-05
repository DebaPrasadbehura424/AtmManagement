import React, { useState } from "react";
import cash from "../utils/cash.png";
import axios from "axios";

function Cashier() {
  const [view, setView] = useState("welcome");

  const [formData, setFormData] = useState({
    accountNumber: "",
    name: "",
    transactionAmount: "",
    mode: "cash counter",
    operation: view,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      accountNumber: "",
      name: "",
      transactionAmount: "",
      mode: "cash counter",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      ...formData,
      operation: view,
    };

    try {
      const res = await axios.patch(
        "http://localhost:8080/info/transaction",
        data,
      );

      alert(res.data);

      if (view === "withdraw") {
        setView("takeMoney");
      } else {
        setView("depositSuccess");
      }
      resetForm();
    } catch (err) {
      alert(err.response?.data || "Transaction Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${cash})`,
      }}
    >
      {/* Dark Overlay */}
      {view === "welcome" && (
        <div className="absolute inset-0 bg-black/20"></div>
      )}

      {/* ---------------- Welcome ---------------- */}
      {view === "welcome" && (
        <div className="absolute bottom-10 right-10 flex flex-col gap-4 z-10">
          <button
            onClick={() => setView("withdraw")}
            className="w-56 rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white shadow-xl hover:bg-blue-700 duration-200"
          >
            Withdraw Cash
          </button>

          <button
            onClick={() => setView("deposit")}
            className="w-56 rounded-lg bg-green-600 py-3 text-lg font-semibold text-white shadow-xl hover:bg-green-700 duration-200"
          >
            Deposit Cash
          </button>
        </div>
      )}

      {/* ---------------- Form ---------------- */}
      {(view === "withdraw" || view === "deposit") && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            <h2 className="mb-6 text-center text-3xl font-bold">
              {view === "withdraw" ? "Withdraw Cash" : "Deposit Cash"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Account Holder Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />

              <input
                type="number"
                name="transactionAmount"
                placeholder={
                  view === "withdraw" ? "Withdraw Amount" : "Deposit Amount"
                }
                value={formData.transactionAmount}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                required
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setView("welcome")}
                  className="flex-1 rounded-lg bg-gray-500 py-3 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- Withdraw Success ---------------- */}
      {view === "takeMoney" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-[400px] rounded-2xl bg-white p-8 text-center shadow-2xl">
            <h1 className="mb-4 text-3xl font-bold text-green-600">
              Withdrawal Successful
            </h1>

            <p className="mb-8 text-gray-700">
              Please collect your cash from the cashier.
            </p>

            <button
              onClick={() => {
                setFormData({
                  accountNumber: "",
                  name: "",
                  date: "",
                  amount: "",
                });
                setView("welcome");
              }}
              className="rounded-lg bg-blue-600 px-10 py-3 text-white hover:bg-blue-700"
            >
              Take Money
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Deposit Success ---------------- */}
      {view === "depositSuccess" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-[400px] rounded-2xl bg-white p-8 text-center shadow-2xl">
            <h1 className="mb-4 text-3xl font-bold text-green-600">
              Cash Deposited
            </h1>

            <p className="mb-8 text-gray-700">
              Cash has been deposited successfully into your account.
            </p>

            <button
              onClick={() => {
                setFormData({
                  accountNumber: "",
                  name: "",
                  date: "",
                  amount: "",
                });
                setView("welcome");
              }}
              className="rounded-lg bg-green-600 px-10 py-3 text-white hover:bg-green-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cashier;
