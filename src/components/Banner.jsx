import React from 'react';
import { NavLink } from 'react-router';

const Banner = () => {
  return (
    <div className="hero min-h-screen relative overflow-hidden">
    
      <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
        <source src="/more/video/banner.mp4" type="video/mp4" />
      </video>

      {}
      <div className="hero-overlay bg-black/40 absolute inset-0 transition-colors duration-500"></div>

      {}
      <div className="hero-content text-neutral-content text-center relative z-10">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Would you like a Cup of Delicious Coffee?</h1>

          <p className="mb-5 font-inter">
            It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your
            companion of every moment!!! Enjoy the beautiful moments and make them memorable.
          </p>

          <NavLink to="/coffee-store">
            <button className="btn bg-amber-600 hover:bg-amber-700 text-white border-none px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-amber-600/20 active:scale-95 transition-all">
              Taste the Selection
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;
