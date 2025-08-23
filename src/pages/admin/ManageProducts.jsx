import React, { useEffect, useState } from "react";

const ManageProducts = () => {
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

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleEdit = async (p) => {
    const name = prompt("Name:", p.name);
    if (!name && name !== "") return;
    const priceStr = prompt("Price:", p.price);
    if (priceStr === null) return;
    const price = Number(priceStr);
    const availability = prompt("Availability:", p.availability || "");
    if (availability === null) return;
    const description = prompt("Description:", p.description || "");
    if (description === null) return;

    await fetch(`http://localhost:3000/products/${p._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, availability, description }),
    });
    fetchProducts();
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-900"
          placeholder="Search by product/company name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchProducts}
          className="px-6 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-900 transition font-semibold"
        >
          Search
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition hover:shadow-lg"
          >
            {/* Product Image */}
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover"
            />

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg text-gray-900">{p.name}</h2>
              <p className="text-sm text-gray-700">Seller: {p.sellerEmail || "-"}</p>
              <p className="text-sm text-gray-700">Availability: {p.availability || "-"}</p>
              <p className="text-sm font-medium text-amber-700">Price: ${p.price}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mt-1">{p.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-800 transition text-sm font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-800 transition text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!products.length && (
        <p className="text-center text-gray-500 font-medium">No products found.</p>
      )}
    </div>
  );
};

export default ManageProducts;
