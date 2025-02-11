"use client";

import { useCartStore } from "@/libs/stores/useCartStore";
import { formatCurrency } from "@/libs/utility";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { PiTrashSimpleLight } from "react-icons/pi";

type ItemProps = {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  category: string;
  description: string;
  image: string;
};

const CartItem = ({ item }: { item: ItemProps }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleDecreaseQuantity = () => {
    if (item.quantity > 0) {
      updateQuantity(item.id, item.quantity - 1, item.stock + 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (item.stock > 0) {
      updateQuantity(item.id, item.quantity + 1, item.stock - 1);
    }
  };

  console.log({ item }, "<-----cartItem");

  return (
    <div className="p-5 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="b-amber-500 max-w-max rounded-md border border-gray-700 overflow-hidden">
          <div className="relative w-[5rem] h-[5rem]">
            <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-125 transition-all duration-300" />
          </div>
        </div>
        <div className="b-teal-600 flex flex-col gap-2 py-2">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <span className="text-emerald-500 text-base font-bold">{formatCurrency(item.price)}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Stock</span>
            <span className="text-rose-500 text-sm font-bold">{item.stock}</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="b-rose-700 flex flex-col gap-6">
        {/* Tombol Hapus */}
        <button onClick={() => removeFromCart(item.id)} className="self-end">
          <PiTrashSimpleLight size={22} className="text-rose-500 hover:scale-110 transition-all duration-300 pointer-events-auto" />
        </button>

        {/* Tombol Kurang/Tambah Quantity */}
        <div className="p-1 border border-gray-700 rounded-2xl shadow-xl flex items-center gap-2">
          <button onClick={handleDecreaseQuantity} disabled={item.quantity === 0} className={`${item.quantity === 0 ? "text-gray-500 cursor-not-allowed" : "text-white"}`}>
            <HiMiniMinusSmall size={23} />
          </button>

          <span className="text-sm">{item.quantity}</span>

          <button onClick={handleIncreaseQuantity} disabled={item.stock === 0} className={`${item.stock === 0 ? "text-gray-500 cursor-not-allowed" : "text-white"}`}>
            <BsPlus size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
