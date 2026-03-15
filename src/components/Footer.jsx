import React from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="bg-amber-50/50 text-amber-950 relative border-t border-amber-900/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">

        <div className="space-y-8">
          <div>
            <img src="/more/logo1.png" alt="Espresso Emporium Logo" className="mb-6 w-24 h-auto drop-shadow-2xl" />
            <h2 className="text-3xl font-black mb-4 tracking-tighter">Espresso<span className="text-amber-700">Emporium</span></h2>
            <p className="text-amber-900/60 mb-6 raleway leading-relaxed text-lg max-w-md">
              Always ready to be your friend ☕. Come & contact with us to share your
              memorable moments, to share with your best companion.
            </p>
          </div>

    
          <div className="flex gap-6 mb-8 text-2xl">
            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="p-3 bg-amber-950/5 text-amber-900 rounded-2xl hover:bg-amber-950 hover:text-white transition-all active:scale-90">
                <Icon size={24} />
              </a>
            ))}
          </div>

         
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Get in Touch</h3>
            <div className="space-y-4 text-amber-900/60 font-bold">
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl group-hover:scale-110 transition-transform">
                  <FiPhone />
                </div>
                <p>+88 01533 333 333</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl group-hover:scale-110 transition-transform">
                  <FiMail />
                </div>
                <p>contact@espresso-emporium.com</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl group-hover:scale-110 transition-transform">
                  <FiMapPin />
                </div>
                <p>123 Coffee Lane, Coffeetown, CT 56789</p>
              </div>
            </div>
          </div>
        </div>

   
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-amber-900/10">
          <h3 className="text-2xl font-black mb-8 tracking-tight text-amber-950">Connect with Us</h3>
          <form className="space-y-6">
            <div className="group">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-amber-50/50 border border-amber-900/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-amber-950 font-bold transition-all"
              />
            </div>
            <div className="group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-amber-50/50 border border-amber-900/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-amber-950 font-bold transition-all"
              />
            </div>
            <div className="group">
              <textarea
                placeholder="How can we help you?"
                className="w-full bg-amber-50/50 border border-amber-900/10 rounded-2xl px-6 py-4 h-32 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-amber-950 font-bold transition-all resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-950 text-white py-5 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-amber-950/40 hover:bg-black transition-all active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

    
      <div
        className="text-white text-center py-6 text-[10px] font-black uppercase tracking-[0.3em] relative overflow-hidden"
        style={{
          backgroundImage: "url('/more/15.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none"></div>
        <span className="relative z-10">Copyright © {new Date().getFullYear()} Espresso Emporium | Artisanal Brews Group</span>
      </div>
    </footer>
  );
};

export default Footer;
