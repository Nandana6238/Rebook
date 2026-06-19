"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders") || "[]");

    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-5xl mx-auto">

        <Link
          href="/profile"
          className="text-[#708238] font-semibold hover:underline"
        >
          ← Back to Profile
        </Link>

        <h1 className="text-4xl font-bold mt-6 mb-8">
          📦 Order History
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No orders found.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="font-bold text-lg">
                  Order #{order.id}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  {order.date}
                </p>

                {order.items.map((book: any) => (
                  <div
                    key={book.id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{book.title}</span>
                    <span>${book.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}