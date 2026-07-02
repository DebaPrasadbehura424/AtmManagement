import React, { useEffect, useRef, useState } from "react";
import bankimg from "../utils/Bank.png";
import guard from "../utils/guard.png";
import guard2 from "../utils/guard2.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Tap3 from "../audios/Tap3.mp3";

function Home() {
  const navigate = useNavigate();

  const [guardImage, setGuardImage] = useState(guard);
  const guardInterval = useRef(null);

  useEffect(() => {
    guardInterval.current = setInterval(() => {
      setGuardImage((prev) => (prev === guard ? guard2 : guard));
    }, 500);

    return () => clearInterval(guardInterval.current);
  }, []);

  const playSound = () => {
    clearInterval(guardInterval.current);
    new Audio(Tap3).play();
  };

  const enterBank = () => {
    playSound();
    navigate("/bank");
  };

  const enterATM = () => {
    playSound();
    navigate("/atm_home");
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {/* Background */}
        <motion.img
          src={bankimg}
          alt="Bank"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Guard */}
        <motion.img
          src={guardImage}
          alt="Guard"
          className="absolute bottom-6 left-30 w-80 z-10"
          transition={{
            repeat: Infinity,
            duration: 0.7,
          }}
        />

        {/* Buttons */}
        <div className="absolute bottom-10 right-10 flex gap-4 z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={enterBank}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            🏦 Enter Bank
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={enterATM}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            🏧 Enter ATM
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Home;
