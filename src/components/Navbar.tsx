"use client";

import { useCartStore } from "@/libs/stores/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RiLogoutCircleLine, RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const { cart } = useCartStore();

  const user = true;

  const handleMouseEnter = (icon: string) => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-[5rem] flex items-center bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg border-b border-emerald-800">
      <div className="container mx-auto px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover:scale-105 transition-all duration-300">
            <Image src="/logoo.svg" alt="Logo" width={100} height={100} />
          </Link>

          {/* Navbar */}
          <nav className="flex items-center gap-5 text-logo">
            {/* Home Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("home")} onMouseLeave={handleMouseLeave}>
              <Link href="/" className="flex items-center gap-1 hover:scale-110 transition-all duration-300">
                <BiHomeSmile size={26} />
              </Link>
              {hoveredIcon === "home" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Home</div>}
            </div>

            {/* Shopping Cart Icon with Tooltip */}
            {user && (
              <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("cart")} onMouseLeave={handleMouseLeave}>
                <Link href="/product/cart" className="hover:scale-110 transition-all duration-300">
                  <PiShoppingCartSimple size={26} />
                </Link>
                {hoveredIcon === "cart" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Cart</div>}
                {cart.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-rose-600 size-5 flex items-center justify-center rounded-full">
                    <span className="text-sm text-white">{cart.length}</span>
                  </div>
                )}
              </div>
            )}

            {/* Logout Icon with Tooltip */}
            <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter("auth")} onMouseLeave={handleMouseLeave}>
              {user ? (
                <>
                  <Link href="/login" className="flex items-center gap-1 hover:scale-110 transition-all duration-300">
                    <RiLogoutCircleRLine size={24} />
                  </Link>
                  {hoveredIcon === "auth" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Logout</div>}
                </>
              ) : (
                <>
                  <Link href="/signup" className="flex items-center gap-1 hover:scale-110 transition-all duration-300">
                    <RiLogoutCircleLine size={24} />
                  </Link>
                  {hoveredIcon === "auth" && <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-emerald-700 text-white text-sm rounded px-2 py-1 shadow-lg z-10">Signup</div>}
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
