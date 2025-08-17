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
      className="py-4"
    >
      <div className="flex items-center justify-center gap-2">
        <img src="/more/logo1.png" alt="Logo" className="h-10 w-auto" />
          Espresso Emporium
      </div>
    </div>
  );
};
export default SharedNav;
