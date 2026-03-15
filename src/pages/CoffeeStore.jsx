import React, { useEffect, useState } from "react";
import SharedNav from "../shared/SharedNav";
import AllCoffee from "../components/AllCoffee";
import { NavLink } from "react-router-dom";

const CoffeeStore = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Coffee Store";
  }, []);

  return (
    <>
      <SharedNav />

      {}
      <div
        className="min-h-screen w-full relative"
        style={{
          backgroundImage: "url('/more/13.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-500 pointer-events-none"></div>
        {}
        <div className="min-h-screen px-4 py-12 relative z-10">
          {}
          <div className="flex justify-center">
            <NavLink
              to="/"
              title="Click here to go back home"
              className="bg-white text-amber-950 raleway font-bold px-8 py-4 rounded-3xl shadow-xl hover:bg-amber-50/50 transition-all active:scale-95 border border-amber-900/10"
            >
              ← Back to Home
            </NavLink>
          </div>

          {}
          <div className="flex justify-center mt-10">
            <div className="w-full max-w-xl">
              <input
                type="text"
                placeholder="Search our artisanal blends..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-8 py-5 border-2 border-amber-900/10 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-amber-500/10 bg-white text-amber-950 font-bold text-lg shadow-2xl transition-all placeholder:text-amber-900/60/30"
              />
            </div>
          </div>

          {}
          <div className="mt-8">
            <AllCoffee search={search} category="Coffee" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeeStore;
