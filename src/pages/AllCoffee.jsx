import React, { useEffect, useState } from "react";

const AllCoffee = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    const url = search
      ? `http://localhost:3000/products?search=${encodeURIComponent(search)}`
      : "http://localhost:3000/products";
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-[#331A15] text-center">All Coffee Products</h1>

      {/* Search Bar */}
      <div className="flex gap-2 justify-center">
        <input
          className="border border-gray-400 rounded-xl px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900 placeholder-gray-500"
          placeholder="Search coffee by name or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchProducts}
          className="px-5 py-2 rounded-xl bg-amber-700 text-white shadow hover:bg-amber-800 transition font-semibold"
        >
          Search
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-2xl p-4 bg-white shadow hover:shadow-lg transition flex flex-col gap-3"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-44 object-cover rounded-lg"
            />
            <div className="font-bold text-lg text-gray-900">{p.name}</div>
            <div className="text-sm text-gray-900">💲 {p.price}</div>
            <div className="text-sm text-gray-700">
              Availability: {p.availability || "N/A"}
            </div>
            <div className="text-sm text-gray-700">{p.description || ""}</div>
          </div>
        ))}
      </div>

      {!products.length && (
        <p className="text-center text-gray-700 font-medium mt-4">
          No products found.
        </p>
      )}
    </div>
  );
};

export default AllCoffee;
