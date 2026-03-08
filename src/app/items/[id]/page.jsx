"use client";

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

  // Skeleton UI for loading
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <div className="w-full h-96 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return <p className="p-10 text-center text-red-500">Item not found 😢</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {/* Full image without zoom cropping */}
      <img
        src={item.image || "/placeholder.png"}
        alt={item.title}
        className="w-full h-96 object-contain rounded bg-gray-100"
      />

      <h1 className="text-3xl font-bold mt-2">{item.title}</h1>
      <p className="mt-2 text-gray-600 leading-relaxed">{item.full_description}</p>

      <div className="mt-4 space-y-2">
        <p>
          <span className="font-semibold text-blue-600">Price:</span>{" "}
          <span className="text-gray-800">${item.price}</span>
        </p>
        <p>
          <span className="font-semibold text-purple-600">Category:</span>{" "}
          <span className="text-gray-800">{item.category}</span>
        </p>
        <p>
          <span className="font-semibold text-green-600">Priority:</span>{" "}
          <span className="text-gray-800">{item.priority}</span>
        </p>
        <p>
          <span className="font-semibold text-orange-600">Date:</span>{" "}
          <span className="text-gray-800">{item.date}</span>
        </p>
      </div>
    </div>
  );
}