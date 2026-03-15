import React from "react";
import { Quote } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      title: "Café Aroma",
      feedback: "Listing our products here gave us so much visibility! We reached more coffee lovers than ever.",
    },
    {
      title: "David M.",
      feedback: "I love being able to browse different roasters and save my favorites to my wishlist.",
    },
    {
      title: "Latte House",
      feedback: "The platform is simple and effective. Managing our products has never been easier.",
    },
  ];

  return (
    <div
     className="relative py-12 transition-all duration-500 overflow-hidden"
     style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",}}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 pointer-events-none"></div>

      <div className="p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl space-y-10 my-12 max-w-5xl mx-auto relative z-10 border border-amber-900/10">
        <div className="text-center space-y-2">
          <span className="text-amber-700 font-black tracking-[0.3em] uppercase text-[10px]">Testimonials</span>
          <h2 className="text-4xl font-black text-amber-950 tracking-tight">The Artisan <span className="text-amber-700 italic">Vibe</span></h2>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {reviews.map((r, index) => (
            <div key={index} className="bg-amber-50/50 w-80 p-8 rounded-3xl border border-amber-900/10 hover:shadow-xl transition-all duration-300 group">
              <div className="mb-4 text-amber-600 opacity-20 group-hover:opacity-100 transition-opacity">
                <Quote size={32} />
              </div>
              <h2 className="text-xl font-black text-amber-950 mb-3">{r.title}</h2>
              <p className="text-amber-900/60 italic leading-relaxed font-medium">"{r.feedback}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
