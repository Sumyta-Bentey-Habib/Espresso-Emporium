import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import SharedNav from "../shared/SharedNav";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us | Espresso Emporium";
  }, []);

  return (
    <div className="font-georama">
      <SharedNav />
      <div
        className="px-6 lg:px-20 py-24 bg-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/60 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/10 text-amber-950 font-black text-[10px] tracking-[0.3em] uppercase border border-amber-950/20 mb-6">
                Our Legacy
             </div>
             <h1 className="text-5xl md:text-7xl font-black mb-4 text-amber-950 tracking-tighter">
                Espresso <span className="text-amber-700 font-display italic">Emporium</span>
             </h1>

             <NavLink to="/">
                <Button variant="ghost" size="sm" className="mt-2">
                    ← Back to Home
                </Button>
             </NavLink>

             <p className="text-amber-900/60 text-xl md:text-2xl mt-8 font-medium leading-relaxed italic">
                Your ultimate destination for discovering artisanal spirit in every cup.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Visual Panel */}
            <div className="flex justify-center animate-in zoom-in duration-1000">
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-700/20 blur-[100px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="/more/2.png"
                  alt="Coffee lovers"
                  className="w-full max-w-md relative z-10 drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Content Panel */}
            <div className="space-y-12 animate-in slide-in-from-right-10 duration-700">
              <section>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-amber-700"></div>
                    <h2 className="text-3xl font-black text-amber-950 tracking-tight uppercase">Our Story</h2>
                </div>
                <p className="text-amber-900/70 text-lg font-medium leading-relaxed">
                  Espresso Emporium was born from a simple obsession — to connect coffee
                  lovers with the most passionate roasters, while empowering independent
                  merchants to showcase their unique soul. We believe every brew has a character, 
                  and every shop has a story worth telling.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-amber-700"></div>
                    <h2 className="text-3xl font-black text-amber-950 tracking-tight uppercase">The Standard</h2>
                </div>
                <ul className="space-y-5 text-amber-900/70 font-bold text-lg">
                  {[
                    "Discovery of hidden neighborhood gems",
                    "Empowering local roasting businesses",
                    "Personalized taste matching technology",
                    "Community-driven quality standards"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group cursor-default">
                      <span className="w-10 h-10 rounded-xl bg-amber-950 text-white flex items-center justify-center group-hover:bg-amber-700 group-hover:scale-110 transition-all shadow-lg active:rotate-12">☕</span>
                      <span className="group-hover:text-amber-950 transition-colors uppercase text-sm tracking-widest">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Mission Statement */}
          <Card className="mt-24 text-center max-w-4xl mx-auto p-16 animate-in fade-in slide-in-from-bottom-10 duration-1000 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-700"></div>
            <h2 className="text-4xl font-black mb-8 text-amber-950 tracking-tight">The Mission</h2>
            <p className="text-amber-900/60 text-xl font-medium leading-relaxed italic">
              "We believe coffee is more than just a morning ritual — it’s the catalyst for connection. 
              Our mission is to build the world’s most vibrant artisan community, 
              where passion meets precision in every cup."
            </p>
            <div className="mt-10 flex justify-center">
                <Button variant="outline" size="sm" className="rounded-full">Join the Community</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
