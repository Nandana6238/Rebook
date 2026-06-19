import Link from "next/link";
import { books } from "@/data/books";

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/"
          className="text-[#708238] font-semibold hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-[#2F4F4F] mt-6 mb-8">
          Browse Books
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition"
            >
              <div
                className="h-48 rounded-xl flex items-center justify-center text-white font-bold text-center p-4 bg-gray-300"
                style={{ backgroundImage: `url(${book.image})`, backgroundSize: 'cover' }}
              >
                {book.title}
              </div>

              <h3 className="font-bold mt-4">
                {book.title}
              </h3>

              <p className="text-sm text-gray-600">
                {book.author}
              </p>

              <p className="mt-2 font-bold text-[#708238]">
                ${book.price}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}