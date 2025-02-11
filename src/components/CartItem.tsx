"use client";

import { useCartStore } from "@/libs/stores/useCartStore";
import { formatCurrency } from "@/libs/utility";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { PiTrashSimpleLight } from "react-icons/pi";

type ItemProps = {
  id: number;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

const CartItem = ({ item }: { item: ItemProps }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  console.log(item, "<---dicartItem");

  return (
    <div className="p-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="b-amber-500 max-w-max rounded-full border border-gray-700 overflow-hidden">
          <Image src={item.image} alt={item.name} width={100} height={100} className="object-cover hover:scale-125 transition-all duration-300" />
        </div>
        <div className="b-teal-600 flex flex-col gap-2 py-2">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <span className="text-emerald-500 text-base font-bold">${formatCurrency(item.price)}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Stock</span>
            <span className="text-rose-500 text-sm font-bold">{item.stock}</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="b-rose-700 flex flex-col gap-6">
        <button onClick={() => removeFromCart(item.id)} className="self-end">
          <PiTrashSimpleLight size={22} className="text-rose-500 hover:scale-110 transition-all duration-300" />
        </button>

        <div className="p-1 border border-gray-700 rounded-2xl shadow-xl flex items-center gap-2">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock + 1)} disabled={item.quantity === 0} className={`${item.quantity === 0 ? "text-gray-500" : "text-white"}`}>
            <HiMiniMinusSmall size={23} />
          </button>

          <span className="text-sm">{item.quantity}</span>

          <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock - 1)} disabled={item.stock === 0} className={`${item.stock === 0 ? "text-gray-500" : "text-white"}`}>
            <BsPlus size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
