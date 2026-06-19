"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { books } from "@/data/books";

export default function AdminPage() {
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [adminBooks, setAdminBooks] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [editingId, setEditingId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    const registeredUsers =
      JSON.parse(localStorage.getItem("users") || "[]");

    const savedOrders =
      JSON.parse(localStorage.getItem("orders") || "[]");
     
    const totalRevenue = savedOrders.reduce(
     (sum: number, order: any) =>
     sum + (order.total || 0),
     0
   );

    setRevenue(totalRevenue);

    setUsers(registeredUsers.length);
    setOrders(savedOrders);
    const savedBooks =
   JSON.parse(localStorage.getItem("adminBooks") || "[]");

     setAdminBooks(savedBooks);
  }, []);
  const addBook = () => {
  if (!title || !author || !price) {
    alert("Fill all fields");
    return;
  }

  const newBook = {
  id: Date.now().toString(),
  title,
  author,
  price: Number(price),

  image: image,
  seller: "Admin",
  condition: "Good",
  conditionColor: "bg-green-500",
  rating: 5,
  witnesses: 0,
  retailPrice: Number(price) + 10,
  discount: "10%",
  hasSummary: false,
 };

  const existingBooks =
    JSON.parse(localStorage.getItem("adminBooks") || "[]");

  existingBooks.push(newBook);

  localStorage.setItem(
    "adminBooks",
    JSON.stringify(existingBooks)
  );
  setAdminBooks(existingBooks);

  alert("Book Added Successfully!");

  setTitle("");
  setAuthor("");
  setPrice("");
  };
  const deleteBook = (id: string) => {
  const updatedBooks = adminBooks.filter(
    (book) => book.id !== id
  );

  setAdminBooks(updatedBooks);

  localStorage.setItem(
    "adminBooks",
    JSON.stringify(updatedBooks)
  );
  };
  const startEdit = (book: any) => {
  setEditingId(book.id);
  setEditTitle(book.title);
  setEditAuthor(book.author);
  setEditPrice(book.price.toString());
  };
  const saveEdit = () => {
  const updatedBooks = adminBooks.map((book) =>
    book.id === editingId? {
          ...book,
          title: editTitle,
          author: editAuthor,
          price: Number(editPrice),
        }
      : book
  );

  setAdminBooks(updatedBooks);

  localStorage.setItem(
    "adminBooks",
    JSON.stringify(updatedBooks)
  );

  setEditingId("");
  };
   const updateOrderStatus = (
  id: number,
  status: string
) => {
  const updatedOrders = orders.map(
    (order) =>
      order.id === id
        ? { ...order, status }
        : order
  );

  setOrders(updatedOrders);

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
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
          👨‍💼 Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold">
              📚 Total Books
            </h2>

            <p className="text-4xl mt-4 font-bold text-[#2F4F4F]">
              {books.length+adminBooks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold">
              👥 Total Users
            </h2>

            <p className="text-4xl mt-4 font-bold text-[#2F4F4F]">
              {users}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold">
              📦 Total Orders
            </h2>

            <p className="text-4xl mt-4 font-bold text-[#2F4F4F]">
              {orders.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold">
              💰 Revenue
            </h2>

            <p className="text-4xl mt-4 font-bold text-[#2F4F4F]">
              ${revenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow mt-8">
             <h2 className="text-2xl font-bold mb-4">
                 ➕ Add New Book
             </h2>

             <div className="space-y-4">

                 <input
                     type="text"
                     placeholder="Book Title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full border p-3 rounded-lg"
                 />

                 <input
                     type="text"
                     placeholder="Author"
                     value={author}
                     onChange={(e) => setAuthor(e.target.value)}
                     className="w-full border p-3 rounded-lg"
                 />

                 <input
                     type="number"
                     placeholder="Price"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     className="w-full border p-3 rounded-lg"
                 />
                 <input
                    type="text"
                   placeholder="/images/book.jpg"
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
                   className="w-full border p-3 rounded-lg"
                   />

                 <button
                     onClick={addBook}
                     className="bg-[#2F4F4F] text-white px-6 py-3 rounded-xl"
                 >
                     Add Book
                 </button>

             </div>
             <div className="bg-white p-6 rounded-2xl shadow mt-8">
               <h2 className="text-2xl font-bold mb-4">
                 📚 Added Books
               </h2>
                <p>Editing ID: {editingId}</p>
                 {adminBooks.length === 0 ? (
                   <p>No books added yet.</p>
                 ) : (
                    <div className="space-y-4">
                     {adminBooks.map((book) => (
                       <div
                         key={book.id}
                         className="border p-4 rounded-xl flex justify-between items-center"
                       >
                        {editingId === book.id ? (
                         <div className="space-y-2 flex-1">

                         <input
                           value={editTitle}
                           onChange={(e) =>
                           setEditTitle(e.target.value)
                          }
                          className="border p-2 rounded w-full"
                         />
                         <input
                           value={editAuthor}
                           onChange={(e) =>
                             setEditAuthor(e.target.value)
                           }
                           className="border p-2 rounded w-full"
                          />

                          <input
                            value={editPrice}
                            onChange={(e) =>
                              setEditPrice(e.target.value)
                            }
                            className="border p-2 rounded w-full"
                          />

                          <button
                            onClick={saveEdit}
                            className="bg-green-600 text-black px-4 py-2 rounded"
                          >
                          💾 Save Changes
                          </button>

                        </div>
                      ) : (
                       <>
                          <div>
                            <h3 className="font-bold">
                              {book.title}
                           </h3>

                           <p>{book.author}</p>

                           <p>${book.price}</p>
                          </div>

                          <div className="flex gap-2">
                           <button
                             onClick={() => startEdit(book)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                             ✏️ Edit
                            </button>

                            <button
                              onClick={() => deleteBook(book.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                             🗑 Delete
                          </button>
                           </div>
                         </>
                        )}
                       </div>
                     ))}
                   </div>
                  )}
               </div>
               <div className="bg-white p-6 rounded-2xl shadow mt-8">
  <h2 className="text-2xl font-bold mb-4">
    📦 Manage Orders
  </h2>

  {orders.length === 0 ? (
    <p>No orders yet.</p>
  ) : (
    <div className="space-y-4">

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 rounded-xl"
        >
          <div className="flex justify-between items-center">

            <div>
              <h3 className="font-bold">
                Order #{order.id}
              </h3>

              <p>
                Total: ${order.total}
              </p>
            </div>

            <select
              value={order.status}
              onChange={(e) =>
                updateOrderStatus(
                  order.id,
                  e.target.value
                )
              }
              className="border p-2 rounded"
            >
              <option>Processing</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>

          </div>
        </div>
      ))}

    </div>
  )}
</div>
         </div>
        </div>
      </div>
    </div>
  );
}