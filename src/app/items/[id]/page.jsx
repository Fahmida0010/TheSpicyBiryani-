"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemDetailsPage() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${params.id}`);
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [params.id]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!item) return <p className="p-10 text-center text-red-500">Item not found 😢</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={item.image || "/placeholder.png"} alt={item.title} className="w-full h-96 object-cover" />
      <h1 className="text-3xl font-bold mt-4">{item.title}</h1>
      <p className="mt-4 text-gray-600 leading-relaxed">{item.full_description}</p>
      <div className="mt-4 space-y-1">
        <p><strong>Price:</strong> ${item.price}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Priority:</strong> {item.priority}</p>
        <p><strong>Date:</strong> {item.date}</p>
      </div>
    </div>
  );
}