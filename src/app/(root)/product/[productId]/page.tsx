import FloatingShape from "@/components/FloatingShape";
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/libs/actions";

const ProductDetailPage = async ({ params }: { params: Promise<{ productId?: string }> }) => {
  const { productId } = await params;

  const { data: product } = await getProductById({ productId });

  return (
    <div className="relative min-h-screen pt-[5rem] flex items-center justify-center overflow-hidden">
      {/* Floating Shape */}
      <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
