import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { API_URL, uploadImageToImgBB, CATEGORIES } from "../../utils/utils";
import { Coffee as CoffeeIcon, Package, Target, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const SellerAddProduct = () => {
  useEffect(() => {
    document.title = "Add To Collection | Espresso Merchant";
  }, []);

  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    category: "Coffee",
    availability: "Available",
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
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const payload = {
        ...form,
        image: imageUrl,
        price: Number(form.price),
        sellerEmail: user?.email,
        sellerId: user?.uid,
        sellerName: user?.displayName || "Artisan Merchant",
        sellerLocation: user?.location || "Artisanal Hub",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add product");

      Swal.fire({
        icon: "success",
        title: "Masterpiece Added!",
        text: "Your artisanal creation has been registered in the catalog.",
        confirmButtonColor: "#451a03",
        customClass: { popup: 'rounded-[2.5rem]' }
      });

      setForm({
        name: "",
        image: "",
        price: "",
        category: "Coffee",
        availability: "Available",
        description: "",
      });
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Error",
        text: "Could not synchronize the new listing with the emporium.",
        confirmButtonColor: "#451a03"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
       className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 shadow-2xl relative overflow-hidden" 
       padding="p-10 md:p-14"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -z-10 opacity-60"></div>
      
      <div className="mb-12">
        <h2 className="text-4xl font-black text-amber-950 tracking-tighter">Register New Roast</h2>
        <p className="text-amber-700/60 font-black mt-2 uppercase tracking-[0.2em] text-[10px]">Architecting the Catalog Growth</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <Input 
                label="Product Designation" 
                name="name" 
                placeholder="e.g. Ethiopian Yirgacheffe" 
                value={form.name} 
                onChange={handleChange} 
                icon={CoffeeIcon} 
                required 
            />

            <Input 
                label="Market Valuation (USD)" 
                name="price" 
                type="number" 
                placeholder="0.00" 
                value={form.price} 
                onChange={handleChange} 
                icon={Target} 
                required 
            />

            <div className="space-y-4">
              <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">Classification Hub</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-8 focus:ring-amber-500/5 outline-none font-black text-amber-950 transition-all appearance-none"
                required
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">Initial Readiness</label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-8 focus:ring-amber-500/5 outline-none font-black text-amber-950 transition-all appearance-none"
                required
              >
                <option value="Available">In Vault (Available)</option>
                <option value="Out of Stock">Depleted (Out of Stock)</option>
              </select>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">Visual Identity Artifact</label>
              <div className="relative group/upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-48 bg-amber-50/30 border-2 border-dashed border-amber-950/10 rounded-[2rem] cursor-pointer hover:border-amber-700/50 transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-[2rem] shadow-xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 relative z-10 transition-transform group-hover:scale-110">
                      <div className="w-16 h-16 bg-amber-950 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                        <Plus size={32} />
                      </div>
                      <span className="text-[9px] font-black text-amber-950 uppercase tracking-[0.3em]">Capture & Upload</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">The Artisanal Narrative</label>
              <textarea
                name="description"
                placeholder="Describe the aromatic profiles, notes, and journey of this blend..."
                value={form.description}
                onChange={handleChange}
                className="w-full px-8 py-6 bg-amber-50/50 border border-amber-900/10 rounded-[2rem] focus:ring-8 focus:ring-amber-500/5 outline-none font-bold text-sm leading-relaxed resize-none text-amber-950 placeholder:text-amber-950/10 min-h-[160px] transition-all"
                required
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          icon={Package}
          className="w-full py-6 text-sm uppercase tracking-[0.3em] font-black bg-amber-950 text-white hover:bg-black shadow-2xl shadow-amber-950/20"
        >
          {loading ? "Synchronizing with Emporium..." : "Commit Artisanal Listing"}
        </Button>
      </form>
    </Card>
  );
};

export default SellerAddProduct;
