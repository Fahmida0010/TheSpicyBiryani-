"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ItemsPage() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(data => {
        // Fix ObjectId from MongoDB
        const fixedData = data.map(item => ({
          ...item,
          _id: item._id.$oid ? item._id.$oid : item._id
        }))
        setItems(fixedData)
      })
      .catch(err => console.error(err))
  }, [])

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Delicious Menu</h1>
        <p className="mt-3 text-lg text-gray-600">
          Handcrafted biryani • Authentic flavors • Made with love
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search biryani, kabab, dessert..."
          className="w-full px-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filtered.map(item => (
          <div
            key={item._id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg line-clamp-2">
                  {item.title}
                </h2>
              </div>

              {/* Price badge */}
              <div className="absolute top-4 right-4 bg-pink-600 text-white font-bold px-4 py-2 rounded-full shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                ${item.price}
              </div>
            </div>

            <div className="p-5">
              <p className="text-gray-600 text-sm md:text-base line-clamp-3 min-h-[4.5rem]">
                {item.short_description || "A delicious preparation made with premium ingredients..."}
              </p>

              <Link href={`/items/${item._id}`} className="block mt-6">
                <button className="w-full bg-gradient-to-r
                 from-green-600 to-red-700 hover:from-green-700
                  hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2">
                  <span>View Details</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500 text-xl">
          No items found matching your search 😔
        </div>
      )}
    </div>
  )
}