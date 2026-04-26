import React from "react";
import { X, CreditCard, ShoppingBag, Coffee, Package } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentModal = ({ isOpen, onClose, items, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-amber-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white z-20 md:hidden"
        >
          <X size={20} />
        </button>

        {/* Left Side: Summary */}
        <div className="md:w-5/12 bg-amber-950 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: "url('/more/1.png')", backgroundSize: "300px" }}></div>
          
          <div className="relative z-10">
             <div className="flex items-center justify-between mb-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                   <ShoppingBag size={24} className="text-amber-400" />
                </div>
                <button onClick={onClose} className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white">
                   <X size={24} />
                </button>
             </div>

             <h2 className="text-3xl font-black tracking-tighter mb-2">Order Archive</h2>
             <p className="text-amber-200/40 font-black uppercase tracking-[0.2em] text-[10px] mb-8">Reviewing {items.length} Artisan Artifacts</p>

             <div className="space-y-4 max-h-[30vh] overflow-y-auto custom-scrollbar pr-4">
                {items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-lg">
                       <img src={it.image || "/more/coffee-splash.jpg"} alt={it.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-black text-sm truncate tracking-tight">{it.name}</h4>
                       <p className="text-[8px] font-black uppercase tracking-widest text-amber-200/30 flex items-center gap-1.5">
                          {it.category === "Beans" ? <Package size={8} /> : <Coffee size={8} />}
                          {it.category || "Artifact"}
                       </p>
                    </div>
                    <div className="text-sm font-black text-amber-400 tracking-tighter">
                       ${it.price}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 mt-8">
             <div className="flex justify-between items-end">
                <div>
                   <p className="text-amber-200/40 font-black uppercase tracking-[0.2em] text-[10px]">Market Valuation</p>
                   <p className="text-4xl font-black tracking-tighter text-amber-400">${totalPrice}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center">
               <h3 className="text-2xl font-black text-amber-950 tracking-tight mb-2">Checkout Portal</h3>
               <p className="text-amber-900/40 text-sm font-medium">Finalize your acquisition of artisanal treasures.</p>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm price={totalPrice} cartItems={items} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
