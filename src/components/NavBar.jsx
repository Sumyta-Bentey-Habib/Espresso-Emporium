import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

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
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-[#331A15] text-white rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItems}

            {/* Mobile User Info */}
            {user ? (
              <div className="mt-2 border-t border-gray-600 pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full border border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm">
                      {user.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={logOut}
                  className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-2 border-t border-gray-600 pt-2 flex flex-col gap-2">
                <NavLink
                  to="/login"
                  className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black"
                >
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-primary btn-sm">
                  Register
                </NavLink>
              </div>
            )}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/more/logo1.png" alt="Logo" className="h-10 w-auto" />
          <a className="normal-case text-2xl font-black text-white raleway">Espresso<span className="text-amber-400">Emporium</span></a>
        </div>
      </div>

      {/* Navbar Center - Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold tracking-wide uppercase text-xs">{navItems}</ul>
      </div>

      {/* Navbar End - Desktop User Info */}
      <div className="navbar-end gap-5 flex">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border border-white"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
              <span>{user.displayName || user.email}</span>
            </div>
            <button
              onClick={logOut}
              className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black"
            >
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary btn-sm">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
