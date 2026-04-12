import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fafaf9]">
      {/* Subtle Grainy Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/more/1.png')", backgroundSize: "400px" }}></div>
      
      <div className="relative flex flex-col items-center">
        {/* Glow behind the animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/20 blur-[60px] rounded-full animate-pulse"></div>
        
        <div className="w-48 h-48 md:w-64 md:h-64 drop-shadow-2xl relative z-10">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>

        <div className="mt-8 text-center space-y-3 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-2xl md:text-3xl font-outfit font-black text-amber-950 tracking-tight">
            Perfecting the Roast
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-amber-900/10 rounded-full"></span>
            <p className="text-[10px] md:text-xs font-inter font-bold text-amber-900/40 uppercase tracking-[0.3em]">
              Brewing your experience
            </p>
            <span className="w-8 h-0.5 bg-amber-900/10 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Modern thin progress bar at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-amber-100 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-600 via-amber-800 to-amber-600 w-1/3 animate-[loading-shimmer_2s_infinite_linear]"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </div>
  );
};

export default Loader;
