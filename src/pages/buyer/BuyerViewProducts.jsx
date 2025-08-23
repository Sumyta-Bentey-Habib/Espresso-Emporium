import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { FaCartPlus } from "react-icons/fa";

const BuyerViewProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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

  const addToCart = async (product) => {
    const payload = {
      buyerId: user?.email,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      createdAt: new Date().toISOString(),
    };
    await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("✅ Added to cart");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          className="border border-gray-400 rounded-xl px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900 placeholder-gray-500"
          placeholder="Search products by name or company"
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <button
              onClick={() => addToCart(p)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#331A15] text-white hover:bg-amber-700 transition font-semibold"
            >
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        ))}
      </div>

      {!products.length && (
        <p className="text-center text-gray-700 font-medium">No products found.</p>
      )}
    </div>
  );
};

export default BuyerViewProducts;
