"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders.reverse());
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-5xl mx-auto">

        <Link
          href="/"
          className="text-[#708238] font-semibold"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold mt-6 mb-8">
          📦 Order History
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow">
            No orders found.
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <div className="flex justify-between mb-4">
                  <h2 className="font-bold">
                    Order #{order.id}
                  </h2>

                  <span className="text-green-600 font-bold">
                      {order.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  {order.date}
                </p>
                
                <div className="flex justify-between text-xs mt-4 mb-4">

                <span>
                  {order.status === "Processing"
                    ? "📦 Processing"
                    : "✅ Processing"}
                </span>

               <span>
                 {order.status === "Shipped"
                   ? "🚚 Shipped"
                   : "📦 Shipped"}
               </span>

                <span>
                  {order.status === "Out for Delivery"
                    ? "🚛 Out for Delivery"
                    : "📦 Out for Delivery"}
                </span>

                <span>
                  {order.status === "Delivered"
                    ? "✅ Delivered"
                    : "📦 Delivered"}
                </span>

                </div>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between"
                    >
                      <span>
                        {item.title}
                      </span>

                      <span>
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 font-bold">
                  Total: ${order.total}
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}