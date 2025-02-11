"use client";

import { motion } from "framer-motion";
import EmptyCart from "@/components/EmptyCart";
import OrderSummary from "@/components/OrderSummary";
import { useCartStore } from "@/libs/stores/useCartStore";
import CartItem from "@/components/CartItem";

const CartPage = () => {
  const { cart } = useCartStore();

  console.log({ cart }, "<---diCartPage");

  return (
    <div className="b-sky-600 min-h-[calc(100vh-5rem)] flex items-center justify-center py-5">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="b-rose-600 w-full max-w-6xl mx-auto flex flex-col">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex justify-between">
            {/* Cart Items */}
            <div className="b-violet-600 w-full max-w-2xl space-y-10">
              <div className="space-y-3">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* <div>{cart.length > 0 && <PeopleAlsoBought />}</div> */}
            </div>

            {/* Order Summary */}
            <OrderSummary />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;
