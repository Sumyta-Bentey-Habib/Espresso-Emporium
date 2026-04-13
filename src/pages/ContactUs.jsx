import React, { useEffect } from "react";
import SharedNav from "../shared/SharedNav";
import { NavLink } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us | Espresso Emporium";
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
                Get in Touch
             </div>
             <h1 className="text-5xl md:text-7xl font-black mb-4 text-amber-950 tracking-tighter">
                Contact <span className="text-amber-700 font-display italic">Us</span>
             </h1>
             <p className="text-amber-900/60 text-xl font-medium leading-relaxed mb-8">
               We'd love to hear from you! Reach out with any questions, feedback,
               or partnership inquiries.
             </p>
             <NavLink to="/">
                <Button variant="ghost" size="sm">
                    ← Back to Home
                </Button>
             </NavLink>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - Contact Form */}
            <Card className="p-10 md:p-14 animate-in slide-in-from-left-10 duration-700 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10"></div>
                
                <h2 className="text-3xl font-black mb-8 text-amber-950 tracking-tight">
                    Send a Message
                </h2>
                <form className="space-y-6">
                    <Input 
                        label="Your Identity" 
                        placeholder="John Doe" 
                        icon={FiMail} 
                    />
                    
                    <Input 
                        label="Email Artifact" 
                        placeholder="john@example.com" 
                        type="email" 
                        icon={FiMail} 
                    />

                    <div className="space-y-2">
                        <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] px-1">Message Content</label>
                        <textarea
                            placeholder="Describe your inquiry..."
                            className="w-full bg-amber-50/50 border border-amber-900/10 rounded-2xl px-6 py-4 h-40 focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-amber-950 font-bold transition-all resize-none placeholder:text-amber-900/20"
                        ></textarea>
                    </div>

                    <Button variant="primary" className="w-full py-5 text-sm uppercase tracking-[0.2em]">
                        Dispatch Message
                    </Button>
                </form>
            </Card>

            {/* Right - Contact Info */}
            <div className="flex flex-col gap-12 lg:pt-10 animate-in slide-in-from-right-10 duration-700">
              <div className="flex items-start gap-6 group">
                <div className="p-5 bg-amber-950 text-white rounded-2xl group-hover:bg-amber-700 transition-all duration-300 shadow-xl group-hover:-translate-y-1">
                  <FiMapPin size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-2 text-amber-950 tracking-tight">Our Habitat</h2>
                  <p className="text-amber-900/60 text-lg font-medium">123 Coffee Lane, Coffeetown, CT 56789</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-5 bg-amber-950 text-white rounded-2xl group-hover:bg-amber-700 transition-all duration-300 shadow-xl group-hover:-translate-y-1">
                  <FiMail size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-2 text-amber-950 tracking-tight">Signal Us</h2>
                  <p className="text-amber-900/60 text-lg font-medium">contact@espresso-emporium.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-5 bg-amber-950 text-white rounded-2xl group-hover:bg-amber-700 transition-all duration-300 shadow-xl group-hover:-translate-y-1">
                  <FiPhone size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-2 text-amber-950 tracking-tight">Voice Line</h2>
                  <p className="text-amber-900/60 text-lg font-medium">+88 01533 333 333</p>
                </div>
              </div>

              <div className="pt-10 border-t border-amber-950/10">
                <h2 className="text-2xl font-black mb-8 text-amber-950 tracking-tight">Digital Presence</h2>
                <div className="flex items-center gap-6">
                  {[
                      { icon: FiFacebook, label: "Facebook" },
                      { icon: FiInstagram, label: "Instagram" },
                      { icon: FiTwitter, label: "Twitter" }
                  ].map((social, i) => (
                    <a key={i} href="#" title={social.label} className="w-14 h-14 bg-white text-amber-950 rounded-2xl border border-amber-950/10 flex items-center justify-center hover:bg-amber-950 hover:text-white transition-all active:scale-95 shadow-lg group">
                      <social.icon size={24} className="group-hover:rotate-12 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
