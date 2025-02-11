import { formatCurrency } from "@/libs/utility";
import Image from "next/image";
import { IoIosCart } from "react-icons/io";

type ProductProps = {
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  description: string;
};

const ProductCard = ({ product }: { product: ProductProps }) => {
  const category = product.category;
  const customPropertyName = `--is${category.charAt(0).toUpperCase() + category.slice(1)}`;

  // console.log({ product, customPropertyName }, "<---productCard");

  return (
    <article className="card b-violet-700 relative text-[#eee] w-[320px] flex-shrink-0" style={{ [customPropertyName]: "true" }}>
      <div className="author bg-bgrd w-[60%] h-[70px] grid grid-cols-[50px_1fr] gap-[20px] p-[10px] rounded-t-[30px]">
        <div>
          <Image src="/faviconn.svg" alt="Icon" width={50} height={50} className="w-full" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="name font-bold">Tukuo</span>
          <span className="text-sm">Store</span>
        </div>
      </div>

      <div className="bg-bgrd min-h-[18rem] p-2 flex items-center justify-center rounded-tr-[30px] overflow-hidden">
        <div className="b-amber-600 relative w-full min-h-[18rem]">
          <Image src={product.image} alt={product.name} fill className={` object-cover rounded-tr-[22px] rounded-md`} />
        </div>
      </div>

      <div className="info bg-bgrd text-center px-10 pt-1">
        <p className="text-base truncate w-full">{product.name}</p>
      </div>

      <div className="more bg-bgrd flex items-center justify-between px-5 py-5 rounded-b-[30px]">
        <button className="cart flex items-center gap-2">
          <div className="bg-zinc-900 size-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-logo transition-all duration-300">
            <IoIosCart size={24} className="hover:text-logo hover:scale-110 transition-all duration-300" />
          </div>
          <span>Buy Now</span>
        </button>
        <p className="price">{formatCurrency(product.price)}</p>
      </div>
    </article>
  );
};

export default ProductCard;
