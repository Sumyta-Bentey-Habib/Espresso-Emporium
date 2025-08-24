import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const url = search
      ? `https://espresso-emporium-server-phi.vercel.app/products?search=${encodeURIComponent(search)}`
      : "https://espresso-emporium-server-phi.vercel.app/products";
    const res = await fetch(url);
    const data = await res.json();

    const productsWithReviews = await Promise.all(
      data.map(async (p) => {
        const revRes = await fetch(`https://espresso-emporium-server-phi.vercel.app/reviews/${p._id}`);
        const reviews = await revRes.json();
        return { ...p, reviews };
      })
    );

    setProducts(productsWithReviews);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const handleDeleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    await fetch(`https://espresso-emporium-server-phi.vercel.app/products/${id}`, { method: "DELETE" });
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Product has been deleted.",
      confirmButtonColor: "#331A15",
    });
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

    await fetch(`https://espresso-emporium-server-phi.vercel.app/products/${p._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, availability, description }),
    });
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Product has been updated.",
      confirmButtonColor: "#331A15",
    });
    fetchProducts();
  };

  const handleDeleteReview = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `https://espresso-emporium-server-phi.vercel.app/reviews/${reviewId}?requesterId=${user._id}`,
      { method: "DELETE" }
    );
    const result = await res.json();

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: result.message || "Review deleted",
        confirmButtonColor: "#331A15",
      });
      fetchProducts();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: result.message || "Could not delete review",
        confirmButtonColor: "#331A15",
      });
    }
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
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg text-gray-900">{p.name}</h2>
              <p className="text-sm text-gray-700">Seller: {p.sellerEmail || "-"}</p>
              <p className="text-sm text-gray-700">Availability: {p.availability || "-"}</p>
              <p className="text-sm font-medium text-amber-700">Price: ${p.price}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mt-1">{p.description}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-800 transition text-sm font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(p._id)}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-800 transition text-sm font-semibold"
                >
                  Delete
                </button>
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-2">Reviews:</h3>
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {p.reviews.length ? (
                    p.reviews.map((r) => (
                      <div
                        key={r._id}
                        className="bg-gray-100 rounded-lg p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-sm"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{r.buyerName || r.buyerEmail}</div>
                          <div className="text-gray-700 text-sm">{r.feedback}</div>
                          <div className="text-gray-500 text-[10px] mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                        </div>
                        {(user.role === "Admin" || user.email === p.sellerEmail) && (
                          <button
                            onClick={() => handleDeleteReview(r._id)}
                            className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs">No reviews yet.</p>
                  )}
                </div>
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
