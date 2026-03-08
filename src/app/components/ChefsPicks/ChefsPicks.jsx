// app/components/ChefsPicks/ChefsPicks.jsx
"use client";

import chefs from "./chefsData";

const ChefsPicks = () => {
  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">👨‍🍳 Chef’s Picks</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet our expert chefs crafting your favorite dishes with love and quality.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map(chef => (
            <div key={chef.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center">
              <img 
                src={chef.image} 
                alt={chef.name} 
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{chef.name}</h3>
              <p className="text-sm text-yellow-600 font-semibold">{chef.specialty}</p>
              <p className="text-gray-500 text-sm mt-1">{chef.experience} experience</p>
              <p className="text-red-500 text-sm font-medium mt-1">{chef.urgency}</p>
              <p className="text-gray-600 text-sm mt-2">{chef.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsPicks;