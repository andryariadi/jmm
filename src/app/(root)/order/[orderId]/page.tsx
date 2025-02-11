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
    <div className="-sky-600 relative min-h-screen flex items-center justify-center py-5 pt-24">
      <div className="-violet-500 w-full max-w-5xl space-y-10">
        {order.items.map((item: OrderItem) => (
          <div key={item.product_id} className="b-rose-500 flex items-center gap-5">
            {/* Image Product */}
            <div className="b-amber-500 w-1/2 p-2 rounded-md border border-emerald-800">
              <div className="relative w-full min-h-[18.5rem] rounded-md overflow-hidden">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover rounded-md hover:scale-110 transition-all duration-300" />
              </div>
            </div>

            {/* Product Info */}
            <div className="b-pink-600 w-1/2 space-y-10">
              {/* Title */}
              <div className="space-y-7 border-b border-emerald-800 pb-5">
                <div className="b-fuchsia-500 flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{item.product.name}</h1>
                  <span className="place-self-start border border-sky-500 px-2 py-1 mt-2 rounded-md text-xs text-sky-500">{item.product.category}</span>
                </div>

                <p className="text-sm text-gray-300">{item.product.description}</p>
              </div>

              {/* Price & Stock */}
              <div className="b-rose-500 flex flex-col gap-3 border-b border-emerald-800 pb-5">
                <span className="text-2xl text-sky-500 font-bold">{formatCurrency(item.product.price)}</span>

                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-300">Avaliable:</span>
                  <span className="text-sm text-sky-500">{item.product.stock}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailPage;
