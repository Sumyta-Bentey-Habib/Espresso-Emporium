import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { ArrowLeft, Coffee, ShoppingBag, Package } from "lucide-react";
import Button from "../../components/ui/Button";

// Load Stripe outside of component to avoid recreating Stripe object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, totalPrice } = location.state || { items: [], totalPrice: 0 };

  useEffect(() => {
    document.title = "Checkout | Espresso Emporium";
    if (!items || items.length === 0) {
      navigate("/dashboard/cart");
    }
  }, [items, navigate]);

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 space-y-12 animate-in fade-in duration-700">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto flex">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-amber-900/40 hover:text-amber-700 transition-all font-black uppercase text-[10px] tracking-widest group"
        >
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-950/5 flex items-center justify-center group-hover:bg-amber-950 group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          Return to Archive
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-amber-950 tracking-tighter mb-2">Order Archive</h1>
            <p className="text-amber-700/60 font-black uppercase tracking-[0.2em] text-[10px]">Reviewing {items.length} Artisan Artifacts</p>
          </div>

          <div className="space-y-4">
            {items.map((it) => (
              <div key={it._id} className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-amber-900/5 shadow-sm group hover:border-amber-900/20 transition-all">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-md">
                   <img src={it.image || "/more/coffee-splash.jpg"} alt={it.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                   <h4 className="font-black text-amber-950 truncate tracking-tight">{it.name}</h4>
                   <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/30 flex items-center gap-1.5 mt-1">
                      {it.category === "Beans" ? <Package size={10} /> : it.category === "Equipment" ? <ShoppingBag size={10} /> : <Coffee size={10} />}
                      {it.category}
                   </p>
                </div>
                <div className="text-lg font-black text-amber-950 tracking-tighter">
                   ${it.price}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-amber-950/10">
             <div className="flex justify-between items-center">
                <span className="text-amber-900/40 font-black uppercase tracking-widest text-xs">Market Valuation</span>
                <span className="text-4xl font-black text-amber-950 tracking-tighter">${totalPrice}</span>
             </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-amber-900/5 border border-amber-950/5 relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-50 rounded-full -z-10 blur-2xl opacity-60"></div>
          
          <div className="mb-10 text-center">
             <h2 className="text-2xl font-black text-amber-950 tracking-tight mb-2">Checkout Portal</h2>
             <p className="text-amber-900/40 text-sm font-medium">Finalize your acquisition of artisanal treasures.</p>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm price={totalPrice} cartItems={items} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
