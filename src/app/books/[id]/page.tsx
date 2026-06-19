"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { books } from "@/data/books";
import Image from "next/image";

export default function BookDetails() {
  const params = useParams();
  const [wishlisted, setWishlisted] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [book, setBook] = useState<any>(null);
  
  useEffect(() => {
  const adminBooks = JSON.parse(
    localStorage.getItem("adminBooks") || "[]"
  );

  const allBooks = [
    ...books,
    ...adminBooks,
  ];

  const foundBook = allBooks.find(
    (b) => b.id === params.id
  );

  setBook(foundBook);
}, [params.id]);
  useEffect(() => {
  if (!book) return;

  const savedReviews = JSON.parse(
    localStorage.getItem(`reviews-${book.id}`) || "[]"
  );

  setReviews(savedReviews);
}, [book]);

  const addToWishlist = () => {
    if (!book) return;
  const existing =
    JSON.parse(localStorage.getItem("wishlist") || "[]");

  const alreadyExists = existing.find(
    (item: any) => item.id === book.id
  );

  if (!alreadyExists) {
    existing.push(book);
    localStorage.setItem(
      "wishlist",
      JSON.stringify(existing)
    );
  }

  setWishlisted(true);
};

const addToCart = () => {
  if (!book) return;

  const existing =
    JSON.parse(localStorage.getItem("cart") || "[]");

  const alreadyExists = existing.find(
    (item: any) => item.id === book.id
  );

  if (!alreadyExists) {
    existing.push(book);

    localStorage.setItem(
      "cart",
      JSON.stringify(existing)
    );
  }

  alert("Added to cart!");
};
const submitReview = () => {
  if (!review.trim() || !book) return;

  const newReview = {
    rating,
    comment: review,
  };

  const updatedReviews = [
    ...reviews,
    newReview,
  ];

  setReviews(updatedReviews);

  localStorage.setItem(
    `reviews-${book.id}`,
    JSON.stringify(updatedReviews)
  );

  setReview("");
  setRating(5);
};

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Book Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/"
          className="text-[#708238] font-semibold hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="mt-6 bg-white rounded-3xl shadow-lg p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Book Cover */}
            <Image
              src={book.image}
              alt={book.title}
              width={500}
              height={700}
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />

            {/* Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-[#2F4F4F]">
                {book.title}
              </h1>

              <p className="text-lg text-gray-600 mt-2">
                {book.author}
              </p>

              <div className="mt-6 bg-[#F0EAD6] p-5 rounded-xl space-y-3">
                <p>
                  <strong>Condition:</strong> {book.condition}
                </p>

                <p>
                  <strong>Seller:</strong> {book.seller}
                </p>

                <p>
                  <strong>Price:</strong> ${book.price}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="font-bold text-lg">
                  Description
                </h2>

                <p className="text-gray-700 mt-2">
                  {book.description}
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={addToCart}
                  className="bg-[#2F4F4F] text-white px-8 py-3 rounded-xl hover:bg-[#1E3333]"
                >
                  Add to Cart
                </button>

                <button
                  onClick={addToWishlist}
                  className="border border-[#2F4F4F] px-8 py-3 rounded-xl hover:bg-gray-100"
                >
                  {wishlisted ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
                </button>
                </div>

                <div className="mt-10 pt-8">

                 <h2 className="text-2xl font-bold mb-4">
                   ⭐ Reviews
                 </h2>

                <div className="space-y-4">

                   <select
                     value={rating}
                     onChange={(e) =>
        setRating(Number(e.target.value))
      }
      className="border p-2 rounded-lg"
    >
      <option value={5}>⭐⭐⭐⭐⭐</option>
      <option value={4}>⭐⭐⭐⭐</option>
      <option value={3}>⭐⭐⭐</option>
      <option value={2}>⭐⭐</option>
      <option value={1}>⭐</option>
    </select>

    <textarea
      placeholder="Write your review..."
      value={review}
      onChange={(e) =>
        setReview(e.target.value)
      }
      className="w-full border p-3 rounded-lg"
      rows={3}
    />

    <button
      onClick={submitReview}
      className="bg-[#708238] text-white px-6 py-3 rounded-lg"
    >
      Submit Review
    </button>

  </div>

  <div className="mt-8 space-y-4">
    {reviews.length === 0 ? (
      <p>No reviews yet.</p>
    ) : (
      reviews.map((r, index) => (
        <div
          key={index}
          className="bg-gray-50 p-4 rounded-xl"
        >
          <p>
            {"⭐".repeat(r.rating)}
          </p>

          <p className="mt-2">
            {r.comment}
          </p>
        </div>
      ))
    )}
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}