import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function Choose() {
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-3xl font-bold mb-8 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      >
        Welcome to Our ATM Services
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <NavLink to="/insertcard ">
          <motion.button
            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 text-lg w-full"
            variants={buttonVariants}
          >
            Existing User
          </motion.button>
        </NavLink>
        <NavLink to="/createatm">
          <motion.button
            className="bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 text-lg w-full"
            variants={buttonVariants}
          >
            New User Registration
          </motion.button>
        </NavLink>
      </div>
    </motion.div>
  );
}

export default Choose;
