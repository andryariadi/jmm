import FloatingShape from "@/components/FloatingShape";
import { getOrderById } from "@/libs/actions";
import { formatCurrency } from "@/libs/utility";
import Image from "next/image";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
}

interface OrderItem {
  product_id: number;
  quantity: number;
  product: Product;
}

const OrderDetailPage = async ({ params }: { params: Promise<{ orderId?: string }> }) => {
  const { orderId } = await params;

  const { data: order } = await getOrderById({ orderId });

  console.log({ order }, "<---orderDetailPage");

  return (
    <div className="relative min-h-screen flex items-center justify-center py-5 pt-24 overflow-hidden">
      {/* Floating Shape */}
      <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

      <div className="w-full max-w-5xl space-y-10">
        {order.items.map((item: OrderItem) => (
          <div key={item.product_id} className="b-rose-500 flex items-center gap-5">
            {/* Image Product */}
            <div className="w-1/2 p-2 rounded-md border border-emerald-800">
              <div className="relative w-full min-h-[19rem] rounded-md overflow-hidden">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover rounded-md hover:scale-110 transition-all duration-300" />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-1/2 h-full max-h-[19rem] space-y-4">
              {/* Title */}
              <div className="space-y-3 border-b border-emerald-800 pb-3">
                <div className="b-fuchsia-500 flex items-center justify-between">
                  <h1 className="text-2xl font-bold">{item.product.name}</h1>
                  <span className="place-self-start border border-sky-500 px-2 py-1 mt-2 rounded-md text-xs text-sky-500">{item.product.category}</span>
                </div>

                <p className="text-sm text-gray-300">{item.product.description}</p>
              </div>

              {/* Price & Stock */}
              <div className="flex flex-col gap-1 border-b border-emerald-800 pb-3">
                <span className="text-2xl text-sky-500 font-bold">{formatCurrency(item.product.price)}</span>

                {/* Stock */}
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-300">Avaliable:</span>
                  <span className="text-sm text-sky-500">{item.product.stock}</span>
                </div>
              </div>

              {/* Quantity & Total Price */}
              <div className="flex flex-col gap-1 border-b border-emerald-800 pb-5">
                {/* Quantity */}
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-300">Quantity:</span>
                  <span className="text-sm text-sky-500">{item.quantity}</span>
                </div>

                {/* Total Price */}
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-300">Total Price:</span>
                  <span className="text-sm font-bold text-emerald-500">{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="b-amber-500 flex items-center justify-center px-5 py-2 rounded-md border border-emerald-800">
          <div className="b-rose-500 p-2 pe-5 border-e-2 border-emerald-800">
            <div className="flex items-center gap-1">
              <span className="text-lg text-gray-300">Total Items:</span>
              <span className="text-lg text-sky-500">{order.total_item}</span>
            </div>
          </div>

          <div className="b-sky-600 p-2">
            <div className="flex items-center gap-1 ps-3">
              <span className="text-lg text-gray-300">TotaL Price:</span>
              <span className="text-lg font-bold text-emerald-500">{formatCurrency(order.total_price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
