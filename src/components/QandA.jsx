import React from "react";

const QandA = () => {
  return (
    <div
     className="relative transition-all duration-500 overflow-hidden py-12"
     style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",}}>
      {}
      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 pointer-events-none"></div>

      <div className="p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl space-y-6 my-12 max-w-5xl mx-auto relative z-10 border border-amber-900/10">
        <div className="text-center space-y-2 mb-10">
          <span className="text-amber-700 font-black tracking-[0.3em] uppercase text-[10px]">Support Portal</span>
          <h2 className="text-4xl font-black text-amber-950 tracking-tight">Curious Minds <span className="text-amber-700 italic">Q&A</span></h2>
        </div>

        <div className="grid gap-4">
          <div className="collapse collapse-arrow bg-amber-50/50 border border-amber-900/10 rounded-3xl overflow-hidden transition-all duration-300">
            <input type="radio" name="platform-qa" defaultChecked />
            <div className="collapse-title font-bold text-amber-950 text-lg px-8 py-5">
              How can businesses add their products?
            </div>
            <div className="collapse-content px-8 text-amber-900/60 font-medium leading-relaxed">
              <p className="pb-4">Businesses can register on Espresso Emporium and add their coffee products to reach users. Our dashboard provides real-time analytics and product management tools.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-amber-50/50 border border-amber-900/10 rounded-3xl overflow-hidden transition-all duration-300">
            <input type="radio" name="platform-qa" />
            <div className="collapse-title font-bold text-amber-950 text-lg px-8 py-5">
              Can users save products they like?
            </div>
            <div className="collapse-content px-8 text-amber-900/60 font-medium leading-relaxed">
              <p className="pb-4">Yes! Users can browse coffee products from multiple businesses and add their favorites to a wishlist for later enjoyment or purchase.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-amber-50/50 border border-amber-900/10 rounded-3xl overflow-hidden transition-all duration-300">
            <input type="radio" name="platform-qa" />
            <div className="collapse-title font-bold text-amber-950 text-lg px-8 py-5">
              Is there a fee for listing products?
            </div>
            <div className="collapse-content px-8 text-amber-900/60 font-medium leading-relaxed">
              <p className="pb-4">Users can browse for free. Businesses may select a subscription plan to list their products and gain access to premium marketing features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA;
