import ProductCard from "./ProductCard";

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

const ProductLists = ({ products }: { products: ProductProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-14">
      {products.map((product: ProductProps) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductLists;
