"use client";

import { useEffect, useState } from "react";

const categories = [
  "Chicken Biryani",
  "Beef Biryani",
  "Kachchi",
  "Tehari Special",
  "Tehari Special Platter",
  "Cold Drinks"
];

const FeaturedItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();

        const featured = categories
          .map((category) => data.find((item) => item.category === category))
          .filter(Boolean);

        setItems(featured);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Featured <span className="text-yellow-400">Items</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#1f2937] p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover rounded-md mb-4"
              />

              {/* Category Dynamic */}
              <p className="text-sm text-yellow-400 mb-1">
                {item.category}
              </p>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              {/* Short Description */}
              <p className="text-gray-300 text-sm mt-2">
                {item.short_description}
              </p>

              <p className="text-yellow-400 mt-3 font-semibold">
                ৳{item.price}
              </p>

              <button className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition">
                View Details
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedItems;