"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(items);
  }, []);

  const removeBook = (id: string) => {
    const updated = wishlist.filter(
      (book) => book.id !== id
    );

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

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
          My Wishlist ❤️
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow">
            No books added yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl p-4 shadow"
              >
                <h3 className="font-bold">
                  {book.title}
                </h3>

                <p className="text-gray-600">
                  {book.author}
                </p>

                <p className="mt-2 font-bold text-[#708238]">
                  ${book.price}
                </p>

                <button
                  onClick={() => removeBook(book.id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}