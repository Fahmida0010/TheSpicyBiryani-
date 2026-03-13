"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function ItemDetailsPage() {

  const { data: session } = useSession();

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

  const handleOrder = async () => {

    if (!session) {
      alert("Please login first");
      signIn();
      return;
    }

    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        title: item.title,
        category: item.category,
        price: item.price
      })
    });

    const data = await res.json();

    window.location.href = data.url;
  };


  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <div className="w-full h-96 bg-gray-300 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!item) {
    return <p className="p-10 text-center text-red-500">Item not found 😢</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">

      <img
        src={item.image || "/placeholder.png"}
        alt={item.title}
        className="w-full h-96 object-contain rounded bg-gray-100"
      />

      <h1 className="text-3xl font-bold mt-2">{item.title}</h1>

      <p className="mt-2 text-gray-600">{item.full_description}</p>

      <div className="mt-4 space-y-2">
        <p>
          <span className="font-semibold text-blue-600">Price:</span> ${item.price}
        </p>

        <p>
          <span className="font-semibold text-purple-600">Category:</span> {item.category}
        </p>

        <p>
          <span className="font-semibold text-green-600">Priority:</span> {item.priority}
        </p>

        <p>
          <span className="font-semibold text-orange-600">Date:</span> {item.date}
        </p>
      </div>

      <button
        onClick={handleOrder}
        className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
      >
        Order Now
      </button>

    </div>
  );
}