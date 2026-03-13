"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const router = useRouter();

  useEffect(() => {
    const saveOrder = async () => {
      // Verify session with Stripe
      const res = await fetch("/api/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      });

      const data = await res.json();

      // Save order to DB
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
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-xl">
        Your order is currently being processed and will be delivered to your
        doorstep within the next few hours.
      </p>

      {/* View My Orders Link */}
      <Link
        href="/orders"
        className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition"
      >
        View My Orders
      </Link>
    </div>
  );
}