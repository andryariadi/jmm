"use client";

import { motion } from "framer-motion";
import { IoIosCart } from "react-icons/io";

const ButtonCart = () => {
  return (
    <motion.button
      className="w-fit py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
    >
      <IoIosCart size={24} />
      <span>Add to Cart</span>
    </motion.button>
  );
};

export default ButtonCart;
