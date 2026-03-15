import React, { useEffect } from "react";
import { NavLink } from "react-router";
import SharedNav from "../shared/SharedNav";

const AboutUs = () => {
   useEffect(() => {
          document.title = "About-Us";
        }, []);
  return (
    <>
   
      <SharedNav />
      <div
        className="px-6 lg:px-20 py-24 bg-white transition-colors duration-500 relative overflow-hidden"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {}
        <div className="absolute inset-0 bg-white/40 transition-colors duration-500 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl font-black mb-4 text-amber-950 tracking-tighter">
              Espresso <span className="text-amber-700 italic">Emporium</span>
            </h1>

            <NavLink
              to="/"
              title="Click here to go back home"
              className="text-amber-700 font-bold raleway underline mt-2 inline-block hover:text-black transition-all active:scale-95"
            >
              ← Back to Home
            </NavLink>

            <p className="text-amber-900/60 raleway text-xl mt-6 font-medium leading-relaxed">
              Your ultimate destination for discovering coffee stores around you and
              helping businesses expand their reach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex justify-center animate-in zoom-in duration-700">
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-700/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="/more/2.png"
                  alt="Coffee lovers"
                  className="w-full max-w-md relative z-10 drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <div className="space-y-10 animate-in slide-in-from-right-4 duration-700">
              <section>
                <h2 className="text-3xl font-black mb-6 text-amber-950 tracking-tight">Our Story</h2>
                <p className="text-amber-900/60 raleway mb-6 text-lg font-medium leading-relaxed">
                  Espresso Emporium was born with a simple idea — to connect coffee
                  lovers with their favorite coffee stores, while empowering local
                  businesses to showcase their unique flavors. Whether you’re seeking
                  a cozy spot to sip or a bold brew to fuel your day, our platform
                  helps you explore and enjoy coffee like never before.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-black mb-6 text-amber-950 tracking-tight">Why Choose Us?</h2>
                <ul className="space-y-4 text-amber-900/60 raleway font-bold text-lg">
                  {[
                    "Browse coffee stores in your city with ease",
                    "Help businesses grow their presence",
                    "Personalized recommendations based on taste",
                    "A community-driven platform for enthusiasts"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 group">
                      <span className="w-8 h-8 rounded-full bg-amber-700/10 text-amber-700 flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition-colors">☕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="mt-24 text-center max-w-4xl mx-auto p-12 bg-white rounded-[3rem] border border-amber-900/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-black mb-6 text-amber-950 tracking-tight">Our Mission</h2>
            <p className="text-amber-900/60 raleway text-lg font-medium leading-relaxed">
              At Espresso Emporium, we believe coffee is more than just a drink —
              it’s an experience that connects people. Our mission is to bring
              coffee lovers and coffee businesses together, creating a thriving
              community where everyone can share their passion for coffee.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
