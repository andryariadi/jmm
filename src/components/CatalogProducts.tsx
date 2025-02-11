import { getProducts } from "@/libs/actions";
import Search from "./Search";
import ProductLists from "./ProductLists";

const CatalogProducts = async ({ query }: { query?: string }) => {
  const { data: products } = await getProducts({ query });

  if (query && !products.length) {
    return (
      <>
        <Search query={query} />
        <p className="font-bold text-xl text-gray-300 uppercase">Product not found</p>
      </>
    );
  }

  // console.log({ products }, "<---catalogProducts");

  return (
    <div className="b-violet-600 w-full space-y-4">
      {/* Search */}
      <div className="b-amber-500 flex flex-col gap-y-3 justify-center">
        <Search query={query} />

        {/* Title */}
        <div className="bg-gradient-to-r from-primary to-violet-500 px-8 py-3 rounded-lg max-w-fit">
          <span className="uppercase text-gray-300 font-bold">{query ? `Search results for "${query}"` : "All Products"}</span>
        </div>
      </div>

      {/* Products List */}
      <ProductLists products={products} />
    </div>
  );
};

export default CatalogProducts;
