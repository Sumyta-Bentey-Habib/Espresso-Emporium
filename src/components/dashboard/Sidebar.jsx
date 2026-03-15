import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Users, 
  Box, 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle,
  History,
  LogOut,
  Coffee
} from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const Sidebar = ({ isCollapsed, onToggle, role }) => {
  const { logOut, user } = useAuth();

  const getMenuItems = () => {
    switch (role) {
      case "admin":
        return [
          { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Overview" },
          { to: "/dashboard/users", icon: <Users size={20} />, label: "Manage Users" },
          { to: "/dashboard/products", icon: <Box size={20} />, label: "Manage Products" },
        ];
      case "seller":
        return [
          { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Seller Stats" },
          { to: "/dashboard/my-products", icon: <Coffee size={20} />, label: "My Coffees" },
          { to: "/dashboard/add-product", icon: <PlusCircle size={20} />, label: "Add New Blend" },
        ];
      case "buyer":
        return [
          { to: "/dashboard", icon: <History size={20} />, label: "My Orders" },
          { to: "/dashboard/wishlist", icon: <ShoppingBag size={20} />, label: "Wishlist" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside
      className={`relative h-screen bg-[#331a15] text-white flex flex-col shadow-2xl transition-all duration-500 z-50 shrink-0 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Branding */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between h-24 overflow-hidden shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-700 flex items-center justify-center shrink-0">
            <Coffee size={24} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="font-black text-xl tracking-tighter uppercase leading-none">Espresso</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-amber-500 font-bold mt-0.5">Emporium</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                isActive 
                ? "bg-amber-700 text-white shadow-lg shadow-amber-900/40" 
                : "text-amber-100/60 hover:bg-white/5 hover:text-white"
              } ${isCollapsed ? "justify-center px-0" : ""}`
            }
          >
            <div className="shrink-0">{item.icon}</div>
            {!isCollapsed && (
              <span className="font-bold whitespace-nowrap animate-in fade-in duration-500">
                {item.label}
              </span>
            )}
            
            {/* Tooltip for collapsed mode */}
            {isCollapsed && (
              <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-amber-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[60] shadow-xl whitespace-nowrap">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Info */}
      <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
        <NavLink
          to="/"
          className={`flex items-center gap-4 px-4 py-3 text-amber-100/60 hover:text-white hover:bg-white/5 rounded-2xl transition-all group relative ${isCollapsed ? "justify-center px-0" : ""}`}
        >
          <Home size={20} />
          {!isCollapsed && <span className="font-bold">Back to Site</span>}
          {isCollapsed && (
              <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-amber-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[60] shadow-xl whitespace-nowrap">
                Back to Site
              </div>
            )}
        </NavLink>
        
        <button
          onClick={logOut}
          className={`w-full flex items-center gap-4 px-4 py-3 text-rose-300 hover:text-rose-100 hover:bg-rose-500/10 rounded-2xl transition-all group relative ${isCollapsed ? "justify-center px-0" : ""}`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-bold">Sign Out</span>}
          {isCollapsed && (
              <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-rose-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[60] shadow-xl whitespace-nowrap">
                Sign Out
              </div>
            )}
        </button>

        {!isCollapsed ? (
          <div className="mt-4 p-4 rounded-3xl bg-white/5 flex items-center gap-3 animate-in fade-in duration-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black text-xs uppercase shrink-0">
              {user?.name?.[0] || role?.[0]}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm truncate">{user?.name || "User"}</span>
              <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">{role}</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black text-xs uppercase">
              {user?.name?.[0] || role?.[0]}
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-4 top-24 w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-xl border-4 border-amber-50 hover:scale-110 active:scale-90 transition-all z-[70]"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
