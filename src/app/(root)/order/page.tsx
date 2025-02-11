"use client";

import { useCartStore } from "@/libs/stores/useCartStore";

const OrderPage = () => {
  const { order } = useCartStore();

  console.log({ order }, "<----orderPage");

  return <div className="bg-sky-600 relative min-h-screen flex items-center justify-center py-5">OrderPage</div>;
};

export default OrderPage;
