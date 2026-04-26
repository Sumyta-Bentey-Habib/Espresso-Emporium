import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Package, Calendar, CreditCard, ChevronRight, ShoppingBag, Coffee } from "lucide-react";
import { API_URL } from "../../utils/utils";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { NavLink } from "react-router-dom";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Orders | Espresso Emporium";
    const fetchOrders = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(`${API_URL}/orders/${user._id}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <span className="loading loading-spinner loading-lg text-amber-900"></span>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div>
        <h1 className="text-4xl font-black text-amber-950 tracking-tighter">Acquisition History</h1>
        <p className="text-amber-700/60 font-black mt-1 uppercase tracking-[0.2em] text-[10px]">
          Reviewing {orders.length} Artisanal Orders
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order._id} className="overflow-hidden border border-amber-950/5 hover:border-amber-500/20 transition-all group" padding="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Order Meta */}
                <div className="bg-amber-50/50 p-8 md:w-72 border-b md:border-b-0 md:border-r border-amber-950/5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-amber-950">
                      <Package size={20} className="text-amber-500" />
                      <span className="font-black tracking-tight text-lg">Order #{order._id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-amber-900/40 text-[10px] font-black uppercase tracking-widest">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/30 mb-1">Total Value</div>
                     <div className="text-3xl font-black text-amber-950 tracking-tighter">${order.totalPrice}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex-1 p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 group/item">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-md">
                          <img src={item.image || "/more/coffee-splash.jpg"} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-amber-950 text-sm truncate leading-tight">{item.name}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-amber-900/30 flex items-center gap-1.5 mt-0.5">
                             {item.category === "Beans" ? <ShoppingBag size={10} /> : <Coffee size={10} />}
                             {item.category || "Artifact"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-amber-950/5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Payment {order.status}</span>
                     </div>
                     <Button variant="ghost" size="sm" className="!text-[10px] !font-black !uppercase !tracking-widest !bg-amber-50 !text-amber-950 group-hover:!bg-amber-950 group-hover:!text-white transition-all">
                        View Details Artifact
                     </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-40 text-center space-y-6 opacity-30">
             <ShoppingBag size={80} strokeWidth={1} className="mx-auto text-amber-950" />
             <p className="text-2xl font-black text-amber-950 tracking-tighter uppercase italic">No Orders Recorded Yet</p>
             <NavLink to="/marketplace">
                <Button variant="outline" className="mt-4">Begin Your Collection</Button>
             </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
