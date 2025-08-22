import React from "react";
import { NavLink } from "react-router";
const NavBar = () => {
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">Coffee Store</NavLink>
      </li>
      <li>
        <NavLink to="/">DashBoard</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About</NavLink>
      </li>
      <li>
        <NavLink to="/contract">Contact Us</NavLink>
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
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content bg-black/70 text-white rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <img src="./more/logo1.png" alt="Logo" className="h-10 w-auto" />
          <a className="btn btn-ghost normal-case text-xl text-white">
            Espresso-Emporium
          </a>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end gap-2">
        <a className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black">
          Login
        </a>
        <a className="btn btn-primary btn-sm">Register</a>
      </div>
    </div>
  );
};

export default NavBar;
