"use client";
import Link from "next/link";

const Logo = () => {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-2"
    >
      <img 
        src="/biryani1.jpg" 
        alt="Biryani Logo" 
        className="w-12 h-12 object-cover rounded-full"
      />

      <span className="text-2xl font-bold text-red-400">
        The Spicy
      </span>

      <span className="text-2xl font-bold text-yellow-700">
        Biryani
      </span>
    </Link>
  );
};

export default Logo;