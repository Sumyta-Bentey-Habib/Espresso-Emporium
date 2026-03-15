import React, { useEffect } from "react";
import SharedNav from "../shared/SharedNav";
import { NavLink } from "react-router";
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const ContactUs = () => {
   useEffect(() => {
            document.title = "Contract-Us";
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
              Contact <span className="text-amber-700 italic">Us</span>
            </h1>
            <p className="text-amber-900/60 raleway text-xl font-medium leading-relaxed mb-6">
              We'd love to hear from you! Reach out with any questions, feedback,
              or partnership inquiries.
            </p>
            <NavLink
              to="/"
              title="Click here to go back home"
              className="text-amber-700 font-bold raleway underline inline-block hover:text-black transition-all active:scale-95"
            >
              ← Back to Home
            </NavLink>
          </div>

      
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - Contact Form */}
            <div className="bg-white shadow-2xl rounded-[3rem] p-10 md:p-12 border border-amber-900/10 animate-in slide-in-from-left-4 duration-700">
              <h2 className="text-3xl font-black mb-8 text-amber-950 tracking-tight">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-amber-900/60 font-black uppercase tracking-widest text-[10px] px-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-amber-50/50 border border-amber-900/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-amber-950 font-bold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-amber-900/60 font-black uppercase tracking-widest text-[10px] px-1">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-amber-50/50 border border-amber-900/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-amber-950 font-bold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-amber-900/60 font-black uppercase tracking-widest text-[10px] px-1">Message</label>
                  <textarea
                    placeholder="Your Message"
                    className="w-full bg-amber-50/50 border border-amber-900/10 rounded-2xl px-6 py-4 h-40 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-amber-950 font-bold transition-all resize-none"
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

            {/* Right - Contact Info with Icons */}
            <div className="flex flex-col gap-10 lg:pt-10 animate-in slide-in-from-right-4 duration-700">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-amber-700/10 text-amber-700 rounded-2xl group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                  <FiMapPin size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-2 text-amber-950 tracking-tight">Our Office</h2>
                  <p className="text-amber-900/60 text-lg font-medium">123 Coffee Lane, Coffeetown, CT 56789</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-amber-700/10 text-amber-700 rounded-2xl group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                  <FiMail size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-2 text-amber-950 tracking-tight">Email</h2>
                  <p className="text-amber-900/60 text-lg font-medium">contact@espresso-emporium.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-amber-700/10 text-amber-700 rounded-2xl group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                  <FiPhone size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-2 text-amber-950 tracking-tight">Phone</h2>
                  <p className="text-amber-900/60 text-lg font-medium">+88 01533 333 333</p>
                </div>
              </div>

              <div className="pt-6 border-t border-amber-900/10">
                <h2 className="text-2xl font-black mb-6 text-amber-950 tracking-tight">Follow Us</h2>
                <div className="flex items-center gap-4">
                  {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
                    <a key={i} href="#" className="p-4 bg-white text-amber-900 rounded-2xl border border-amber-900/10 hover:bg-amber-950 hover:text-white transition-all active:scale-90 shadow-lg">
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
