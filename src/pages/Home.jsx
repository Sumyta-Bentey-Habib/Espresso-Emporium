import React, { useEffect } from "react";
import Banner from "../components/Banner";
import QualitySection from "../components/QualitySection";
import FollowUs from "../components/FollowUs";
import AllCoffee from "../components/AllCoffee";
import { NavLink } from "react-router-dom";
import QandA from "../components/QandA";
import Reviews from "../components/Reviews";

const Home = () => {
  useEffect(() => {
    document.title = "Espresso-Emporium";
  }, []);

  return (
    <div>
      <Banner />
      <QualitySection />

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10 transition-colors duration-500"></div>
        <section className="py-24 relative overflow-hidden bg-white transition-colors duration-500">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl -mr-48 -mt-48 transition-all duration-700"></div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="text-center mb-16 space-y-4">
              <span className="text-amber-700 font-black tracking-[0.3em] uppercase text-[10px]">Our Collection</span>
              <h2 className="text-5xl md:text-6xl font-black text-amber-950 tracking-tighter">
                Coffee <span className="text-amber-700 italic">Selection</span>
              </h2>
              <div className="w-24 h-1.5 bg-amber-900 mx-auto rounded-full"></div>
              <p className="text-amber-900/60 max-w-xl mx-auto text-lg leading-relaxed pt-4 font-medium">
                Experience the artistry of small-batch roasting. Every bean tells a story of origin, passion, and perfection.
              </p>
            </div>

            <AllCoffee limit={3} />

            <div className="text-center mt-16">
              <NavLink
                to="/coffee-store"
                className="inline-flex items-center gap-3 bg-amber-950 text-white px-10 py-5 rounded-2xl font-black hover:bg-black transition-all shadow-2xl shadow-amber-950/20 active:scale-95 group"
              >
                Explore Full Store
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </NavLink>
            </div>
          </div>
        </section>
      </div>

      <QandA />
      <Reviews />
      <FollowUs />
    </div>
  );
};

export default Home;
