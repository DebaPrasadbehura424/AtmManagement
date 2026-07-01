import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import bg from "../utils/bg.png";
import girl0 from "../utils/girl0.png";

function MayIHelpYou() {
  const [girlImage, setGirlImage] = useState(girl0);
  const blinkInterval = useRef(null);
  const navigate = useNavigate(null);

  const [currentText, setCurrentText] = useState("");
  const [over, setOver] = useState(true);
  const [task, setTask] = useState("welcome");
  const [subTask, setSubTask] = useState("");
  const [subMenu, setSubMenu] = useState();

  const subMenuContent = {
    bankbook: [
      {
        key: "createAccount",
        label: "Create New Account",
        emoji: "➕",
        color: "emerald",
      },
      {
        key: "editAccount",
        label: "Edit Account Details",
        emoji: "✏️",
        color: "amber",
      },
      {
        key: "deleteAccount",
        label: "Delete / Close Account",
        emoji: "🗑️",
        color: "red",
      },
    ],

    atm: [
      {
        key: "createAtm",
        label: "Apply for New ATM Card",
        emoji: "💳",
        color: "blue",
      },
      {
        key: "issueAtm",
        label: "Issue / Replace ATM Card",
        emoji: "🏧",
        color: "green",
      },
    ],
  };

  const dialogues = {
    welcome: "Hello! Good Morning. How can I help you today?",
    atm: "For ATM services, you can use our machines outside or apply for a new card here.",
    account:
      "Let me check your account details. May I have your account number?",
    problem:
      "I'm sorry to hear that. Please tell me more about the issue with your account.",
    createAccount:
      "Okay! You want to create a new account. Wait, I'll give you the details fill-up box.",
    editAccount:
      "Sure! Let's edit your account details. Please provide your account number.",
    deleteAccount:
      "I understand. For account deletion, we need to follow some formalities. Are you sure?",
  };

  // Typewriter Effect
  // Reliable Typewriter with Callback
  const typeWriter = (text, onComplete = null) => {
    setCurrentText("");

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setCurrentText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);

        // Final cleanup and callback
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
          setOver(false);
        }, 800);
      }
    }, 50);
  };

  const handleTask = (newTask) => {
    setTask(newTask);
    setSubTask(newTask);
    setSubMenu(subMenuContent[newTask]);
  };

  const handleSubTask = (key) => {
    setTask(null);
    setSubTask("");
    setOver(true);
    const message = dialogues[key];

    typeWriter(dialogues[key], () => {
      console.log("✅ Typewriter finished! Navigating now...", key);

      if (key === "createAccount") {
        navigate("/accountPage");
      }
      // Add more conditions here later
    });
  };

  useEffect(() => {
    typeWriter(dialogues.welcome);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <img
        src={bg}
        alt="Bank Counter"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Girl */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.img
          src={girlImage}
          alt="Receptionist"
          className="w-[520px] h-auto drop-shadow-2xl"
          animate={{ scale: [1, 1.03, 1], y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-950 via-amber-900 to-transparent" />

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="inline-block bg-black border-4 border-yellow-400 px-12 py-4">
          <h1
            className="text-5xl font-bold text-yellow-300 tracking-widest"
            style={{ fontFamily: "'Press Start 2P', system-ui" }}
          >
            MAY I HELP YOU?
          </h1>
        </div>
      </div>

      {over && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 w-[520px]"
        >
          <div className="relative bg-white text-black p-6 rounded-3xl border-8 border-black shadow-2xl">
            <div className="absolute -bottom-6 left-12 w-0 h-0 border-l-[25px] border-l-transparent border-t-[40px] border-t-white border-r-[25px] border-r-transparent" />
            <p className="text-xl text-center leading-relaxed min-h-[110px] font-medium">
              {currentText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Buttons*/}
      {task != null && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 grid grid-cols-2 gap-4 w-[520px]">
          <button
            onClick={() => handleTask("bankbook")}
            className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all active:scale-95"
          >
            📖 Bank Book Update
          </button>
          <button
            onClick={() => handleTask("atm")}
            className="p-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all active:scale-95"
          >
            🏧 ATM Services
          </button>
          <button
            onClick={() => handleTask("account")}
            className="p-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all active:scale-95"
          >
            👤 Account Information
          </button>
          <button
            onClick={() => handleTask("problem")}
            className="p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all active:scale-95"
          >
            ⚠️ Report Problem
          </button>
        </div>
      )}

      {subTask != "" && subMenu.length != 0 && (
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-[520px]">
          <div className="bg-zinc-900 border-4 border-yellow-400 p-8 rounded-3xl">
            <div className="grid gap-4">
              {subMenu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleSubTask(item.key)}
                  className={`p-5 rounded-2xl bg-${item.color}-600 hover:bg-${item.color}-700 
                       text-white font-semibold transition-all active:scale-95 text-lg flex items-center gap-3`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => window.history.back()}
              className="mt-6 w-full p-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-black transition-all font-bold"
            >
              ← Back to Main Menu
            </button>
          </div>
        </motion.div>
      )}

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-8 right-8 z-40 px-6 py-3 bg-black border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all font-bold"
      >
        ← BACK
      </button>

      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(transparent_0px,transparent_3px,rgba(255,255,255,0.08)_3px,rgba(255,255,255,0.08)_6px)]" />
    </div>
  );
}

export default MayIHelpYou;
