import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const SellerProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", availability: "", description: "" });

  const fetchMine = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data.filter((p) => p.sellerEmail === user?.email));
    setLoading(false);
  };

  useEffect(() => {
    fetchMine();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product has been deleted.",
        confirmButtonColor: "#331A15",
      });
      fetchMine();
    }
  };

  const openEdit = (p) => {
    setEditing(p);
    setEditForm({
      name: p.name,
      price: p.price,
      availability: p.availability || "",
      description: p.description || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/products/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editForm, price: Number(editForm.price) }),
    });
    setEditing(null);
    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Product has been updated.",
      confirmButtonColor: "#331A15",
    });
    fetchMine();
  };

  return (
    <div className="space-y-4 text-gray-900">
      <h2 className="text-xl font-semibold text-[#331A15]">My Products</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border rounded-xl p-4 bg-white shadow-sm flex flex-col gap-2 text-gray-900">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-lg" />
              <div className="font-semibold text-lg">{p.name}</div>
              <div className="text-sm">💲 {p.price}</div>
              <div className="text-sm text-gray-600">Availability: {p.availability || "N/A"}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEdit(p)} className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white">
                  Edit
                </button>
                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products yet.</p>
      )}

      {/* Modal for Editing */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-gray-900">
            <h3 className="text-lg font-semibold mb-4 text-[#331A15]">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border p-2 rounded text-gray-900 placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Price"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                className="w-full border p-2 rounded text-gray-900 placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Availability"
                value={editForm.availability}
                onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                className="w-full border p-2 rounded text-gray-900 placeholder-gray-400"
              />
              <textarea
                placeholder="Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full border p-2 rounded text-gray-900 placeholder-gray-400"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditing(null)} className="px-3 py-1 rounded bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
