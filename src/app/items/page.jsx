"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(data => {
        // Fix ObjectId from MongoDB
        const fixedData = data.map(item => ({
          ...item,
          _id: item._id.$oid ? item._id.$oid : item._id
        }));
        setItems(fixedData);
      })
      .catch(err => console.error(err));
  }, []);

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Our Menu</h1>
      <p className="text-gray-500 mb-6">Explore our delicious biryani collection.</p>

      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-6 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item._id} className="border p-4 rounded shadow">
            <img src={item.image} className="w-full h-40 object-cover" />
            <h2 className="font-bold mt-2">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.short_description?.slice(0, 120)}...</p>
            <p className="font-semibold mt-2">${item.price}</p>

            <Link href={`/items/${item._id}`}>
              <button className="bg-red-500 text-white px-4 py-2 mt-3">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}