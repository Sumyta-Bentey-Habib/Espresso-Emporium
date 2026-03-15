import React from "react";
import { FiInstagram } from "react-icons/fi";

const FollowUs = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-24 px-6 relative overflow-hidden"
    >
      {}
      <div className="absolute inset-0 bg-white/40 transition-colors duration-500 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto">
        {}
        <div className="text-center mb-16 space-y-3">
          <span className="text-amber-700 font-black tracking-[0.3em] uppercase text-[10px]">Social Circle</span>
          <h1 className="text-5xl font-black text-amber-950 tracking-tight">
            Follow our <span className="text-amber-700 italic">Vibe</span>
          </h1>
          <p className="text-amber-900/60 font-bold uppercase tracking-widest text-xs opacity-60">
            Stay connected with our latest brews & moments ✨
          </p>
        </div>

        {}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[10,11,12,13,14,15].map(num => (
            <div key={num} className="group relative overflow-hidden rounded-2xl shadow-xl aspect-square">
              <img 
                src={`/cups/Rectangle ${num}.png`} 
                alt={`Coffee vibe ${num}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
              />
              <div className="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <FiInstagram size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
