"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name:'',
    email:'',
  });
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

  const cart =
    JSON.parse(localStorage.getItem("cart") || "[]");

  const wishlist =
    JSON.parse(localStorage.getItem("wishlist") || "[]");

  setCartCount(cart.length);
  setWishlistCount(wishlist.length);
}, []);

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/"
          className="text-[#708238] font-semibold hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-6">

          <h1 className="text-4xl font-bold text-[#2F4F4F] mb-8">
            👤 My Profile
          </h1>

          <div className="space-y-4 text-lg">
            <p>
              <strong>Username:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Books in Cart:</strong> {cartCount}
            </p>

            <p>
              <strong>Wishlist Items:</strong> {wishlistCount}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <Link
              href="/wishlist"
              className="bg-[#708238] text-white p-4 rounded-xl text-center hover:opacity-90"
            >
              ❤️ View Wishlist
            </Link>

            <Link
              href="/cart"
              className="bg-[#2F4F4F] text-white p-4 rounded-xl text-center hover:opacity-90"
            >
              🛒 View Cart
            </Link>
            <Link
              href="/profile/orders"
              className="bg-[#708238] text-white p-4 rounded-xl text-center"
            >
              📦 Order History
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}