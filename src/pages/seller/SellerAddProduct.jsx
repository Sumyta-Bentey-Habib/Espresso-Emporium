import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { uploadImageToImgBB } from "../../utils/utils"; // import utility

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
  const [imageFile, setImageFile] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.image;

      // Upload image if a file is selected
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const payload = {
        ...form,
        image: imageUrl,
        price: Number(form.price),
        sellerEmail: user?.email,
        sellerId: user?.uid,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(
        "https://espresso-emporium-server-phi.vercel.app/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to add product");

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
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "❌ Something went wrong. Please try again.",
        confirmButtonColor: "#331A15",
      });
      console.error(error);
    } finally {
      setLoading(false);
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
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900"
        />


        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900"
        />

       
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg mx-auto mt-2"
          />
        )}

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
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-900"
        />

        <button
          type="submit"
          className="w-full px-4 py-3 rounded-xl bg-[#331A15] text-white font-semibold hover:bg-amber-700 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "➕ Add Product"}
        </button>
      </form>
    </div>
  );
};

export default SellerAddProduct;
