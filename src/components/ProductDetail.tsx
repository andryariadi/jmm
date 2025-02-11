"use client";

import { formatCurrency } from "@/libs/utility";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { HiMiniMinusSmall } from "react-icons/hi2";
import ButtonCart from "./ButtonCart";
import { useCartStore } from "@/libs/stores/useCartStore";

type ProductProps = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  description: string;
  quantity: number;
};

const ProductDetail = ({ product }: { product: ProductProps }) => {
  const { cart, updateQuantity } = useCartStore();

  const productStorage = cart.find((item) => item.id === product?.id);
  const productData = productStorage ? productStorage : product;

  const handleDecreaseQuantity = () => {
    if (productData.quantity > 0) {
      updateQuantity(productData.id, productData.quantity - 1, productData.stock + 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (productData.stock > 0) {
      updateQuantity(productData.id, productData.quantity + 1, productData.stock - 1);
    }
  };

  console.log({ cart, product, productStorage }, "<---diproductDetail");

  return (
    <div className="b-violet-500 w-full max-w-5xl flex items-center gap-5">
      {/* Image Product */}
      <div className="b-amber-500 w-1/2 p-2 rounded-md border border-emerald-800">
        <div className="relative w-full min-h-[28rem] rounded-md overflow-hidden">
          <Image src={productData?.image} alt={productData?.name} fill className="object-cover rounded-md hover:scale-110 transition-all duration-300" />
        </div>
      </div>

      {/* Info Product */}
      <div className="b-pink-600 w-1/2 min-h-[28rem] space-y-10">
        {/* Title */}
        <div className="space-y-7 border-b border-emerald-800 pb-5">
          <div className="b-fuchsia-500 flex items-center justify-between">
            <h1 className="text-4xl font-bold">{productData?.name}</h1>
            <span className="place-self-start border border-sky-500 px-2 py-1 mt-2 rounded-md text-xs text-sky-500">{productData?.category}</span>
          </div>

          <p className="text-sm text-gray-300">{productData?.description}</p>
        </div>

        {/* Price & Stock */}
        <div className="b-rose-500 flex flex-col gap-3 border-b border-emerald-800 pb-5">
          <span className="text-2xl text-sky-500 font-bold">{formatCurrency(productData?.price)}</span>

          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-300">Avaliable:</span>
            <span className="text-sm text-sky-500">{productData?.stock}</span>
          </div>
        </div>

        {/* Button */}
        <div className="b-sky-500 flex items-center gap-10 border-b border-emerald-800 pb-5">
          <div className="w-fit p-1 border border-gray-700 rounded-2xl shadow-xl flex items-center gap-2">
            <button onClick={handleDecreaseQuantity} disabled={productData.quantity === 0} className={`${productData.quantity === 0 ? "text-gray-500 cursor-not-allowed" : "text-white"}`}>
              <HiMiniMinusSmall size={23} />
            </button>

            <span className="text-sm">{productData.quantity || 0}</span>

            <button onClick={handleIncreaseQuantity} disabled={productData.stock === 0} className={`${productData.stock === 0 ? "text-gray-500 cursor-not-allowed" : "text-white"}`}>
              <BsPlus size={22} />
            </button>
          </div>

          <ButtonCart product={productData} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
