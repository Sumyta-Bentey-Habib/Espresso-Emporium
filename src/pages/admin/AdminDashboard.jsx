import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUsers,
  FaBoxOpen,
  FaHome,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import SharedNav from "../../shared/SharedNav";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Admin";
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { to: "/dashboard/users", icon: <FaUsers size={18} />, label: "Users" },
    {
      to: "/dashboard/products",
      icon: <FaBoxOpen size={18} />,
      label: "Products",
    },
    { to: "/", icon: <FaHome size={18} />, label: "Return Home" },
  ];

  return (
    <>
      <SharedNav />

      <div className="flex min-h-screen bg-[#F5F5F5]">
        {/* Mobile Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed z-40 top-0 left-0 h-full bg-[#331A15] text-white flex flex-col shadow-lg
            transform transition-all duration-300
            ${isSidebarOpen ? "w-64" : "w-20"}
            md:static md:translate-x-0
            ${isMobileSidebarOpen ? "translate-x-0 w-64" : "md:translate-x-0"}
          `}
        >
          <div className="flex items-center justify-between p-6 border-b border-amber-700">
            <div
              className={`flex flex-col items-center md:items-start ${
                isSidebarOpen ? "" : "hidden md:flex"
              }`}
            >
              <h1 className="text-2xl font-bold raleway">Admin Panel</h1>
              <p className="text-sm text-amber-200">Welcome, Admin</p>
            </div>

            {/* Collapse Button Desktop */}
            <button
              className="hidden md:block text-amber-200 text-xl"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>

            {/* Close button Mobile */}
            <button
              className="md:hidden text-amber-200 text-xl"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <FaBars />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-4 py-2 rounded-lg transition group
                  ${
                    isActive
                      ? "bg-amber-700 text-white"
                      : "text-amber-100 hover:bg-amber-600"
                  }`
                }
              >
                {item.icon}
                {isSidebarOpen && item.label}

                {/* Tooltip for collapsed sidebar */}
                {!isSidebarOpen && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 rounded-md bg-amber-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          {/* Mobile Menu Button */}
          <div className="p-4 md:hidden">
            <button
              className="text-2xl text-[#331A15]"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <FaBars />
            </button>
          </div>

          <div
            className="flex-1 p-8 bg-white rounded-xl shadow-lg"
            style={{
              backgroundImage: "url('/more/1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-white/80 backdrop-blur-lg shadow-md rounded-2xl p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
