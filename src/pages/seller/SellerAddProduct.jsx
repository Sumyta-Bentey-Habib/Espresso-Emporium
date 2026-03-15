import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { uploadImageToImgBB } from "../../utils/utils";
import { Coffee as CoffeeIcon, Plus } from "lucide-react";

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
    <div className="max-w-2xl mx-auto bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-amber-900/10 relative overflow-hidden animate-in fade-in duration-700">
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50/5 rounded-bl-full -z-10"></div>
      
      <div className="mb-10">
        <h2 className="text-4xl font-black text-amber-950 tracking-tight">Add New Blend</h2>
        <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-[10px]">Expand your artisanal collection</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Blend Name</label>
              <input
                name="name"
                placeholder="e.g. Ethiopian Yirgacheffe"
                value={form.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Price (USD)</label>
              <input
                name="price"
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Availability</label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                required
              >
                <option value="" disabled className="bg-white">Select Status</option>
                <option value="Available" className="bg-white">Available</option>
                <option value="Out of Stock" className="bg-white">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Artisan Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 bg-amber-50/50 border-2 border-dashed border-amber-900/10 rounded-2xl cursor-pointer hover:border-amber-500/50 transition-all group"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 bg-white rounded-xl text-amber-600">
                        <Plus size={20} />
                      </div>
                      <span className="text-[10px] font-black text-amber-900/60 uppercase tracking-wider">Upload Splash</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">The Roast Story</label>
              <textarea
                name="description"
                placeholder="Describe the notes, aroma, and origin..."
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all resize-none"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-amber-950 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-950/40 hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <CoffeeIcon size={20} />
              Publish Blend
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SellerAddProduct;
