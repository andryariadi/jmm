import ButtonCart from "@/components/ButtonCart";
import FloatingShape from "@/components/FloatingShape";
import { getProductById } from "@/libs/actions";
import { formatCurrency } from "@/libs/utility";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { HiMiniMinusSmall } from "react-icons/hi2";

const ProductDetail = async ({ params }: { params: Promise<{ productId?: string }> }) => {
  const { productId } = await params;

  const { data: product } = await getProductById({ productId });

  //   console.log({ productId, product }, "<---productDetail");

  return (
    <div className="b-rose-600 relative min-h-screen pt-[5rem] flex items-center justify-center overflow-hidden">
      {/* Floating Shape */}
      <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

      <div className="b-violet-500 w-full max-w-5xl flex items-center gap-5">
        {/* Image Product */}
        <div className="b-amber-500 w-1/2 p-2 rounded-md border border-emerald-800">
          <div className="relative w-full min-h-[28rem] rounded-md overflow-hidden">
            <Image src={product?.image} alt={product?.name} fill className="object-cover rounded-md hover:scale-110 transition-all duration-300" />
          </div>
        </div>

        {/* Info Product */}
        <div className="b-pink-600 w-1/2 min-h-[28rem] space-y-10">
          {/* Title */}
          <div className="space-y-7 border-b border-emerald-800 pb-5">
            <div className="b-fuchsia-500 flex items-center justify-between">
              <h1 className="text-4xl font-bold">{product?.name}</h1>
              <span className="place-self-start border border-sky-500 px-2 py-1 mt-2 rounded-md text-xs text-sky-500">{product?.category}</span>
            </div>

            <p className="text-sm text-gray-300">{product?.description}</p>
          </div>

          {/* Price & Stock */}
          <div className="b-rose-500 flex flex-col gap-3 border-b border-emerald-800 pb-5">
            <span className="text-2xl text-sky-500 font-bold">{formatCurrency(product?.price)}</span>

            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-300">Avaliable:</span>
              <span className="text-sm text-sky-500">{product?.stock}</span>
            </div>
          </div>

          {/* Button */}
          <div className="b-sky-500 flex items-center gap-10 border-b border-emerald-800 pb-5">
            <div className="w-fit p-1 border border-gray-700 rounded-2xl shadow-xl flex items-center gap-2">
              <button className={`text-white`}>
                <HiMiniMinusSmall size={23} />
              </button>

              <span className="text-sm">3</span>

              <button className={`text-white`}>
                <BsPlus size={22} />
              </button>
            </div>

            <ButtonCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
