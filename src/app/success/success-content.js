"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    const saveOrder = async () => {
      const res = await fetch("/api/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      });

      const data = await res.json();

      await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };

    if (session_id) {
      saveOrder();
    }
  }, [session_id]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-4 text-gray-600 max-w-xl">
        Your order is currently being processed and will be delivered soon.
      </p>

      <Link
        href="/orders"
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
      >
        View My Orders
      </Link>
    </div>
  );
}