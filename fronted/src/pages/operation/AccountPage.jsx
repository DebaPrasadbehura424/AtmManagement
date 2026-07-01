import React, { useState } from "react";

function AccountPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    address: "",
    panNumber: "",
    aadhaarNumber: "",
    accountType: "savings",
    initialDeposit: "",
    nomineeName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Creation Data:", formData);
    alert("✅ Account creation request submitted successfully!");
    // You can add actual API call here later
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(234,179,8,0.08)_20px,rgba(234,179,8,0.08)_40px)]" />

      <div className="max-w-2xl mx-auto py-12 px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-black border-4 border-yellow-400 px-10 py-4 mb-6">
            <h1
              className="text-5xl font-bold text-yellow-300 tracking-widest"
              style={{ fontFamily: "'Press Start 2P', system-ui" }}
            >
              OPEN NEW ACCOUNT
            </h1>
          </div>
          <p className="text-amber-300 text-xl">Fill the details carefully!</p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border-4 border-yellow-400 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-yellow-300 border-b border-yellow-400 pb-2">
                👤 Personal Details
              </h2>

              <div>
                <label className="block text-amber-300 mb-1">firstName</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-amber-300 mb-1">lastName</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-amber-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                  />
                </div>
                <div>
                  <label className="block text-amber-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-amber-300 mb-1">
                Residential Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300 resize-y"
                placeholder="House No, Street, City, Pincode"
              />
            </div>

            {/* Identity Proof */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-yellow-300 border-b border-yellow-400 pb-2">
                🪪 Identity Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-amber-300 mb-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300 uppercase"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                </div>
                <div>
                  <label className="block text-amber-300 mb-1">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                    placeholder="1234 5678 9012"
                    maxLength={14}
                  />
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-yellow-300 border-b border-yellow-400 pb-2">
                🏦 Account Details
              </h2>

              <div>
                <label className="block text-amber-300 mb-1">
                  Account Type
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                >
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                  <option value="salary">Salary Account</option>
                </select>
              </div>

              <div>
                <label className="block text-amber-300 mb-1">
                  Initial Deposit Amount (₹)
                </label>
                <input
                  type="number"
                  name="initialDeposit"
                  value={formData.initialDeposit}
                  onChange={handleChange}
                  required
                  min="500"
                  className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                  placeholder="Minimum ₹500"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1">
                  Nominee Name (Optional)
                </label>
                <input
                  type="text"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  className="w-full bg-black border-2 border-yellow-400 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-yellow-300"
                  placeholder="Father / Mother / Spouse Name"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-4 rounded-2xl border-2 border-white hover:bg-white hover:text-black transition-all font-bold text-lg"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg transition-all active:scale-95"
              >
                SUBMIT APPLICATION
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-amber-400/70 mt-6 text-sm">
          All fields are mandatory unless marked optional
        </p>
      </div>
    </div>
  );
}

export default AccountPage;
