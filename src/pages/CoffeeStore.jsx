import React, { useEffect } from "react";
import SharedNav from "../shared/SharedNav";
import AllCoffee from "../components/AllCoffee";
import { NavLink } from "react-router-dom";

const CoffeeStore = () => {
  useEffect(() => {
    document.title = "Coffee Store";
  }, []);

  return (
    <>
      <SharedNav />
      <div className="flex justify-center mt-6">
        <NavLink
          to="/"
          title="Click here to go back home"
          className="bg-white text-[#331A15] raleway font-medium px-4 py-2 rounded shadow hover:bg-amber-100 hover:text-amber-700 transition"
        >
          ← Back to Home
        </NavLink>
      </div>
      <AllCoffee />
    </>
  );
};

export default CoffeeStore;
