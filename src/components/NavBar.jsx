import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Button from "./ui/Button";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="hover:text-amber-200 transition-colors">Home</NavLink>
      </li>
      <li>
        <NavLink to="/coffee-store" className="hover:text-amber-200 transition-colors">Coffee Store</NavLink>
      </li>
      <li>
        <NavLink to="/marketplace" className="hover:text-amber-200 transition-colors">Marketplace</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className="hover:text-amber-200 transition-colors">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about-us" className="hover:text-amber-200 transition-colors">About</NavLink>
      </li>
      <li>
        <NavLink to="/contract" className="hover:text-amber-200 transition-colors">Contact Us</NavLink>
      </li>
    </>
  );

  return (
    <div
      className="navbar sticky top-0 z-50 shadow-md text-white"
      style={{
        backgroundImage: "url('/more/15.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden focus:bg-white/10 active:bg-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#331A15] text-white rounded-[1.5rem] z-10 mt-3 w-52 p-4 shadow-2xl border border-white/10"
          >
            {navItems}

            {user ? (
              <div className="mt-4 border-t border-white/10 pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 px-1">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-xl object-cover border border-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-amber-700 flex items-center justify-center text-xs font-black">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="text-[10px] font-bold truncate max-w-[120px]">{user.displayName || user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={logOut} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="mt-4 border-t border-white/10 pt-4 flex flex-col gap-2">
                <NavLink to="/login">
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="primary" size="sm" className="w-full">Register</Button>
                </NavLink>
              </div>
            )}
          </ul>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
          <img src="/more/logo1.png" alt="Logo" className="h-10 w-auto" />
          <a className="normal-case text-xl font-black text-white font-georama tracking-tight">
            Espresso<span className="text-amber-400">Emporium</span>
          </a>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold tracking-wide uppercase text-[10px] gap-2">
          {navItems}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-4 hidden sm:flex">
        {user ? (
          <>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none truncate max-w-[100px]">
                    {user.displayName || "Artisan"}
                </span>
                <span className="text-[8px] text-amber-400 font-bold tracking-tighter mt-0.5">Online</span>
              </div>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-9 h-9 rounded-xl object-cover border-2 border-amber-600/30 shadow-lg"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-amber-700 flex items-center justify-center text-sm font-black shadow-lg">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={logOut} className="text-rose-200 hover:text-rose-400 hover:bg-rose-500/10">
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white hover:text-amber-950">
                Login
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button size="sm" className="bg-amber-400 text-amber-950 hover:bg-amber-300">
                Join Us
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
