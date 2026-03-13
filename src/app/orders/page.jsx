"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import OrderCard from "../components/OrderCard";

export default function MyOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/get-orders");
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

//   if (!session)
//     return (
//       <p className="text-center mt-10 text-gray-700">
//         Please login to see your orders.
//       </p>
//     );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700">
        Loading your orders...
      </p>
    );

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-green-600">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center mt-6 text-gray-500">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}