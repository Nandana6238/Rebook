"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(items);
  }, []);

  const removeBook = (id: string) => {
    const updated = cart.filter(
      (book) => book.id !== id
    );

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/"
          className="text-[#708238] font-semibold hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold mt-6 mb-8">
          Shopping Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {cart.map((book) => (
                <div
                  key={book.id}
                  className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">
                      {book.title}
                    </h3>

                    <p>{book.author}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      ${book.price}
                    </p>

                    <button
                      onClick={() => removeBook(book.id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold">
                Total: ${total.toFixed(2)}
              </h2>
              <Link
                 href="/checkout"
                 className="inline-block mt-4 bg-[#2F4F4F] text-white px-8 py-3 rounded-xl"
            >
                 Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}