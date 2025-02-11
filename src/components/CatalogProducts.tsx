import { getProducts } from "@/libs/actions";
import Search from "./Search";
import ProductLists from "./ProductLists";

const CatalogProducts = async ({ query }: { query?: string }) => {
  const { data: products } = await getProducts({ query });

  // console.log({ productsData }, "<---catalogProducts");

  return (
    <div className="b-violet-600 w-full space-y-10">
      {/* Search */}
      <div className="b-amber-500 flex justify-center">
        <Search query={query} />
      </div>

      {/* Products List */}
      <ProductLists products={products} />
    </div>
  );
};

export default CatalogProducts;
