import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-[#F0EAD6] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-[#2F4F4F]">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for purchasing through ReBook.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-[#2F4F4F] text-white px-8 py-3 rounded-xl"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}