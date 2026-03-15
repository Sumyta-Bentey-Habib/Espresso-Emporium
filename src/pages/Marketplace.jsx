import React, { useEffect, useState } from "react";
import SharedNav from "../shared/SharedNav";
import AllCoffee from "../components/AllCoffee";
import { NavLink } from "react-router-dom";
import { ShoppingBag, Package, Coffee } from "lucide-react";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Beans");

  useEffect(() => {
    document.title = "Marketplace | Espresso Emporium";
  }, []);

  const tabs = [
    { id: "Beans", label: "Premium Beans", icon: <Package size={18} /> },
    { id: "Equipment", label: "Brewing Tools", icon: <ShoppingBag size={18} /> },
    { id: "Accessories", label: "Accessories", icon: <Coffee size={18} /> },
  ];

  return (
    <>
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
        <div className="absolute inset-0 bg-black/50 transition-colors duration-500 pointer-events-none"></div>
        
        <div className="min-h-screen px-4 py-16 relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              Artisan <span className="text-amber-500 italic">Marketplace</span>
            </h1>
            <p className="max-w-2xl mx-auto text-amber-50/70 text-lg font-medium">
              Source world-class beans and professional brewing equipment directly from our passionate roasters.
            </p>
          </div>

          {/* Search & Tabs */}
          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl p-2 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Find specific origins or tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-8 py-4 bg-transparent outline-none text-white font-bold text-lg placeholder:text-white/40"
              />
              <div className="flex bg-white/10 rounded-[2rem] p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${
                      activeTab === tab.id
                        ? "bg-amber-500 text-amber-950 shadow-lg"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Marketplace Content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <AllCoffee search={search} category={activeTab} />
          </div>

          {/* Footer Navigation */}
          <div className="flex justify-center mt-20">
            <NavLink
              to="/coffee-store"
              className="bg-amber-500/10 backdrop-blur-md text-amber-500 border border-amber-500/30 px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-amber-500 hover:text-amber-950 transition-all shadow-2xl"
            >
              Check cafe menu
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
