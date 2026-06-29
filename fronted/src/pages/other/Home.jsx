import React from "react";
import bankimg from "../utils/scotiabank.jpg";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import Tap3 from "../audios/Tap3.mp3";

function Home(props) {
  const navigate = useNavigate(null);
  const handleEnter = () => {
    new Audio(Tap3).play();

    navigate("/choose");
  };
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  };

  const buttonVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div className="Home w-full h-screen relative overflow-hidden">
      {" "}
      <motion.img
        src={bankimg}
        alt="bank photo"
        className="w-full h-full object-cover"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      />{" "}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={handleEnter}
      >
        <motion.button
          className="enter-button
          bg-white/70 hover:bg-white/90 border-2
            border-teal-500 text-teal-500 font-semibold py-4 px-8
             rounded-lg shadow-md transition duration-300 ease-in-out 
             transform hover:scale-105 text-xl md:text-2xl lg:text-3xl cursor-pointer"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          ENTER
        </motion.button>
      </div>
    </div>
  );
}

export default Home;
