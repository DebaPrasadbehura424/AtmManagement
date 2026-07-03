import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function AtmHome() {
  const fileInputRef = useRef(null);

  const [operation, setOperation] = useState();
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");

  const renderContent = (operation) => {
    switch (operation) {
      case "createPin":
        return (
          <div className="h-full flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-6">Create PIN</h1>

            <input
              type="text"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Create 4 Digit PIN"
              className="w-72 p-3 rounded-xl text-black text-center text-xl"
            />
          </div>
        );

      case "enterPin":
        return (
          <div className="h-full flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-6">Enter PIN</h1>

            <input
              type="text"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-72 p-3 rounded-xl text-black text-center text-xl"
            />
          </div>
        );
      case "rendingCard":
        return (
          <div className="h-full flex flex-col items-center justify-center text-white ">
            <div className="flex items-center justify-center gap-4">
              <div className="animate-spin w-5 h-5 border-2 border-black"></div>
              <h3 className="text-2xl font-semibold mb-2">Rendering Card</h3>
            </div>
          </div>
        );

      case "oprationBoard":
        return (
          <div className="h-full flex flex-col justify-center items-center px-6 py-4">
            <h2 className="text-3xl font-bold text-white mb-8">
              Select Transaction
            </h2>

            <div className="grid grid-cols-2 gap-5 w-full max-w-2xl">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-4 rounded-lg shadow-lg transition">
                💰 Balance Inquiry
              </button>

              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg shadow-lg transition">
                💵 Cash Withdrawal
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-lg transition">
                💳 Deposit Cash
              </button>

              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg transition">
                🔄 Fund Transfer
              </button>

              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 rounded-lg shadow-lg transition">
                🔐 Change PIN
              </button>

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg shadow-lg transition">
                💳 Card Details
              </button>

              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg shadow-lg transition">
                ❌ Exit
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center">
            <h1 className="text-white text-5xl font-bold">
              Welcome to ABC BANK
            </h1>
          </div>
        );
    }
  };

  useEffect(() => {
    renderContent(operation);
  }, [operation]);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const image = e.target.files[0];

    if (!image) return;

    try {
      setOperation("rendingCard");

      const formData = new FormData();
      formData.append("image", image);

      // Flask OCR API
      const flaskResponse = await axios.post(
        "http://127.0.0.1:5001/text_detection",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const accountNumber = flaskResponse.data.accountNumber;

      setAccountNumber(accountNumber);

      try {
        const response = await axios.get(
          `http://localhost:8080/info/getAccount/${accountNumber}`,
        );
        const data = response.data;
        const pin = data?.pin;
        if (pin == null) {
          setOperation("createPin");
        } else {
          setOperation("enterPin");
        }
      } catch (err) {
        Swal.close();

        if (err.response && err.response.status === 404) {
          setOperation("createPin");
        } else {
          Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Unable to verify account.",
          });
        }
      }
    } catch (err) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "OCR Failed",
        text: "Unable to detect account number.",
      });

      console.log(err);
    }
  };

  const keypad = [
    "1",
    "2",
    "3",
    "←",
    "4",
    "5",
    "6",
    "CLR",
    "7",
    "8",
    "9",
    "CAN",
    "*",
    "0",
    "#",
    "ENT",
  ];

  const handleButtons = async (key) => {
    console.log(key);
    console.log(operation);

    if (key == "ENT") {
      if (operation == "createPin") {
        await axios
          .patch(
            `http://localhost:8080/info/update-pin/${accountNumber}/${pin}`,
          )
          .then(() => {
            setOperation("enterPin");
          })
          .catch((err) => {
            alert("Error Please Try Again");
          });
      } else if (operation == "enterPin") {
        await axios
          .patch(`http://localhost:8080/info/cheak-pin/${accountNumber}/${pin}`)
          .then(() => {
            setOperation("oprationBoard");
          })
          .catch((err) => {
            alert("Error Please Try Again");
          });
      }
    } else if (key == "CAN") {
    } else if (key == "CLR") {
    } else {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center p-3 sm:p-4 ">
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center p-3 sm:p-4">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* ATM MACHINE */}
        <div
          className="w-full max-w-[920px] h-[92vh] max-h-[680px]
    rounded-3xl bg-gradient-to-b from-zinc-300 via-zinc-400
    to-zinc-600 border-[14px] border-zinc-400 shadow-2xl
    shadow-black/90 overflow-hidden flex flex-col"
        >
          {/* HEADER */}
          <div className="h-16 sm:h-20 bg-gradient-to-r from-zinc-950 to-black flex items-center justify-center border-b-4 border-zinc-700">
            <h1 className="text-4xl sm:text-5xl font-black tracking-[8px] text-cyan-300">
              ABC BANK
            </h1>
          </div>

          {/* BODY */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col">
            <div className="flex gap-2 mb-6">
              {/* SCREEN */}
              <div className="flex-1">
                <div className="bg-zinc-900 rounded-2xl border-8 border-zinc-800 shadow-inner h-full">
                  <div className="h-full rounded-xl p-3 bg-gradient-to-br from-blue-950 via-sky-800 to-cyan-700 overflow-hidden">
                    {renderContent(operation)}
                  </div>
                </div>
              </div>

              {/* SIDE BUTTONS */}
              <div className="hidden sm:flex flex-col justify-center gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-xl bg-zinc-300 border-2 border-zinc-700"
                  />
                ))}
              </div>
            </div>

            {/* LOWER */}
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              {/* KEYPAD */}
              <div className="flex-1 flex justify-center">
                <div className="bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-3xl p-5 border-4 border-zinc-600 shadow-2xl w-full max-w-[450px]">
                  <div className="grid grid-cols-4 gap-2">
                    {keypad.map((key, i) => {
                      let color = "bg-zinc-200 hover:bg-white text-black";

                      if (key === "CLR") color = "bg-yellow-400 text-black";

                      if (key === "CAN") color = "bg-red-600 text-white";

                      if (key === "ENT") color = "bg-green-600 text-white";

                      return (
                        <button
                          key={i}
                          onClick={() => handleButtons(key)}
                          className={`${color} aspect-square text-xl font-bold transition-all`}
                        >
                          {key}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="w-full sm:w-64 flex flex-col gap-10">
                {/* CARD SLOT */}
                <div className="bg-zinc-900 rounded-3xl h-8 border-2 border-zinc-700 relative">
                  <button
                    className="bg-green-500 w-24 h-7 rounded-3xl font-bold hover:bg-green-600"
                    onClick={openFilePicker}
                  >
                    INSERT
                  </button>
                </div>

                {/* RECEIPT + CASH */}
                <div className="flex gap-4">
                  <div className="flex-1 bg-zinc-900 rounded-3xl p-4 border-2 border-zinc-700">
                    <h3 className="text-center text-white text-sm font-semibold mb-3">
                      RECEIPT
                    </h3>

                    <div className="h-3 bg-zinc-950 rounded-xl"></div>
                  </div>

                  <div className="flex-1 bg-zinc-900 rounded-3xl p-4 border-2 border-zinc-700">
                    <h3 className="text-center text-white text-sm font-semibold mb-3">
                      CASH
                    </h3>

                    <div className="h-8 bg-zinc-950 rounded-2xl relative">
                      <div className="absolute inset-0 bg-zinc-700 rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AtmHome;
