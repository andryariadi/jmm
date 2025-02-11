"use client";

import { useCartStore } from "@/libs/stores/useCartStore";
import { motion } from "framer-motion";
import Link from "next/link";

type OrderItem = {
  product_id: number;
  quantity: number;
};

const OrderTable = () => {
  const { order } = useCartStore();

  const data = order.items;

  if (!data) return <span>Loading...</span>;

  console.log({ order, data }, "<----orderTable");

  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <motion.h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        Order Lists
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="rounded-lg shadow-lg">
        <div className="tableContainer max-h-[32rem] overflow-x-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700 text-left sticky top-0">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Product ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Total Price</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {data.map((item: OrderItem, index: number) => (
                <tr key={item.product_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/order/${order.order_id}`}>{order.order_id}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p>{item.product_id}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p>{item.quantity}</p>
                  </td>
                  {index % 2 === 0 && (
                    <td className="px-6 py-4 whitespace-nowrap" rowSpan={2}>
                      <p>{order.total_price}</p>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderTable;
