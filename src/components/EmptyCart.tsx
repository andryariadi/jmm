"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosCart } from "react-icons/io";

const EmptyCart = () => {
  return (
    <motion.div className="flex flex-col items-center justify-center space-y-4 py-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <IoIosCart size={100} className="hover:text-emerald-500 transition-all duration-300" />
      <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
      <p className="text-gray-400">Looks like you {"haven't"} added anything to your cart yet.</p>
      <Link href="/" className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
        Start Shopping
      </Link>
    </motion.div>
  );
};

export default EmptyCart;
