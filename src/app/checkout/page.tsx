"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const placeOrder = () => {
  const cart =
    JSON.parse(localStorage.getItem("cart") || "[]");

  const orders =
    JSON.parse(localStorage.getItem("orders") || "[]");

  const newOrder = {
    id: Date.now(),
    items: cart,
    total: cart.reduce(
      (sum: number, item: any) =>
        sum + item.price,
      0
    ),
    date: new Date().toLocaleDateString(),
    status: "Processing",
  };

  orders.push(newOrder);

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );

  const adminBooks =
    JSON.parse(
      localStorage.getItem("adminBooks") || "[]"
    );

  const updatedBooks = adminBooks.map(
    (book: any) => {
      const purchased = cart.find(
        (item: any) => item.id === book.id
      );

      if (purchased) {
        return {
          ...book,
          sold: true,
        };
      }

      return book;
    }
  );

  localStorage.setItem(
    "adminBooks",
    JSON.stringify(updatedBooks)
  );

  localStorage.removeItem("cart");

  router.push("/order-success");
};

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-[#2F4F4F] mb-8">
          Checkout
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <textarea
            placeholder="Delivery Address"
            className="w-full border p-3 rounded-lg"
            rows={4}
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <select
            className="w-full border p-3 rounded-lg"
            value={form.payment}
            onChange={(e) =>
              setForm({ ...form, payment: e.target.value })
            }
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Debit Card</option>
            <option>Credit Card</option>
          </select>

          <button
            onClick={placeOrder}
            className="w-full bg-[#2F4F4F] text-white py-4 rounded-xl"
          >
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
}