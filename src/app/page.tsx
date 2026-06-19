"use client";

import Link from "next/link";
import { useEffect,useState } from "react";
import { books as SAMPLE_BOOKS } from "@/data/books";
import Image from "next/image";
import { books } from "@/data/books";

export default function Home() {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [showNotifications, setShowNotifications] =
  useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [selectedCategory, setSelectedCategory] =
  useState("All");
  const [adminBooks, setAdminBooks] = useState<any[]>([]);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

useEffect(() => {
  const cart =
    JSON.parse(localStorage.getItem("cart") || "[]");
  const wishlist =
    JSON.parse(localStorage.getItem("wishlist") || "[]"); 
  setCartCount(cart.length);
  setWishlistCount(wishlist.length);
  const savedBooks =
  JSON.parse(localStorage.getItem("adminBooks") || "[]");

  setAdminBooks(savedBooks);
  const savedNotifications = JSON.parse(
  localStorage.getItem("notifications") || "[]"
);

setNotifications(savedNotifications);
}, []);

  const allBooks = [
  ...books,
  ...adminBooks,
 ];

  const filteredBooks = allBooks.filter((book) => {
  const matchesSearch =
    book.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    book.author
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    book.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
  const categories = [
  "All",
  "Algorithms",
  "Java",
  "Interview Prep",
  "Programming",
  ];

  // Logout handler
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
    setUser(null);
  };
  const addNotification = (message: string) => {
  const newNotification = {
    id: Date.now(),
    message,
    time: new Date().toLocaleString(),
  };

  const updated = [
    newNotification,
    ...notifications,
  ];

  setNotifications(updated);

  localStorage.setItem(
    "notifications",
    JSON.stringify(updated)
  );
};
  
  return (
    <div className="min-h-screen bg-[#F0EAD6] text-[#2F4F4F] font-sans antialiased selection:bg-[#708238] selection:text-white">
      
      {/* 1. TOP STATUS / ACCESSIBILITY ANNOUNCEMENT HEADER */}
      <div className="bg-[#2F4F4F] text-[#F0EAD6] text-xs py-2 px-4 text-center font-medium tracking-wide sm:flex sm:justify-between sm:items-center">
        <span>🌍 Decentralized Circular Economy Marketplace — Powered by PeerTrust</span>
        <span className="hidden sm:inline-block opacity-80">🌐 Multi-Language Supported (100+ Locales)</span>
      </div>

      {/* 2. RESPONSIVE GLOBAL STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#F0EAD6]/90 backdrop-blur-md border-b border-[#2F4F4F]/10 px-4 lg:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Frame */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-[#2F4F4F]">ReBook</span>
            <span className="h-2 w-2 rounded-full bg-[#708238]" />
          </div>

          {/* Desktop Core Paths Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-semibold text-sm">
            <a href="#discovery" className="text-[#708238] transition-colors">Home</a>
            <a href="#featured" className="hover:text-[#708238] transition-colors">Marketplace</a>
            <a href="#ai-engine" className="hover:text-[#708238] transition-colors">AI Diagnostics</a>
            <a href="#impact" className="hover:text-[#708238] transition-colors">Eco Metrics</a>
          </nav>

          {/* Top Utility Interactors */}
          <div className="flex items-center space-x-3">
            <button
               onClick={() => setMenuOpen(!menuOpen)}
               className="bg-white p-3 rounded-xl shadow"
            >
               ☰
            </button>

            <button
  onClick={() =>
    setShowNotifications(!showNotifications)
  }
  className="p-2 bg-white rounded-full border relative"
>
  🔔

  {notifications.length > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
      {notifications.length}
    </span>
  )}
</button>
            <Link
             href="/wishlist"
             className="hidden sm:inline-flex items-center text-xs font-bold border border-[#708238] rounded-full px-4 py-2 hover:bg-[#708238] hover:text-white transition-all"
            >
             ❤️ Wishlist ({wishlistCount})
            </Link>
            <Link
               href="/cart"
               className="hidden sm:inline-flex items-center text-xs font-bold border border-[#2F4F4F] rounded-full px-4 py-2"
            >
             🛒 CART ({cartCount})
            </Link>
          {user ? (
            <div className="flex items-center gap-3">
             <span className="font-semibold">
               👤 {user.name || user.email}
             </span>
            </div>
          ) : (
          <div className="flex items-center gap-2">
  <Link
    href="/login"
    className="hidden sm:inline-flex items-center text-xs font-bold border border-[#2F4F4F] rounded-full px-4 py-2 hover:bg-[#2F4F4F] hover:text-[#F0EAD6]"
  >
    Login
  </Link>

  <Link
    href="/register"
    className="hidden sm:inline-flex items-center text-xs font-bold bg-[#708238] text-white rounded-full px-4 py-2 hover:bg-[#5d6d2e]"
  >
    Register
  </Link>
</div>  
         )}  
          </div>
        </div>
      </header>
      {showNotifications && (
  <div className="absolute right-10 top-20 bg-white w-80 shadow-xl rounded-xl p-4 z-50">

    <h3 className="font-bold mb-3">
      Notifications
    </h3>

    {notifications.length === 0 ? (
      <p>No notifications</p>
    ) : (
      notifications.map((n) => (
        <div
          key={n.id}
          className="border-b py-2"
        >
          <p>{n.message}</p>

          <p className="text-xs text-gray-500">
            {n.time}
          </p>
        </div>
      ))
    )}
  </div>
)}
      {menuOpen && (
  <div className="absolute top-24 left-8 bg-white shadow-xl rounded-xl p-4 w-64 z-50">
    <div className="flex flex-col gap-4 text-sm font-semibold">

      <a href="#discovery">🏠 Home</a>

      <Link href="/seller-dashboard">
        🏪 Seller Dashboard
      </Link>

      <Link href="/admin">
        👨‍💼 Admin Dashboard
      </Link>
      <Link href="/orders">
       📦 Order History
      </Link>
      <Link href="/profile">
        👤 Profile
      </Link>

      <button
        onClick={handleLogout}
        className=" text-left text-red-500"
      >
        🚪 Logout
      </button>

    </div>
  </div>
)}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">

        {/* 3. HERO SEGMENT & SEARCH HUB */}
        <section id="discovery" className="text-center space-y-6 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center space-x-2 bg-[#708238]/10 text-[#708238] border border-[#708238]/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            <span>✨ ReBook AI Engine v3.0 Active</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2F4F4F] leading-none">
            Pre-owned books, mapped as <span className="text-[#708238]">friends for life</span>.
          </h1>
          <p className="text-sm sm:text-base text-[#2F4F4F]/80 max-w-xl mx-auto leading-relaxed">
            Eliminate shelf anxiety. Access a verified peer-to-peer ecosystem built to automate negotiation, filter by summaries, and trace verified copy assets natively.
          </p>

          {/* Global Search Bar Widget Component */}
          <div className="w-full max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white border-2 border-[#2F4F4F] rounded-full shadow-md overflow-hidden group focus-within:ring-4 focus-within:ring-[#708238]/20 transition-all">
              <div className="pl-5 text-[#2F4F4F]/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search titles, authors, verified ISBN barcodes..." 
                className="w-full px-3 py-4 text-sm sm:text-base bg-transparent text-[#2F4F4F] placeholder-[#2F4F4F]/50 font-medium focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-[#2F4F4F] text-[#F0EAD6] font-bold text-xs sm:text-sm px-6 h-full absolute right-0 top-0 bottom-0 hover:bg-[#1E3333] transition-colors uppercase tracking-wider">
                Find Title
              </button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-3 text-xs font-semibold">
              <span className="text-[#2F4F4F]/60">Trending:</span>
              <button
                 onClick={() => setSearch("Algorithms")}
                 className="px-3 py-1 bg-[#2F4F4F]/5 rounded-full hover:bg-[#2F4F4F]/10"
              >
               Algorithms
              </button>
              <button
                 onClick={() => setSearch("Data Structures")}
                 className="px-3 py-1 bg-[#2F4F4F]/5 rounded-full hover:bg-[#2F4F4F]/10"
              >
               Data Structures
              </button>
              <button
                 onClick={() => setSearch("Rust Web Apps")}
                 className="px-3 py-1 bg-[#2F4F4F]/5 rounded-full hover:bg-[#2F4F4F]/10"
              >
               Rust Web Apps
              </button>
            </div>
          </div>
        </section>

        {/* 4. HIGH-CONTRAST CONVERSION WORKFLOW CTA PLATFORMS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#2F4F4F]/10 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#708238]/10 text-[#708238] flex items-center justify-center font-bold text-lg">🛒</div>
              <h3 className="font-bold text-base">Acquire Safely</h3>
              <p className="text-xs text-[#2F4F4F]/70">Explore verified original physical copies with locked 72-hour escrow safety triggers.</p>
            </div>
            <Link
               href="/books"
               className="mt-4 w-full bg-[#2F4F4F] text-[#F0EAD6] text-xs font-bold py-3 px-4 rounded-xl hover:bg-[#1E3333] transition-colors uppercase tracking-wider text-center block"
            >
               Buy Books
             </Link>
          </div>

          <div className="bg-white border border-[#2F4F4F]/10 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#708238]/10 text-[#708238] flex items-center justify-center font-bold text-lg">➕</div>
              <h3 className="font-bold text-base">Scan-to-List System</h3>
              <p className="text-xs text-[#2F4F4F]/70">Auto-populate system metadata matching target condition algorithms inside 60 seconds.</p>
            </div>
            <Link
               href="/sell"
               className="mt-4 w-full bg-[#708238] text-white text-xs font-bold py-3 px-4 rounded-xl hover:bg-[#5C6B2E] transition-colors uppercase tracking-wider text-center block"
            >
               Sell Books
             </Link>
          </div>

          <div className="bg-white border border-[#2F4F4F]/10 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#708238]/10 text-[#708238] flex items-center justify-center font-bold text-lg">🔄</div>
              <h3 className="font-bold text-base">Direct Peer Exchange</h3>
              <p className="text-xs text-[#2F4F4F]/70">Swap eligible contemporary books under compliance constraints effortlessly.</p>
            </div>
            <Link
               href="/exchange"
               className="mt-4 w-full bg-transparent text-[#2F4F4F] border-2 border-[#2F4F4F] text-xs font-bold py-3 px-4 rounded-xl hover:bg-[#2F4F4F] hover:text-[#F0EAD6] transition-all uppercase tracking-wider text-center block"
            >
              Exchange Books
            </Link>
          </div>
        </section>

        {/* 5. SUSTAINABILITY DYNAMIC ECO-IMPACT TRACKER WIDGET */}
        <section id="impact" className="bg-white border-2 border-[#708238] rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-36 h-36 rounded-full bg-[#708238]/5 pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-block bg-[#708238] text-white font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded">
                🌱 Platform Eco Audit
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Your Community Sustainability Scorecard</h2>
              <p className="text-xs sm:text-sm text-[#2F4F4F]/80 leading-relaxed">
                By maintaining books inside the circular economy loop instead of purchasing raw printed catalog units, your account prevents immediate deforestation metrics.
              </p>
            </div>
            
            {/* Core Metrics Visual Output Block */}
            <div className="grid grid-cols-2 gap-4 md:w-80 shrink-0">
              <div className="bg-[#708238]/10 border border-[#708238]/20 rounded-xl p-4 text-center">
                <span className="block text-2xl mb-1">🌳</span>
                <span className="block text-lg font-bold text-[#2F4F4F]">12 lbs Saved</span>
                <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#708238]">CO₂ Emissions</span>
              </div>
              <div className="bg-[#708238]/10 border border-[#708238]/20 rounded-xl p-4 text-center">
                <span className="block text-2xl mb-1">💧</span>
                <span className="block text-lg font-bold text-[#2F4F4F]">24 Cups Saved</span>
                <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#708238]">Water Volume</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#2F4F4F]/10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[#2F4F4F]/70">
            <span>• Estimated 1 lb CO₂ preserved per copy lifecycle expansion</span>
            <span>• Over 2 cups pure water saved relative to traditional manufacturing</span>
          </div>
        </section>

        {/* 6. FEATURED BOOK LISTINGS STREAM (GRID) */}
        <section id="featured" className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#2F4F4F]/10 pb-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Active Live Marketplace Listings</h2>
              <p className="text-xs text-[#2F4F4F]/70">Pre-owned listings carrying verified media previews uploaded by certified community members.</p>
            </div>
            <a href="#marketplace" className="text-xs font-bold text-[#708238] hover:underline whitespace-nowrap">View Stream →</a>
          </div>
           {/* Category Filters */}
           <div className="flex flex-wrap gap-3 mb-8">
             {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => setSelectedCategory(category)}
                 className={`px-4 py-2 rounded-full border ${
                   selectedCategory === category
                     ? "bg-[#2F4F4F] text-white"
                     : "bg-white"
                  }`}
                >
                   {category}
               </button>
              ))}
          </div>
          {filteredBooks.length === 0 ? (
           <div className="text-center py-16">
             <div className="text-5xl mb-3">📚</div>
               <h3 className="text-xl font-bold">
                 No books found
               </h3>
               <p className="text-[#2F4F4F]/70">
                 Try searching for another title or author.
               </p>
             </div>
          ) : (
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl p-4 border border-[#2F4F4F]/10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative group">
                
                {/* Book Media Container Wrapper */}
                <div>
                <div className="relative mb-4">
                   <Image
                     src={book.image}
                     alt={book.title}
                     width={300}
                     height={400}
                     className="w-full h-48 object-cover rounded-xl"
                   />

                   {book.sold && (
                     <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                       SOLD
                     </span>
                   )}

                    <span className="absolute bottom-2 right-2 bg-black/60 text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                     📷 Real Asset Photo
                    </span>

                    <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-xs shadow-sm transition-colors text-[#D9534F]">
                     ❤
                    </button>
                </div>

                  {/* Badges Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className={`text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center ${book.conditionColor}`}>
                      {book.condition}
                    </span>
                    {book.hasSummary && (
                      <span className="bg-[#708238]/10 text-[#708238] border border-[#708238]/20 text-[9px] font-bold px-2 py-0.5 rounded">
                        📝 Summary Inc.
                      </span>
                    )}
                  </div>

                  {/* Core Text Label Stack */}
                  <h4 className="font-bold text-sm sm:text-base tracking-tight truncate text-[#2F4F4F]">{book.title}</h4>
                  <p className="text-xs text-[#2F4F4F]/70 truncate mb-2">{book.author}</p>
                </div>

                {/* Seller & Transaction Section */}
                <div className="mt-4 pt-3 border-t border-[#2F4F4F]/5 space-y-3">
                  <div className="text-[10px] text-[#2F4F4F]/80 font-medium">
                    <span className="font-bold text-[#2F4F4F]">👤 {book.seller || "Admin"}</span>
                    <span className="mx-1">•</span>
                    <span>{book.rating} ({book.witnesses} Witnesses)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#2F4F4F]">{`$${book.price.toFixed(2)}`}</span>
                      <span className="text-xs text-[#2F4F4F]/50 line-through ml-2">{`$${(book.retailPrice || book.price).toFixed(2)}`}</span>
                    </div>
                    <span className="text-xs text-[#708238] font-bold">{book.discount || '0%'} Off</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                     href={`/offer/${book.id}`}
                     className="bg-transparent hover:bg-[#2F4F4F]/5 text-[#2F4F4F] border border-[#2F4F4F] text-[10px] font-bold py-2 px-1 rounded-lg uppercase tracking-wider transition-colors text-center"
                    >
                     Offer
                    </Link>
                   
                    {book.sold ? (
                    <button
                      disabled
                      className="bg-gray-400 text-white text-[10px] font-bold py-2 px-1 rounded-lg cursor-not-allowed"
                    >
                      SOLD OUT
                    </button>
                  ) : (
                     <Link
                       href={`/books/${book.id}`}
                       className="bg-[#2F4F4F] hover:bg-[#1E3333] text-[#F0EAD6] text-[10px] font-bold py-2 px-1 rounded-lg uppercase tracking-wider transition-colors text-center"
                     >
                       Buy Now
                     </Link>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
          )}
        </section>
        
        <section className="space-y-6">
         <div>
           <h2 className="text-2xl font-bold">
             AI Recommendations For You
           </h2>
           <p className="text-sm text-[#2F4F4F]/70">
             Based on your reading interests.
           </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {SAMPLE_BOOKS.slice(0, 4).map((book) => (
             <div
               key={book.id}
              className="bg-white p-4 rounded-xl border  border-[#708238]/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
             >
               <h3 className="font-semibold">{book.title}</h3>
               <p className="text-sm">{book.author}</p>
              </div>
             ))}
             </div>
         </section>

        {/* 7. AI ENGINE INTEGRITY DEPLOYMENT SUMMARY */}
        <section id="ai-engine" className="bg-[#2F4F4F] text-[#F0EAD6] rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
          <div className="max-w-2xl space-y-2">
            <div className="inline-block bg-[#708238] text-white font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded">
              🛡️ Integrity Verification Layer
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Fraud Counter-Measures</h2>
            <p className="text-sm text-[#F0EAD6]/80 leading-relaxed">
              Every single listing entering the ReBook catalog ecosystem undergoes strict analysis against active global metadata index records. This safeguards the network against the rise of low-quality, LLM-generated fraudulent books and nonsense physical titles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#2F4F4F]">
            <div className="bg-[#F0EAD6] p-4 rounded-xl space-y-1">
              <span className="text-xl">🔒</span>
              <h4 className="font-bold text-xs sm:text-sm">Verified Original Badge</h4>
              <p className="text-[11px] opacity-90 leading-normal">Guarantees that listed titles correspond directly to accurate, authenticated industry catalog indices before buyer processing hooks run.</p>
            </div>
            <div className="bg-[#F0EAD6] p-4 rounded-xl space-y-1">
              <span className="text-xl">📐</span>
              <h4 className="font-bold text-xs sm:text-sm">3-Angle Photography</h4>
              <p className="text-[11px] opacity-90 leading-normal">System validation blocks generic stock publisher illustrations. Real-world edge wear audit data remains open for buyer safety review.</p>
            </div>
            <div className="bg-[#F0EAD6] p-4 rounded-xl space-y-1">
              <span className="text-xl">⏳</span>
              <h4 className="font-bold text-xs sm:text-sm">72-Hour Inspection Lock</h4>
              <p className="text-[11px] opacity-90 leading-normal">Funds stay protected in secure escrow pools. You have exactly three full days post-delivery to confirm structural physical integrity parameters.</p>
            </div>
          </div>
        </section>

      </main>
       <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <h3 className="text-2xl font-bold">1,200+</h3>
             <p className="text-sm">Books Listed</p>
           </div>

           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <h3 className="text-2xl font-bold">650+</h3>
             <p className="text-sm">Active Users</p>
           </div>

           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <h3 className="text-2xl font-bold">300+</h3>
             <p className="text-sm">Books Recycled</p>
           </div>

           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <h3 className="text-2xl font-bold">98%</h3>
             <p className="text-sm">Successful Trades</p>
           </div>
         </div>
       </section>
      
      {/* 8. RESPONSIBLE ECO-DRIVEN REGULATORY FOOTER MODULE */}
      <footer className="bg-[#2F4F4F] text-[#F0EAD6]/80 border-t border-white/10 mt-16 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <span className="text-xl font-bold tracking-tighter">ReBook</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#708238]" />
            </div>
            <p className="text-[11px] text-[#F0EAD6]/60 leading-relaxed">
              Transforming transaction logic into environmental stewardship via decentralized, peer-reviewed physical book logistics networks.
            </p>
            <div className="text-[10px] text-[#708238] font-bold uppercase tracking-wider">
              🍃 Member of IEEE Student Branch Network
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">About Hub</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#about" className="hover:text-white transition-colors">Our Circular Vision</a></li>
              <li><a href="#reputation" className="hover:text-white transition-colors">PeerTrust Witness Framework</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Binding Offer Legalities</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Sustainability Links</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#carbon" className="hover:text-white transition-colors">CO₂ Preservation Formula</a></li>
              <li><a href="#water" className="hover:text-white transition-colors">Water Hydration Accounting</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">USPS Media Mail Optimization</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Contact & Support</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#support" className="hover:text-white transition-colors">Escrow Dispute Mediation</a></li>
              <li><a href="#moderation" className="hover:text-white transition-colors">Community Fraud Reporting</a></li>
              <li><a href="#dev" className="hover:text-white transition-colors">Developer API Handoff</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 py-6 text-center text-[10px] text-[#F0EAD6]/40 max-w-7xl mx-auto px-4">
          © {new Date().getFullYear()} ReBook Platform Inc. Standard Markdown-Compliant System Infrastructure. Highly accessible layout configuration optimized for ordinary masses.
        </div>
      </footer>
    </div>
  );
}