"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh]"
      style={{ backgroundImage: "url('/topvieweid.jpg')" }}
    >
      <div className="bg-black/70 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-28 text-center text-white">
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Taste the Authentic <span className="text-yellow-400">Spicy Biryani</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Crafted with premium ingredients and traditional spices.
            Experience the royal taste in every bite.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {/* Order Now Button */}
            <Link href="/items" className="bg-pink-400 text-black px-6 py-3 rounded-md font-semibold hover:scale-105 transition inline-block">
              Order Now
            </Link>

            {/* View Menu Button */}
            <Link href="/items" className="border border-blue-500 px-6 py-3 rounded-md hover:bg-blue-400 hover:text-black transition inline-block">
              View Menu
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;