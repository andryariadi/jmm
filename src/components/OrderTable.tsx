"use client";

import { useCartStore } from "@/libs/stores/useCartStore";
import { formatCurrency } from "@/libs/utility";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const OrderTable = () => {
  const { order } = useCartStore();

  const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newColorMap: { [key: string]: string } = {};
    order.forEach((item) => {
      if (!colorMap[item.order_id]) {
        newColorMap[item.order_id] = generateRandomColor();
      }
    });
    setColorMap((prev) => ({ ...prev, ...newColorMap }));
  }, [order]);

  const data = order.flatMap((item) =>
    item.items.map((orderItem) => ({
      ...orderItem,
      totalPrice: item.total_price,
      totalItem: item.total_item,
      orderId: item.order_id,
    }))
  );

  if (!data) return <span>Loading...</span>;

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
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Total Item</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">Total Price</th>
              </tr>
            </thead>
            <tbody className="bg-gray-950 divide-y divide-gray-700">
              {data.map((item) => {
                return (
                  <tr key={`${item.orderId}-${item.product_id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/order/${item.orderId}`} style={{ color: colorMap[item.orderId] }}>
                        {item.orderId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-center">{item.product_id}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-center">{item.quantity}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-center">{item.totalItem}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-center">{formatCurrency(item.quantity * item.price)}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderTable;
