import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingBag, FaShoppingCart, FaHome } from "react-icons/fa"; // <- Corrected
import SharedNav from "../../shared/SharedNav";

const BuyerDashboard = () => {
  return (
    <>
    <SharedNav></SharedNav>

    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#331A15] text-white flex flex-col shadow-lg">
        <div className="p-6 text-center border-b border-amber-700">
          <h1 className="text-2xl font-bold raleway">Buyer Panel</h1>
          <p className="text-sm text-amber-200">Welcome, Buyer</p>
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <NavLink
            to="/dashboard/view-products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-700 text-white"
                  : "text-amber-100 hover:bg-amber-600"
              }`
            }
          >
            <FaShoppingBag /> View Products
          </NavLink>

          <NavLink
            to="/dashboard/cart"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-700 text-white"
                  : "text-amber-100 hover:bg-amber-600"
              }`
            }
          >
            <FaShoppingCart /> My Cart
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-700 text-white"
                  : "text-amber-100 hover:bg-amber-600"
              }`
            }
          >
            <FaHome /> Return Home
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-8 bg-white"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/80 backdrop-blur-lg shadow-md rounded-2xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
    </>
  );
};

export default BuyerDashboard;
