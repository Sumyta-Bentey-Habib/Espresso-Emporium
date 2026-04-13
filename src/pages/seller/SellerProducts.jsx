import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Plus, Edit2, Trash2, MessageCircle, Star, Tag, Box, ChevronRight, X, Calendar, Coffee } from "lucide-react";
import Pagination from "../../components/dashboard/Pagination";
import Swal from "sweetalert2";
import { API_URL } from "../../utils/utils";
import { useSellerProducts } from "../../hooks/useSellerProducts";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const SellerProducts = () => {
  const { user } = useAuth();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    availability: "",
    description: "",
    image: "",
  });
  const [viewingReviewsFor, setViewingReviewsFor] = useState(null);

  const { products, loading, totalItems, fetchMine } = useSellerProducts(user, activeCategory, currentPage, itemsPerPage);

  useEffect(() => {
    document.title = "My Collections | Espresso Merchant";
  }, []);

  const handleDeleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Vanish this Blend?",
      text: "This characteristic creation will be removed from your collection permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#451a03",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete It",
      customClass: { popup: 'rounded-[2.5rem]' }
    });
    if (!confirm.isConfirmed) return;

    try {
      await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
      Swal.fire({
        icon: "success",
        title: "Blend Vanished",
        text: "Your collection has been updated.",
        confirmButtonColor: "#451a03"
      });
      fetchMine();
    } catch (error) {
      Swal.fire("Error", "Could not remove blend.", "error");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Erase Feedback?",
      text: "This public record will be removed from the emporium archives library.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#451a03",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Erase It",
      customClass: { popup: 'rounded-[2.5rem]' }
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/reviews/${reviewId}?requesterId=${user._id}`, { method: "DELETE" });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Feedback Erased",
          confirmButtonColor: "#451a03"
        });
        fetchMine();
        if (viewingReviewsFor) {
          setViewingReviewsFor(prev => ({
            ...prev,
            reviews: prev.reviews.filter(r => r._id !== reviewId && r._id?.$oid !== reviewId)
          }));
        }
      } else {
        Swal.fire("Error", "Unauthorized or failed removal.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Could not remove feedback.", "error");
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      availability: product.availability || "Available",
      description: product.description || "",
      image: product.image || "",
    });
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      await fetch(`${API_URL}/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      Swal.fire({
        icon: "success",
        title: "Roast Refined",
        text: "The details have been successfully synchronized.",
        confirmButtonColor: "#451a03",
        customClass: { popup: 'rounded-[1.5rem]' }
      });

      setEditingProduct(null);
      fetchMine();
    } catch (error) {
      Swal.fire("Error", "Synchronization failed.", "error");
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header & Categories */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tighter">Active Collections</h1>
          <p className="text-amber-700/60 font-black mt-1 uppercase tracking-[0.2em] text-[10px]">Curating {totalItems} Artisanal Artifacts</p>
        </div>

        <div className="flex flex-wrap bg-amber-50/50 p-1.5 rounded-[2rem] border border-amber-950/5 shadow-inner">
          {["All", "Coffee", "Beans", "Equipment", "Accessories"].map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              className={`px-5 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? "bg-amber-950 text-white shadow-xl scale-105" 
                : "text-amber-900/30 hover:text-amber-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <NavLink to="/dashboard/add-product">
          <Button variant="primary" icon={Plus} className="shadow-2xl shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700">
             Expand Registry
          </Button>
        </NavLink>
      </div>

      {/* Inventory Registry Table */}
      <Card className="shadow-2xl shadow-amber-900/5 overflow-hidden border border-amber-950/5" padding="p-0">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-50/30 border-b border-amber-950/5 text-[9px] font-black text-amber-900/30 uppercase tracking-[0.3em]">
                <th className="px-8 py-7 text-left">The Artisanal Roast</th>
                <th className="px-8 py-7 text-left">Valuation</th>
                <th className="px-8 py-7 text-left">Status</th>
                <th className="px-8 py-7 text-left font-black">Community Resonance</th>
                <th className="px-8 py-7 text-right">Control Hub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-950/5">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-8"><div className="h-16 w-16 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-8"><div className="h-4 w-24 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-6 w-32 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-4 w-24 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-10 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-amber-50/30 transition-all group font-georama">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-6">
                        <div className="relative w-16 h-16 shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src={p.image || "/more/coffee-splash.jpg"} 
                            alt={p.name} 
                            className="w-full h-full rounded-2xl object-cover shadow-xl border border-white"
                          />
                        </div>
                        <div>
                          <p className="font-black text-amber-950 text-xl tracking-tighter leading-tight">{p.name}</p>
                          <p className="text-[10px] text-amber-900/40 font-black tracking-widest mt-2 uppercase">ID: {p._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-amber-950 font-black text-lg shadow-lg border border-amber-950/5">
                        <Tag size={16} className="text-amber-700" />
                        ${p.price}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                        p.availability === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        {p.availability || "Special Order"}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      <button 
                        onClick={() => setViewingReviewsFor(p)}
                        className="flex items-center gap-4 group/btn"
                      >
                        <div className="flex -space-x-3">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-amber-950 text-white flex items-center justify-center text-[10px] font-black shadow-lg">
                                {String.fromCharCode(64+i)}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-amber-950 font-black text-sm group-hover/btn:text-amber-700 transition-colors">
                                {p.reviews?.length || 0} Voices
                            </span>
                            <span className="text-[9px] text-amber-900/40 font-black uppercase tracking-tighter">Read Resonance</span>
                        </div>
                        <ChevronRight size={14} className="text-amber-900/20 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(p)}
                          icon={Edit2}
                          className="!p-3.5 !rounded-xl !bg-amber-950 !text-white hover:!bg-black active:!scale-95 shadow-xl"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(p._id)}
                          icon={Trash2}
                          className="!p-3.5 !rounded-xl !text-rose-500 hover:!bg-rose-50 border border-rose-100/50"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-40 text-center">
                    <Coffee size={80} className="mx-auto text-amber-950/5 mb-6" />
                    <p className="text-3xl font-black text-amber-950/20 tracking-tighter uppercase italic">Begin your Artistic Legacy</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50/30 border-t border-amber-950/5 px-10 py-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
            totalItems={totalItems}
          />
        </div>
      </Card>

      {/* Refinement Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[110] p-4 animate-in fade-in duration-500" onClick={() => setEditingProduct(null)}>
          <Card className="max-w-3xl w-full relative overflow-hidden animate-in zoom-in-95 duration-500" padding="p-10 md:p-14" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -z-10 opacity-50"></div>
            <button onClick={() => setEditingProduct(null)} className="absolute top-8 right-8 p-3 hover:bg-amber-950/5 rounded-2xl transition-all text-amber-950/10 hover:text-amber-950">
              <X size={24} />
            </button>
            <h2 className="text-4xl font-black tracking-tight mb-2">Refine Characteristics</h2>
            <p className="text-amber-900/40 font-black uppercase tracking-[0.3em] text-[10px] mb-12">Updating: <span className="text-amber-700">{editingProduct.name}</span></p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <Input label="Blend Designation" name="name" value={formData.name} onChange={handleModalChange} icon={Box} />
                 <Input label="Market Valuation" name="price" type="number" value={formData.price} onChange={handleModalChange} icon={Tag} />
                 
                 <div className="space-y-4">
                    <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">Stock Readiness</label>
                    <select 
                        name="availability" 
                        value={formData.availability} 
                        onChange={handleModalChange} 
                        className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 transition-all font-bold outline-none text-amber-950 appearance-none"
                    >
                        <option value="Available">In Vault (Available)</option>
                        <option value="Out of Stock">Depleted (Out of Stock)</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-6">
                <Input label="Visual Artifact (URL)" name="image" value={formData.image} onChange={handleModalChange} icon={X} />
                
                <div className="space-y-2">
                    <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">The Blend Story</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleModalChange} 
                        className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-sm outline-none min-h-[140px] resize-none text-amber-950 placeholder:text-amber-900/10"
                        placeholder="Describe the aroma, notes and journey..."
                    />
                </div>
                
                <Button variant="primary" onClick={handleUpdateProduct} className="w-full py-5 text-sm">Synchronize Changes</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Community Resonance Modal (Reviews) */}
      {viewingReviewsFor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[110] p-4 animate-in fade-in duration-500" onClick={() => setViewingReviewsFor(null)}>
          <Card className="w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0 shadow-2xl animate-in zoom-in-95 duration-500" onClick={e => e.stopPropagation()}>
            <div className="p-10 border-b border-amber-950/5 flex justify-between items-center bg-amber-50/30">
              <div>
                <h2 className="text-3xl font-black text-amber-950 tracking-tighter">Community Resonance</h2>
                <p className="text-amber-700 font-black uppercase tracking-[0.2em] text-[10px] mt-1.5">Captured voices for: {viewingReviewsFor.name}</p>
              </div>
              <button onClick={() => setViewingReviewsFor(null)} className="p-4 hover:bg-amber-950/10 rounded-2xl transition-all text-amber-950/20 hover:text-amber-950">
                <X size={26} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-white/50 backdrop-blur-3xl">
              {viewingReviewsFor.reviews?.length > 0 ? (
                viewingReviewsFor.reviews.map((r) => (
                  <div key={r._id} className="p-8 bg-white rounded-[2.5rem] border border-amber-950/5 flex flex-col sm:flex-row justify-between gap-8 group shadow-xl shadow-amber-900/5 hover:-translate-y-1 transition-all">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-950 text-white flex items-center justify-center font-black text-sm uppercase shadow-lg">
                          {r.buyerName?.[0] || 'A'}
                        </div>
                        <div>
                          <p className="font-black text-amber-950 text-lg leading-none">{r.buyerName || "Anonymous Artisan"}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex text-amber-400 gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={11} className={i < r.rating ? "fill-current" : "opacity-10"} />
                              ))}
                            </div>
                            <span className="text-[9px] text-amber-900/30 font-black uppercase tracking-widest flex items-center gap-1.5 border-l border-amber-900/10 pl-3">
                              <Calendar size={10} />
                              {new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-amber-950/70 italic font-medium leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-950/5">"{r.feedback}"</p>
                    </div>
                    <div className="flex sm:flex-col justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReview(r._id?.$oid || r._id)}
                        icon={Trash2}
                        className="!p-4 !rounded-2xl !text-rose-500 hover:!bg-rose-50 border border-rose-100"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-32 opacity-10 grayscale">
                  <MessageCircle size={100} strokeWidth={1} className="mx-auto mb-6" />
                  <p className="text-2xl font-black uppercase tracking-[0.3em]">No resonance captured yet</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
