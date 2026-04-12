import React from "react";
import { NavLink } from "react-router";

const SharedNav = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/more/15.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-6 md:py-8 border-b border-white/10"
    >
      <div className="flex items-center justify-center gap-3 text-white font-outfit font-black text-2xl md:text-3xl tracking-tighter">
        <img src="/more/logo1.png" alt="Logo" className="h-10 md:h-12 w-auto drop-shadow-lg" />
        <span className="drop-shadow-md">Espresso <span className="text-amber-400">Emporium</span></span>
      </div>
    </div>
  );
};
export default SharedNav;
