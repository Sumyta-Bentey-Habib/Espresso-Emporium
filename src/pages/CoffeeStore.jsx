import React, { useEffect, useState } from "react";
import SharedNav from "../shared/SharedNav";
import AllCoffee from "../components/AllCoffee";
import { NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Search } from "lucide-react";

const CoffeeStore = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Coffee Store | Espresso Emporium";
  }, []);

  return (
    <div className="font-georama">
      <SharedNav />

      {/* Hero Background */}
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

        <div className="min-h-screen px-4 py-12 relative z-10 flex flex-col items-center">
          {/* Back Navigation */}
          <div className="w-full max-w-7xl flex pt-4">
             <NavLink to="/">
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-amber-950 backdrop-blur-md">
                    ← Back to Home
                </Button>
             </NavLink>
          </div>

          {/* Search Header */}
          <div className="w-full max-w-2xl mt-20 text-center space-y-8 animate-in slide-in-from-bottom-10 duration-700">
             <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                    Coffee <span className="text-amber-400 font-display italic">Store</span>
                </h1>
                <p className="text-amber-100/60 font-medium text-lg uppercase tracking-widest leading-relaxed">
                    Discovery begins with a single search
                </p>
             </div>

             <div className="relative group">
                <Input
                  type="text"
                  placeholder="Search our artisanal blends..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="!space-y-0"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-950 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-950/20 group-hover:scale-110 transition-transform">
                    <Search size={20} />
                </div>
             </div>
          </div>

          {/* Catalog Section */}
          <div className="w-full mt-12 bg-white rounded-[3rem] shadow-2xl relative">
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent rounded-t-[3rem]"></div>
             <AllCoffee search={search} category="Coffee" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
