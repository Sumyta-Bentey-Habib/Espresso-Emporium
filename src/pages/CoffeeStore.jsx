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

      {/* Background wrapper */}
      <div
        className="min-h-screen w-full"
        style={{
          backgroundImage: "url('/more/13.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Content container */}
        <div className="min-h-screen px-4 py-8">
          {/* Back to Home */}
          <div className="flex justify-center">
            <NavLink
              to="/"
              title="Click here to go back home"
              className="bg-white text-[#331A15] raleway font-medium px-4 py-2 rounded shadow hover:bg-amber-100 hover:text-amber-700 transition"
            >
              ← Back to Home
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mt-6">
            <input
              type="text"
              placeholder="Search coffee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white bg-opacity-90"
            />
          </div>

          {/* Coffee Products */}
          <div className="mt-8">
            <AllCoffee search={search} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeeStore;
