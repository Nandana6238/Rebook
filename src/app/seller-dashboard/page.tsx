"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SellerDashboard() {
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [soldCount, setSoldCount] = useState(0);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const adminBooks = JSON.parse(
      localStorage.getItem("adminBooks") || "[]"
    );

    const sellerBooks = adminBooks.filter(
      (book: any) =>
        book.seller === user.name
    );

    setMyBooks(sellerBooks);

    const soldBooks = sellerBooks.filter(
      (book: any) => book.sold
    );

    setSoldCount(soldBooks.length);

    const totalEarnings = soldBooks.reduce(
      (sum: number, book: any) =>
        sum + book.price,
      0
    );

    setEarnings(totalEarnings);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/"
          className="text-[#708238] font-semibold"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold mt-6 mb-8">
          🏪 Seller Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold">
              📚 Books Listed
            </h2>

            <p className="text-4xl mt-4 font-bold">
              {myBooks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold">
              📦 Books Sold
            </h2>

            <p className="text-4xl mt-4 font-bold">
              {soldCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold">
              💰 Earnings
            </h2>

            <p className="text-4xl mt-4 font-bold">
              ${earnings}
            </p>
          </div>

        </div>

        <div className="bg-white mt-8 p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            My Books
          </h2>

          {myBooks.length === 0 ? (
            <p>No books listed yet.</p>
          ) : (
            <div className="space-y-4">

              {myBooks.map((book) => (
                <div
                  key={book.id}
                  className="border p-4 rounded-xl flex justify-between"
                >
                  <div>
                    <h3 className="font-bold">
                      {book.title}
                    </h3>

                    <p>{book.author}</p>
                  </div>

                  <div className="text-right">
                    <p>${book.price}</p>

                    <span
                      className={
                        book.sold
                          ? "text-red-500 font-bold"
                          : "text-green-600 font-bold"
                      }
                    >
                      {book.sold
                        ? "Sold"
                        : "Available"}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}