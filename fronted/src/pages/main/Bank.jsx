import React from "react";
import { motion } from "framer-motion";
import bankInside from "../utils/bankInside.png"; // Your bank interior image
import { useNavigate } from "react-router-dom";

function Bank() {
  const navigate = useNavigate();
  const employees = [
    {
      title: "CASHIER",
      name: "Alex Rivera",
      desc: "Handles deposits, withdrawals & customer transactions with precision.",
      emoji: "💵",
    },
    {
      title: "MANAGER",
      name: "Sarah Chen",
      desc: "Oversees daily operations and ensures excellent customer service.",
      emoji: "⭐",
    },
    {
      title: "MAY I HELP YOU?",
      name: "Jordan Kim",
      desc: "Customer support & information desk. Happy to assist you!",
      emoji: "🙋",
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Bank Inside Background */}
      <img
        src={bankInside}
        alt="Bank Interior"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Retro neon vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000088_40%,transparent_80%)]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl font-bold text-yellow-400 mb-12 tracking-widest drop-shadow-lg"
          style={{ fontFamily: "'Press Start 2P', system-ui" }} // Retro pixel font
        >
          BANK STAFF
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {employees.map((emp, index) => (
            <motion.div
              key={index}
              onClick={() => navigate("/" + emp.title)}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.08, y: -10 }}
              className="group relative bg-gradient-to-b from-zinc-900 to-black border-4 border-yellow-400 p-8 rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Neon border glow */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-cyan-400 transition-all duration-300 rounded-xl" />

              <div className="text-7xl mb-6 text-center">{emp.emoji}</div>

              <h2 className="text-3xl font-bold text-yellow-300 text-center mb-2 tracking-wider">
                {emp.title}
              </h2>

              <h3 className="text-xl text-white text-center mb-4 font-mono">
                {emp.name}
              </h3>

              <p className="text-gray-300 text-center leading-relaxed text-lg">
                {emp.desc}
              </p>

              {/* Retro scanline effect */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0px,transparent_2px,#ffffff08_2px,#ffffff08_4px)] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="mt-12 px-8 py-3 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all"
        >
          ← RETURN TO LOBBY
        </motion.button>
      </div>
    </div>
  );
}

export default Bank;
