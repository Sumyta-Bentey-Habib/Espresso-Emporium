import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const SellerAddProduct = () => {
   useEffect(() => {
        document.title = "Seller";
      }, []);
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    availability: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      sellerEmail: user?.email,
      sellerId: user?.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://espresso-emporium-server-phi.vercel.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add product");

      // SweetAlert2 success popup
      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "✅ Your product has been successfully added.",
        confirmButtonColor: "#331A15",
      });

      setForm({
        name: "",
        image: "",
        price: "",
        availability: "",
        description: "",
      });
    } catch (error) {
      // SweetAlert2 error popup
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "❌ Something went wrong. Please try again.",
        confirmButtonColor: "#331A15",
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md text-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-[#331A15]">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900 "
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900 "
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900"
        />
        <input
          name="availability"
          placeholder="Availability (e.g. In Stock)"
          value={form.availability}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900 "
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900 "
        />
        <button
          type="submit"
          className="w-full px-4 py-3 rounded-xl bg-[#331A15] text-white font-semibold hover:bg-amber-700 transition"
        >
          ➕ Add Product
        </button>
      </form>
    </div>
  );
};

export default SellerAddProduct;
