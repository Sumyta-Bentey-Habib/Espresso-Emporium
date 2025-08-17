import React from "react";
import { NavLink } from "react-router";
const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('/more/banner.png')",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Would you like a Cup of Delicious Coffee?
          </h1>
          <p className="mb-5 raleway">
            It's coffee time - Sip & Savor - Relaxation in every sip! Get the
            nostalgia back!! Your companion of every moment!!! Enjoy the
            beautiful moments and make them memorable.
          </p>
          <NavLink>
            <button className="btn bg-[#E3B577]">Learn More</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Banner;
