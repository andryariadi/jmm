"use client";

import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useCartStore } from "@/libs/stores/useCartStore";
import Link from "next/link";
import { formatCurrency } from "@/libs/utility";

const OrderSummary = () => {
  const { total, subtotal } = useCartStore();

  const savings = subtotal - total;

  console.log({ savings }, "<---disavings");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="b-green-800 space-y-5 w-full max-w-md">
      {/* Order Summary */}
      <div className="p-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl space-y-5">
        <div>
          {/* Title */}
          <h2 className="text-xl font-semibold text-emerald-400">Order Summary</h2>

          {/* Original Price */}
          <div className="flex flex-col gap-2 py-3 border-b border-gray-700 text-gray-400 text-base">
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-400">Original price</span>
              <span className="text-white">${formatCurrency(subtotal)}</span>
            </div>

            {savings > 0 && (
              <dl className="flex items-center justify-between gap-4">
                <dt>Savings</dt>
                <dd className="text-base font-medium text-rose-500">-${formatCurrency(savings)}</dd>
              </dl>
            )}
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between py-3">
            <span>Total</span>
            <span className="text-emerald-400">${formatCurrency(total)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-5">
          <motion.button
            className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Checkout
          </motion.button>

          <div className="group flex items-center justify-center gap-2 text-sm">
            <span>or</span>
            <Link href="/" className="text-emerald-400 group-hover:underline transition-all duration-300">
              Continue Shopping
            </Link>
            <IoIosArrowRoundForward size={20} className="text-emerald-400 group-hover:scale-110 transition-all duration-300:" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
