import toast from "react-hot-toast";
import { create } from "zustand";
import { toastStyle } from "../utility";

// Define types for the product
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

// Define types for the cart state
interface CartState {
  cart: Product[];
  total: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number, stock: number) => void;
  removeFromCart: (productId: number) => void;
  calculateTotals: () => void;
  clearCart: () => void;
}

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = (): Product[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Create the store with types
export const useCartStore = create<CartState>((set, get) => ({
  cart: loadCartFromLocalStorage(), // Load cart from localStorage on initialization
  total: 0,
  subtotal: 0,

  // Menambahkan produk ke keranjang
  addToCart: (product) => {
    set((prevState) => {
      const existingItem = prevState.cart.find((item) => item.id === product.id);

      const newCart = existingItem
        ? prevState.cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1, stock: item.stock - 1 } : item))
        : [...prevState.cart, { ...product, quantity: 1, stock: product.stock - 1 }];

      saveCartToLocalStorage(newCart); // Save updated cart to localStorage
      toast.success("Product added to cart successfully!", {
        style: toastStyle,
        position: "bottom-right",
      });

      return { cart: newCart };
    });

    get().calculateTotals();
  },

  // Mengupdate jumlah produk di keranjang
  updateQuantity: (productId, quantity, stock) => {
    set((prevState) => {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return prevState;
      }

      const newCart = prevState.cart.map((item) => (item.id === productId ? { ...item, quantity, stock } : item));

      saveCartToLocalStorage(newCart); // Save updated cart to localStorage
      return { cart: newCart };
    });

    get().calculateTotals();
  },

  // Menghapus produk dari keranjang
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

  // Menghitung total dan subtotal
  calculateTotals: () => {
    const { cart } = get();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    set({ subtotal, total });
  },

  // Mengosongkan keranjang
  clearCart: () => {
    set({ cart: [], total: 0, subtotal: 0 });
    saveCartToLocalStorage([]); // Clear cart in localStorage
  },
}));
