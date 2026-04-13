import React, { useEffect } from "react";
import Banner from "../components/Banner";
import QualitySection from "../components/QualitySection";
import FollowUs from "../components/FollowUs";
import AllCoffee from "../components/AllCoffee";
import { NavLink } from "react-router-dom";
import QandA from "../components/QandA";
import Reviews from "../components/Reviews";
import Button from "../components/ui/Button";

const Home = () => {
  useEffect(() => {
    document.title = "Espresso Emporium | Crafted Perfection";
  }, []);

  return (
    <div className="font-georama">
      <Banner />
      <QualitySection />

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
        <section className="py-24 relative overflow-hidden bg-white">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl -mr-48 -mt-48 transition-all duration-700"></div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="text-center mb-16 space-y-4">
              <span className="text-amber-700 font-black tracking-[0.3em] uppercase text-[10px]">Our Collection</span>
              <h2 className="text-5xl font-black text-amber-950 tracking-tighter">
                Coffee <span className="text-amber-700 font-display italic">Selection</span>
              </h2>
              <div className="w-24 h-1 bg-amber-900 mx-auto rounded-full"></div>
              <p className="text-amber-900/60 max-w-xl mx-auto text-lg leading-relaxed pt-4 font-medium italic">
                Experience the artistry of small-batch roasting. Every bean tells a story of origin, passion, and perfection.
              </p>
            </div>

            <AllCoffee limit={6} />

            <div className="text-center mt-20">
              <NavLink to="/coffee-store">
                <Button variant="primary" size="lg" className="px-12 py-5 shadow-2xl shadow-amber-950/30">
                    Explore Full Store
                </Button>
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
