import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { 
  Trash2, 
  ShoppingBag, 
  MapPin, 
  User, 
  Coffee as CoffeeIcon,
  ChevronRight,
  Heart
} from "lucide-react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { API_URL } from "../../utils/utils";

const BuyerCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  const fetchCart = React.useCallback(async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/cart/${encodeURIComponent(user._id)}`
      );
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  // Remove item from cart
  const removeItem = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove from Bliss?",
      text: "This blend will be removed from your cherished wishlist.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove it",
    });

    if (!confirm.isConfirmed) return;

    try {
      await fetch(`${API_URL}/cart/${id}`, {
        method: "DELETE",
      });
      Swal.fire({
        icon: "success",
        title: "Wisely Removed",
        text: "Your wishlist has been updated.",
        confirmButtonColor: "#331A15",
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      Swal.fire("Error", "Failed to remove item", "error");
    }
  };

  useEffect(() => {
    document.title = "Wishlist | Espresso Emporium";
    if (user?._id) {
      fetchCart();
    }
  }, [user, fetchCart]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tight">My Wishlist</h1>
          <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-xs">A Collection of Your Favorite Blends</p>
        </div>
        
        <button
          onClick={() => window.location.href = "/coffee-store"}
          className="inline-flex items-center gap-2 bg-amber-950 text-white px-8 py-4 rounded-3xl font-black hover:bg-black transition-all shadow-xl shadow-amber-950/20 active:scale-95 group"
        >
          <ShoppingBag size={20} className="group-hover:-translate-y-1 transition-transform" />
          Browse Store
        </button>
      </div>

      {/* Wishlist Table */}
      <div className="bg-white rounded-[3rem] shadow-xl shadow-amber-900/5 overflow-hidden border border-amber-900/10">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-100/20 border-b border-amber-900/10 uppercase tracking-[0.2em] text-[10px] font-black text-amber-900/60">
                <th className="px-8 py-6 text-left whitespace-nowrap">The Blend</th>
                <th className="px-8 py-6 text-left">The Master</th>
                <th className="px-8 py-6 text-left">Origin</th>
                <th className="px-8 py-6 text-left">Price</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/10">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-16 w-16 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-32 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-16 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-10 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : items.length > 0 ? (
                items.map((it) => (
                  <tr key={it._id.$oid || it._id} className="hover:bg-amber-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <img 
                          src={it.image || "/more/coffee-splash.jpg"} 
                          alt={it.name} 
                          className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:rotate-6 transition-transform"
                        />
                        <div>
                          <p className="font-extrabold text-amber-950 text-xl leading-tight">{it.name}</p>
                          <span className="text-[10px] bg-amber-100/10 text-amber-600 px-2 py-0.5 rounded-full font-black mt-1 inline-block uppercase tracking-tighter border border-amber-500/10">Premium Roasted</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-amber-900/60 font-bold">
                        <User size={14} />
                        {it.sellerName || "Unknown Artisan"}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-amber-900/60 font-bold capitalize">
                        <MapPin size={14} />
                        {it.sellerLocation || "Across the Globe"}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-amber-950 text-lg">${it.price}</div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => window.location.href = "/coffee-store"}
                          className="p-3 rounded-2xl bg-amber-50/50 text-amber-950 hover:bg-amber-950 hover:text-white transition-all active:scale-90"
                          title="View in Store"
                        >
                          <ChevronRight size={18} />
                        </button>
                        <button
                          onClick={() => removeItem(it._id.$oid || it._id)}
                          className="p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                          title="Remove from Wishlist"
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
                    <div className="relative inline-block mb-6">
                      <Heart size={64} strokeWidth={1} className="text-amber-900/10 fill-amber-900/5 pulse" />
                      <CoffeeIcon size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-950/20" />
                    </div>
                    <p className="text-2xl font-black text-amber-900/40 uppercase tracking-[0.2em]">Your Wishlist is Empty</p>
                    <p className="text-amber-900/20 font-bold mt-2 uppercase tracking-widest text-xs">Adventure awaits in our coffee store</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerCart;
