import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditPage({
  handleSubmit,
  formData,
  setFormData,
  handleCancel,
  handleChange,
  setAccountNumber,
  accountNumber,
}) {
  const [step, setStep] = useState("accountNumber");
  const [loading, setLoading] = useState(false);

  const fetchAccountDetails = async () => {
    if (!accountNumber.trim()) {
      Swal.fire("Warning", "Please enter account number", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/info/getAccount/${accountNumber}`,
      );

      const user = response.data;
      console.log(user);

      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dob: user.dob || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        panNumber: user.panNumber || "",
        aadhaarNumber: user.aadhaarNumber || "",
        accountType: user.accountType?.toLowerCase() || "savings",
        initialDeposit: user.initialDeposit || user.balance || "",
        nomineeName: user.nomineeName || "",
        balance: user.balance || "",
        accountNumber: accountNumber,
      });

      setStep("editForm");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Account details loaded successfully.",
        timer: 2000,
      });
    } catch (err) {
      console.error("Full Error:", err);

      let errorMsg = "Account Not Found";

      if (err.response) {
        if (err.response.status === 404) {
          errorMsg = err.response.data || "Account does not exist";
        } else if (err.response.status === 500) {
          errorMsg = "Internal Server Error";
        }
      } else if (err.request) {
        errorMsg = "Cannot connect to server. Is backend running?";
      }

      Swal.fire({
        icon: "error",
        title: "Failed to Load Account",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchAccountDetails();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Bank Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          <div className="bg-[#002b5c] text-white px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-3xl font-bold text-[#002b5c]">
                B
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  BANK NAME
                </h1>
                <p className="text-blue-200 text-sm">
                  Trusted Banking Since 1952
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">Account Update Form</div>
              <div className="text-xs text-blue-200">
                Form No. SB-102 • Version 2026
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="px-8 py-4 bg-slate-50 border-b flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === "accountNumber"
                  ? "bg-[#002b5c] text-white"
                  : "bg-green-100 text-green-700"
              }`}
            >
              1
            </div>
            <div className="h-0.5 flex-1 bg-slate-200" />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === "editForm"
                  ? "bg-[#002b5c] text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              2
            </div>
            <p className="ml-3 font-medium text-slate-600">
              {step === "accountNumber" ? "Verify Account" : "Edit Details"}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {step === "accountNumber" ? (
              /* ==================== ACCOUNT NUMBER INPUT ==================== */
              <div className="max-w-md mx-auto text-center py-12">
                <div className="text-5xl mb-6">🔍</div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                  Enter Your Account Number
                </h2>
                <p className="text-slate-600 mb-8">
                  We will fetch your current details for editing
                </p>

                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Account Number (e.g. 1234567890)"
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-xl focus:outline-none focus:border-[#002b5c] text-center tracking-widest mb-6"
                />

                <button
                  onClick={fetchAccountDetails}
                  disabled={loading}
                  className="w-full py-4 bg-[#002b5c] hover:bg-[#001f44] text-white font-semibold rounded-xl transition-all disabled:opacity-70"
                >
                  {loading ? "Fetching Details..." : "Fetch Account Details"}
                </button>

                <button
                  onClick={handleCancel}
                  className="mt-4 text-slate-500 hover:text-slate-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            ) : (
              /* ==================== EDIT FORM ==================== */
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2 border-b pb-3">
                    <span className="text-[#002b5c]">👤</span> PERSONAL DETAILS
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2 border-b pb-3">
                    <span className="text-[#002b5c]">📍</span> ADDRESS
                  </h3>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                    placeholder="Full Address"
                  />
                </div>

                {/* KYC Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2 border-b pb-3">
                    <span className="text-[#002b5c]">🪪</span> KYC DETAILS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] uppercase"
                        maxLength={10}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                        maxLength={12}
                      />
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2 border-b pb-3">
                    <span className="text-[#002b5c]">🏦</span> ACCOUNT
                    INFORMATION
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Account Type
                      </label>
                      <select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                      >
                        <option value="savings">Savings</option>
                        <option value="current">Current</option>
                        <option value="fixed">Fixed Deposit</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nominee Name
                      </label>
                      <input
                        type="text"
                        name="nomineeName"
                        value={formData.nomineeName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c]"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 py-4 text-slate-700 font-semibold border border-slate-300 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-[#002b5c] hover:bg-[#001f44] text-white font-semibold rounded-xl transition-all"
                  >
                    UPDATE ACCOUNT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
