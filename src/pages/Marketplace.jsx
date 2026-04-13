import React, { useEffect, useState } from "react";
import SharedNav from "../shared/SharedNav";
import AllCoffee from "../components/AllCoffee";
import { NavLink } from "react-router-dom";
import { ShoppingBag, Package, Coffee } from "lucide-react";
import Button from "../components/ui/Button";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Beans");

  useEffect(() => {
    document.title = "Marketplace | Espresso Emporium";
  }, []);

  const tabs = [
    { id: "Beans", label: "Premium Beans", icon: <Package size={16} /> },
    { id: "Equipment", label: "Brewing Tools", icon: <ShoppingBag size={16} /> },
    { id: "Accessories", label: "Accessories", icon: <Coffee size={16} /> },
  ];

  return (
    <div className="font-georama">
      <SharedNav />

      <div
        className="min-h-screen w-full relative"
        style={{
          backgroundImage: "url('/more/13.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60 transition-colors duration-500 pointer-events-none"></div>
        
        <div className="min-h-screen px-4 py-20 relative z-10 max-w-7xl mx-auto flex flex-col items-center">
          {/* Marketplace Header */}
          <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-top-10 duration-700">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 font-black text-[10px] tracking-[0.3em] uppercase border border-amber-500/20 mb-4">
                Exclusive Sourcing
             </div>
             <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                Artisan <span className="text-amber-500 font-display italic">Marketplace</span>
             </h1>
             <p className="max-w-2xl mx-auto text-amber-100/60 text-lg font-medium leading-relaxed">
                Source world-class beans and professional brewing equipment directly from our passionate network of roasters.
             </p>
          </div>

          {/* Combined Search & Tabs */}
          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-3xl p-3 rounded-[3rem] border border-white/20 shadow-2xl flex flex-col gap-4 mb-20 animate-in zoom-in-95 duration-700 delay-200">
             <div className="relative">
                <input
                  type="text"
                  placeholder="Find specific origins, roast profiles, or tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2.5rem] outline-none text-white font-bold text-lg placeholder:text-white/20 focus:bg-white/10 transition-all"
                />
             </div>
             
             <div className="flex bg-black/20 rounded-[2.5rem] p-1 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[2rem] font-black uppercase text-[10px] tracking-widest transition-all ${
                      activeTab === tab.id
                        ? "bg-amber-500 text-amber-950 shadow-xl shadow-amber-500/20"
                        : "text-amber-100/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* Results Grid */}
          <div className="w-full bg-white rounded-[4rem] shadow-2xl relative">
             <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent rounded-t-[4rem]"></div>
             <div className="relative z-10 py-10">
                <AllCoffee search={search} category={activeTab} />
             </div>
          </div>

          {/* Footer CTA */}
          <div className="flex justify-center mt-24">
            <NavLink to="/coffee-store">
                <Button variant="outline" className="text-amber-500 border-amber-500/30 hover:bg-amber-500 hover:text-amber-950 px-12 py-5 shadow-2xl">
                    View Cafe Menu Instead
                </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
