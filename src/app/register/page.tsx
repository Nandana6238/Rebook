"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // Simple notification fallback
  const addNotification = (msg: string) => {
    // using alert as a minimal cross-environment fallback
    alert(msg);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const userData = {
    name,
    email,
    password,
  };

  const existingUsers =
    JSON.parse(localStorage.getItem("users") || "[]");

  existingUsers.push(userData);

  localStorage.setItem(
    "users",
    JSON.stringify(existingUsers)
  );

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  addNotification("Registration Successful!");

  router.push("/");
};

  return (
    <div className="min-h-screen bg-[#F0EAD6] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-[#708238] text-white py-3 rounded-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
}