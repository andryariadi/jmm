import FloatingShape from "@/components/FloatingShape";
import OrderTable from "@/components/OrderTable";

const OrderPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-5 overflow-hidden">
      {/* Floating Shape */}
      <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

      <OrderTable />
    </div>
  );
};

export default OrderPage;
