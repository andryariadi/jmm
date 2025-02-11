import toast from "react-hot-toast";
import { create } from "zustand";
import { toastStyle } from "../utility";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  category: string;
  description: string;
  image: string;
}

interface OrderItem {
  product_id: number;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  total_item: number;
  total_price: number;
}

interface CartState {
  cart: Product[];
  total: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number, stock: number) => void;
  removeFromCart: (productId: number) => void;
  calculateTotals: () => void;
  clearCart: () => void;
  order: OrderData[];
  checkout: () => void;
}

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return []; // Return empty array if running on the server
};

// Helper function to save order to localStorage
const saveOrderToLocalStorage = (order: OrderData[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("order", JSON.stringify(order));
  }
};

// Helper function to load cart from localStorage
const loadOrderFromLocalStorage = (): OrderData[] => {
  if (typeof window !== "undefined") {
    const order = localStorage.getItem("order");
    return order ? JSON.parse(order) : [];
  }
  return []; // Return empty array if running on the server
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: typeof window !== "undefined" ? loadCartFromLocalStorage() : [], // Load cart from localStorage only on the client
  total: 0,
  subtotal: 0,
  order: typeof window !== "undefined" ? loadOrderFromLocalStorage() : [], // Load order from localStorage only on the client

  checkout: async () => {
    try {
      const { cart } = get();

      const payload = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        total_item: cart.length,
        total_price: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      const res = await axios.post("https://fe-test-api.jmm88.com/api/orders", payload);

      console.log({ res }, "<----checkoutStore");

      if (res.data.status === 200) {
        toast.success(res.data.message, {
          style: toastStyle,
        });

        saveOrderToLocalStorage(res.data.data);

        set({ cart: [], total: 0, subtotal: 0, order: res.data.data });

        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again", {
        style: toastStyle,
      });
    }
  },

  addToCart: (product) => {
    set((prevState) => {
      const existingItem = prevState.cart.find((item) => item.id === product.id);

      const newCart = existingItem
        ? prevState.cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1, stock: item.stock - 1 } : item))
        : [...prevState.cart, { ...product, quantity: 1, stock: product.stock - 1 }];

      saveCartToLocalStorage(newCart); // Save updated cart to localStorage

      toast.success("Product added to cart successfully!", {
        style: toastStyle,
      });

      return { cart: newCart };
    });

    get().calculateTotals();
  },

  updateQuantity: (productId, quantity, stock) => {
    set((prevState) => {
      console.log({ quantity, stock }, "<-----updateQuantity");

      const newCart = prevState.cart.map((item) => (item.id === productId ? { ...item, quantity, stock } : item));

      if (quantity === 0) {
        get().removeFromCart(productId);
        return prevState;
      }

      saveCartToLocalStorage(newCart); // Save updated cart to localStorage
      return { cart: newCart };
    });

    get().calculateTotals();
  },

  removeFromCart: (productId) => {
    set((prevState) => {
      const newCart = prevState.cart.filter((item) => item.id !== productId);
      saveCartToLocalStorage(newCart); // Save updated cart to localStorage
      return { cart: newCart };
    });

    get().calculateTotals();

    toast.success("Product removed from cart successfully!", {
      style: toastStyle,
    });
  },

  calculateTotals: () => {
    const { cart } = get();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    set({ subtotal, total });
  },

  clearCart: () => {
    set({ cart: [], total: 0, subtotal: 0 });
    saveCartToLocalStorage([]); // Clear cart in localStorage
  },
}));
