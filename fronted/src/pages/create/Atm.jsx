import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import fail from "../audios/fail.mp3";
import success from "../audios/success.mp3";
import { useNavigate } from "react-router-dom";

function Atm({
  setAccountNumber,
  accountNumber,
  handleCreateATM,
  formData,
  setFormData,
}) {
  const [step, setStep] = useState("accountInput");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAccountDetails = async () => {
    if (!accountNumber.trim()) {
      Swal.fire("Warning", "Please enter account number", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:8080/info/getAtm/${accountNumber}`,
      );

      const user = response.data;

      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dob: user.dob || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        nomineeName: user.nomineeName || "",
        panNumber: user.panNumber || "",
        aadhaarNumber: user.aadhaarNumber || "",
        atmNumber: user.atmNumber || "",
        accountType: user.accountType?.toLowerCase() || "savings",
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
    if (e.key === "Enter") fetchAccountDetails();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          <div className="bg-[#002b5c] text-white px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-3xl font-bold text-[#002b5c]">
                A
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  ABC BANK
                </h1>
                <p className="text-blue-200 text-sm">
                  Trusted Banking Since 1952
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">ATM Card Issuance</div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="px-8 py-4 bg-slate-50 border-b flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === "accountInput" ? "bg-[#002b5c] text-white" : "bg-green-100 text-green-700"}`}
            >
              1
            </div>
            <div className="h-0.5 flex-1 bg-slate-200" />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === "atmPreview" ? "bg-[#002b5c] text-white" : "bg-slate-200 text-slate-400"}`}
            >
              2
            </div>
            <p className="ml-3 font-medium text-slate-600">
              {step === "accountInput" ? "Verify Account" : "ATM Card Preview"}
            </p>
          </div>

          <div className="p-8">
            {step === "accountInput" ? (
              /* ==================== ACCOUNT INPUT ==================== */
              <div className="max-w-md mx-auto text-center py-12">
                <div className="text-6xl mb-6">🏧</div>
                <h2 className="text-3xl font-semibold text-slate-800 mb-3">
                  Issue New ATM Card
                </h2>
                <p className="text-slate-600 mb-8">
                  Enter your account number to proceed
                </p>

                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Account Number"
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-xl focus:outline-none focus:border-[#002b5c] text-center tracking-widest mb-6"
                />

                <button
                  onClick={fetchAccountDetails}
                  disabled={loading}
                  className="w-full py-4 bg-[#002b5c] hover:bg-[#001f44] text-white font-semibold rounded-xl transition-all disabled:opacity-70 text-lg"
                >
                  {loading ? "Fetching..." : "Fetch Account Details"}
                </button>
              </div>
            ) : (
              /* ==================== ATM PREVIEW ==================== */
              <div className="space-y-10">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    Your ATM Card Preview
                  </h2>
                  <p className="text-slate-600">
                    This is how your card will look
                  </p>
                </div>

                {/* Realistic ATM Card Display */}
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                  {/* Front */}
                  <div
                    className="atm-card front w-full max-w-[380px] h-[240px] rounded-2xl p-6 relative shadow-2xl"
                    style={{
                      background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-2xl font-bold">ABC BANK</div>
                      <div className="text-xs bg-white/20 px-3 py-1 rounded">
                        VISA
                      </div>
                    </div>

                    <div className="mt-10 w-16 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg shadow-inner" />

                    <div className="mt-5 text-2xl font-mono tracking-widest">
                      {formData.atmNumber}
                    </div>

                    <div className="absolute bottom-6 left-6 text-sm uppercase">
                      {formData?.firstName} {formData?.lastName}
                    </div>
                    <div className="absolute bottom-6 right-6 text-sm">
                      12/29
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="atm-card back w-full max-w-[380px] h-[240px] rounded-2xl p-6 relative shadow-2xl overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #1e2937, #475569)",
                    }}
                  >
                    <div className="h-12 bg-black w-full absolute top-8" />
                    <div className="mt-24 text-center text-white/80 text-sm leading-relaxed">
                      For assistance call
                      <br />
                      <span className="font-mono text-lg">
                        1800-ABC-BANK (1800-222-265)
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 text-xs text-white/60">
                      ABC Bank • Authorized Signature
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <button
                    onClick={handleCreateATM}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl font-semibold py-5 px-16 rounded-2xl shadow-xl transition transform hover:scale-105"
                  >
                    Create ATM Card & Send Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Atm;
