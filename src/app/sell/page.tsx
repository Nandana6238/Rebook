"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Good");
  const [image, setImage] = useState("");

  const listBook = () => {
    if (!title || !author || !price) {
      alert("Fill all fields");
      return;
    }

    const user =
      JSON.parse(localStorage.getItem("user") || "{}");

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      price: Number(price),
      sold:false,

      image:
        image || "/images/clean-code.jpg",

      seller:
        user.name || "Anonymous",

      condition,
      conditionColor: "bg-green-500",
      rating: 5,
      witnesses: 0,
      retailPrice: Number(price) + 10,
      discount: "10%",
      hasSummary: false,
    };

    const existingBooks =
      JSON.parse(
        localStorage.getItem("adminBooks") || "[]"
      );

    existingBooks.push(newBook);

    localStorage.setItem(
      "adminBooks",
      JSON.stringify(existingBooks)
    );

    alert("Book Listed Successfully!");

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-4xl font-bold mb-8">
          📖 Sell Your Book
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="/images/book.jpg"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={condition}
            onChange={(e) =>
              setCondition(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          >
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
          </select>

          <button
            onClick={listBook}
            className="w-full bg-[#2F4F4F] text-white py-4 rounded-xl"
          >
            List Book
          </button>

        </div>
      </div>
    </div>
  );
}