import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  Plus,
  Edit2,
  Trash2,
  MessageCircle,
  Star,
  Tag,
  Box,
  ChevronRight,
  X,
  Calendar,
  MoreVertical,
  Coffee,
  Heart
} from "lucide-react";
import Pagination from "../../components/dashboard/Pagination";
import Swal from "sweetalert2";
import { API_URL } from "../../utils/utils";
import Loader from "../../components/Loader";

const SellerProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
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

  useEffect(() => {
    document.title = "My Blends | Espresso Seller";
  }, []);

  const fetchMine = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

      const filtered = data.filter((p) => {
        const matchesSeller = p.sellerEmail === user?.email;
        const matchesCategory = activeCategory === "All" || (p.category || "Coffee") === activeCategory;
        return matchesSeller && matchesCategory;
      });
      setTotalItems(filtered.length);

      const productsWithReviews = await Promise.all(
        filtered.map(async (p) => {
          const revRes = await fetch(`${API_URL}/reviews/${p._id}`);
          const reviews = await revRes.json();
          return { 
            ...p, 
            reviews: reviews.map(r => ({
              ...r,
              rating: r.rating?.$numberInt ? Number(r.rating.$numberInt) : r.rating,
              createdAt: r.createdAt?.$date?.$numberLong ? new Date(Number(r.createdAt.$date.$numberLong)) : r.createdAt
            })) 
          };
        })
      );

      
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setProducts(productsWithReviews.slice(start, end));
    } catch (error) {
      console.error("Failed to fetch seller products:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email, currentPage, itemsPerPage, activeCategory]);

  useEffect(() => {
    if (user?.email) fetchMine();
  }, [fetchMine, user?.email]);

  const handleDeleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Confirm Deletion",
      text: "This blend will be permanently removed from your collection.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your blend has been removed.",
        confirmButtonColor: "#331A15",
      });
      fetchMine();
    } catch (error) {
      console.error("Failed to delete product:", error);
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Delete Review?",
      text: "This feedback will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `${API_URL}/reviews/${reviewId}?requesterId=${user._id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Removed",
          text: "The review has been deleted.",
          confirmButtonColor: "#331A15",
        });
        fetchMine();
        
        if (viewingReviewsFor) {
          setViewingReviewsFor(prev => ({
            ...prev,
            reviews: prev.reviews.filter(r => r._id !== reviewId && r._id?.$oid !== reviewId)
          }));
        }
      } else {
        Swal.fire("Error", "Could not delete review", "error");
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      Swal.fire("Error", "Could not delete review", "error");
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      availability: product.availability || "",
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
        title: "Refined!",
        text: "Your blend details have been updated.",
        confirmButtonColor: "#331A15",
      });

      setEditingProduct(null);
      fetchMine();
    } catch (error) {
      console.error("Failed to update product:", error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tight">Active Inventory</h1>
          <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-xs">Managing {totalItems} {activeCategory === 'All' ? 'Items' : activeCategory}</p>
        </div>

        <div className="flex bg-amber-100/30 p-1 rounded-[1.5rem] border border-amber-900/5">
          {["All", "Coffee", "Beans", "Equipment", "Accessories"].map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? "bg-amber-950 text-white shadow-lg" 
                : "text-amber-900/40 hover:text-amber-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => window.location.href = "/dashboard/add-product"}
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-3xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-950/20 active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add Item
        </button>
      </div>

      {}
      <div className="bg-white rounded-[3rem] shadow-xl shadow-amber-900/5 overflow-hidden border border-amber-900/10">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-100/20 border-b border-amber-900/10 uppercase tracking-[0.2em] text-[10px] font-black text-amber-900/60">
                <th className="px-8 py-6 text-left whitespace-nowrap">The Roast</th>
                <th className="px-8 py-6 text-left">Market Value</th>
                <th className="px-8 py-6 text-left whitespace-nowrap">Availability</th>
                <th className="px-8 py-6 text-left">Engagement</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/10">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-16 w-16 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-6 w-32 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-10 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-amber-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <img 
                          src={p.image || "/more/coffee-splash.jpg"} 
                          alt={p.name} 
                          className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <p className="font-extrabold text-amber-950 text-xl leading-tight">{p.name}</p>
                          <p className="text-[10px] text-amber-900/60 font-black tracking-widest mt-1 uppercase">ID: {p._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-100/10 text-amber-600 font-black text-lg border border-amber-500/10">
                        <Tag size={16} className="text-amber-700" />
                        ${p.price}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        p.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {p.availability || "Special Order"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => setViewingReviewsFor(p)}
                        className="flex items-center gap-2 group/btn"
                      >
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-amber-50 flex items-center justify-center text-[10px] font-black">{i}</div>
                          ))}
                        </div>
                        <span className="text-amber-900/60 font-bold text-sm group-hover/btn:text-amber-950 transition-colors">
                          {p.reviews?.length || 0} reviews
                        </span>
                        <ChevronRight size={14} className="text-amber-900/20 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-3 rounded-2xl bg-amber-950 text-white hover:bg-black transition-all active:scale-90 shadow-xl shadow-amber-950/20"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <Coffee size={64} strokeWidth={1} className="mx-auto text-amber-900/10 mb-6" />
                    <p className="text-2xl font-black text-amber-900/40 uppercase tracking-[0.2em]">Start your Roasting Journey</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-100/20 border-t border-amber-900/10 px-8 py-4">
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
      </div>

      {}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[110] p-4" onClick={() => setEditingProduct(null)}>
          <div className="bg-white border border-amber-900/10 rounded-[3rem] p-10 md:p-14 w-full max-w-2xl relative text-amber-950 shadow-2xl animate-in zoom-in-95 duration-500" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50/5 rounded-bl-full -z-10"></div>
            <button onClick={() => setEditingProduct(null)} className="absolute top-8 right-8 p-3 hover:bg-amber-50 rounded-2xl transition-all text-amber-900/20 hover:text-amber-900">
              <X size={24} />
            </button>
            <h2 className="text-4xl font-black tracking-tight mb-8">Refine Roast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Blend Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleModalChange} className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-100/10 transition-all font-bold outline-none text-amber-950" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Price (USD)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleModalChange} className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-100/10 transition-all font-bold outline-none text-amber-950" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Availability</label>
                  <select name="availability" value={formData.availability} onChange={handleModalChange} className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-100/10 transition-all font-bold outline-none text-amber-950">
                    <option value="Available" className="bg-white">Available</option>
                    <option value="Out of Stock" className="bg-white">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Image URL</label>
                  <input type="text" name="image" value={formData.image} onChange={handleModalChange} className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-100/10 transition-all font-bold outline-none text-amber-950" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Story / Description</label>
                  <textarea name="description" value={formData.description} onChange={handleModalChange} className="w-full px-6 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-100/10 transition-all font-bold outline-none min-h-[140px] resize-none text-amber-950" />
                </div>
                <button onClick={handleUpdateProduct} className="w-full py-5 bg-amber-950 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-amber-950/40 hover:bg-black transition-all active:scale-95">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {viewingReviewsFor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[110] p-4" onClick={() => setViewingReviewsFor(null)}>
          <div className="bg-white border border-amber-900/10 rounded-[3rem] w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-500" onClick={e => e.stopPropagation()}>
            <div className="p-10 border-b border-amber-900/10 flex justify-between items-center bg-amber-100/20">
              <div>
                <h2 className="text-3xl font-black text-amber-950 tracking-tight">Public Feedback</h2>
                <p className="text-amber-900/60 font-bold uppercase tracking-widest text-[10px] mt-1">For Blend: {viewingReviewsFor.name}</p>
              </div>
              <button 
                onClick={() => setViewingReviewsFor(null)}
                className="p-3 hover:bg-amber-50 rounded-2xl transition-all text-amber-900/40 hover:text-amber-950"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar bg-white">
              {viewingReviewsFor.reviews?.length > 0 ? (
                viewingReviewsFor.reviews.map((r) => (
                  <div key={r._id} className="p-6 bg-amber-50/50 rounded-[2rem] border border-amber-900/10 flex flex-col sm:flex-row justify-between gap-6 group">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-950 text-white flex items-center justify-center font-black text-xs uppercase tracking-tighter">
                          {r.buyerName?.[0] || 'A'}
                        </div>
                        <div>
                          <p className="font-black text-amber-950 leading-none">{r.buyerName || "Anonymous Taster"}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className={i < r.rating ? "fill-current" : "opacity-20"} />
                              ))}
                            </div>
                            <span className="text-[10px] text-amber-900/60 font-black uppercase tracking-widest flex items-center gap-1">
                              <Calendar size={10} />
                              {new Date(r.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-amber-950/80 italic font-medium leading-relaxed">"{r.feedback}"</p>
                    </div>
                    <div className="flex sm:flex-col justify-end gap-2">
                      <button
                        onClick={() => handleDeleteReview(r._id?.$oid || r._id)}
                        className="p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                        title="Remove offensive or outdated review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 opacity-20">
                  <MessageCircle size={64} className="mx-auto mb-4" />
                  <p className="text-xl font-black uppercase tracking-widest">No Feedback Recorded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
