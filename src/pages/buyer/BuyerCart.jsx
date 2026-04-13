import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Trash2, ShoppingBag, MapPin, User, Coffee as CoffeeIcon, ChevronRight, Heart } from "lucide-react";
import Swal from "sweetalert2";
import { API_URL } from "../../utils/utils";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const BuyerCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = React.useCallback(async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cart/${encodeURIComponent(user._id)}`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  const removeItem = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove from Bliss?",
      text: "This blend will be vanished from your cherished wishlist.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#451a03",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Remove it",
      customClass: { popup: 'rounded-[2.5rem]' }
    });

    if (!confirm.isConfirmed) return;

    try {
      await fetch(`${API_URL}/cart/${id}`, { method: "DELETE" });
      Swal.fire({
        icon: "success",
        title: "Registry Updated",
        text: "Your wishlist has been successfully refined.",
        confirmButtonColor: "#451a03"
      });
      fetchCart();
    } catch (error) {
      Swal.fire("Error", "Removal failed.", "error");
    }
  };

  useEffect(() => {
    document.title = "Wishlist | Espresso Emporium";
    if (user?._id) fetchCart();
  }, [user, fetchCart]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tighter">Artisan Wishlist</h1>
          <p className="text-amber-700/60 font-black mt-1 uppercase tracking-[0.2em] text-[10px]">Managing {items.length} Cherished Selections</p>
        </div>
        
        <NavLink to="/coffee-store">
          <Button variant="primary" icon={ShoppingBag} className="shadow-2xl shadow-amber-950/20 px-10">
             Discover More Blends
          </Button>
        </NavLink>
      </div>

      {/* Wishlist Registry Table */}
      <Card className="shadow-2xl shadow-amber-900/5 overflow-hidden border border-amber-950/5" padding="p-0">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-50/30 border-b border-amber-950/5 text-[9px] font-black text-amber-900/30 uppercase tracking-[0.3em]">
                <th className="px-8 py-7 text-left">The Master Blend</th>
                <th className="px-8 py-7 text-left">Artisan Hub</th>
                <th className="px-8 py-7 text-left">Geographic Origin</th>
                <th className="px-8 py-7 text-left">Market valuation</th>
                <th className="px-8 py-7 text-right">Integrity Hub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-950/5">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-8"><div className="h-16 w-16 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-8"><div className="h-4 w-32 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-4 w-48 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-6 w-16 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-8"><div className="h-10 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : items.length > 0 ? (
                items.map((it) => (
                  <tr key={it._id.$oid || it._id} className="hover:bg-amber-50/30 transition-all group font-georama">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-6">
                        <div className="relative w-16 h-16 shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src={it.image || "/more/coffee-splash.jpg"} 
                            alt={it.name} 
                            className="w-full h-full rounded-2xl object-cover shadow-xl border border-white"
                          />
                        </div>
                        <div>
                          <p className="font-black text-amber-950 text-xl tracking-tighter leading-tight">{it.name}</p>
                          <span className="text-[9px] bg-amber-950 text-white px-3 py-1 rounded-lg font-black mt-2 inline-block uppercase tracking-[0.2em] shadow-lg">Premium Grade</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-3 text-amber-950 font-black text-sm tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                            <User size={14} className="text-amber-950/20" />
                        </div>
                        {it.sellerName || "Anonymous Artisan"}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-3 text-amber-900/40 font-black text-[9px] uppercase tracking-[0.2em] pl-1">
                        <MapPin size={12} />
                        {it.sellerLocation || "Across the Globe"}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="font-black text-amber-950 text-xl tracking-tighter">${it.price}</div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <NavLink to="/coffee-store">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="!p-3.5 !rounded-xl !bg-amber-50 !text-amber-950 hover:!bg-amber-950 hover:!text-white shadow-none border border-amber-950/5"
                            icon={ChevronRight}
                          />
                        </NavLink>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(it._id.$oid || it._id)}
                          icon={Trash2}
                          className="!p-3.5 !rounded-xl !text-rose-500 hover:!bg-rose-50 border border-rose-100"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-40 text-center">
                    <div className="relative inline-block mb-8">
                      <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full scale-150 -z-10 animate-pulse"></div>
                      <Heart size={80} strokeWidth={1} className="text-amber-950/10 fill-amber-950/5" />
                      <CoffeeIcon size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-950/20" />
                    </div>
                    <p className="text-3xl font-black text-amber-950/20 tracking-tighter uppercase italic">Your Archive is Waiting</p>
                    <p className="text-amber-700/40 font-black mt-3 uppercase tracking-[0.3em] text-[10px]">Fresh experiences found in our emporium</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {!loading && items.length > 0 && (
          <div className="flex justify-center pt-6">
              <Button variant="outline" className="text-amber-950/40 border-amber-950/10 hover:bg-amber-50" size="sm">
                  Export Wishlist Artifact
              </Button>
          </div>
      )}
    </div>
  );
};

export default BuyerCart;
