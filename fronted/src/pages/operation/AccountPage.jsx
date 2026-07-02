import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function AccountPage({
  handleSubmit,
  formData,
  setFormData,
  handleCancel,
  handleChange,
}) {
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
              <div className="text-sm opacity-75">New Account Opening Form</div>
              <div className="text-xs text-blue-200">
                Form No. SB-101 • Version 2026
              </div>
            </div>
          </div>

          {/* Form Title */}
          <div className="px-8 py-5 border-b border-slate-200 bg-slate-50">
            <h2 className="text-2xl font-semibold text-slate-800">
              Savings / Current Account Opening Form
            </h2>
            <p className="text-slate-600 mt-1 text-sm">
              Please fill all details carefully. All fields marked with{" "}
              <span className="text-red-500">*</span> are mandatory.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-all"
                      placeholder="Enter your first name"
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-all"
                      placeholder="Enter your last name"
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-r-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c]"
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c]"
                      placeholder="yourname@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2 border-b pb-3">
                  <span className="text-[#002b5c]">📍</span> RESIDENTIAL ADDRESS
                </h3>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] resize-y"
                  placeholder="House No., Street, Locality, City, State, Pincode"
                />
              </div>

              {/* Identity Proof */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2 border-b pb-3">
                  <span className="text-[#002b5c]">🪪</span> IDENTITY &amp; KYC
                  DETAILS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      required
                      maxLength={10}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg uppercase tracking-widest focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c]"
                      placeholder="ABCDE1234F"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Aadhaar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      required
                      maxLength={14}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c]"
                      placeholder="1234 5678 9012"
                    />
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2 border-b pb-3">
                  <span className="text-[#002b5c]">🏦</span> ACCOUNT DETAILS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Account Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] bg-white"
                    >
                      <option value="savings">Savings Account</option>
                      <option value="current">Current Account</option>
                      <option value="salary">Salary Account</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Initial Deposit Amount (₹){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="initialDeposit"
                      value={formData.initialDeposit}
                      onChange={handleChange}
                      required
                      min="500"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c]"
                      placeholder="Minimum ₹500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nominee Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c]"
                      placeholder="Name of Nominee (Father / Mother / Spouse)"
                    />
                  </div>
                </div>
              </div>

              {/* Declaration */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-600">
                <p className="font-medium mb-2">Declaration:</p>
                <p>
                  I hereby declare that the information provided above is true
                  and correct to the best of my knowledge. I agree to abide by
                  the rules and regulations of the bank.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-4 text-slate-700 font-semibold border border-slate-300 rounded-xl hover:bg-slate-100 transition-all"
                >
                  CANCEL APPLICATION
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#002b5c] hover:bg-[#001f44] text-white font-semibold rounded-xl transition-all active:scale-[0.985] shadow-lg"
                >
                  SUBMIT APPLICATION
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          All information submitted is secure and encrypted • Bank Name • © 2026
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
