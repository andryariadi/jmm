import CatalogProducts from "@/components/CatalogProducts";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;

  return (
    <div className="min-h-screen pt-[5rem]">
      {/* Category Product */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 flex flex-col items-center gap-10">
        <div className="text-center b-violet-500">
          <h1 className="text-5xl sm:text-6xl font-bold h-[4.5rem]">Explore Our Products</h1>
          <p className="text-xl text-gray-300">Discover the lates trends in tecnology and eco-friendly furniture</p>
        </div>

        <CatalogProducts query={query} />
      </div>
    </div>
  );
}
