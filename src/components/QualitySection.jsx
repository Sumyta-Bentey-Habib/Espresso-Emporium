import React from "react";

const QualitySection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-20 bg-amber-50/50 transition-colors duration-500 border-b border-amber-900/10">
      {/* Card 1 */}
      <div className="flex flex-col items-center text-center p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amber-900/10 group">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform border border-amber-900/10">
          <img
            src="/icons/1.png"
            alt="Awesome Aroma"
            className="w-10 h-10 object-contain"
          />
        </div>
        <h3 className="text-xl font-black mb-3 text-amber-950 tracking-tight">
          Awesome Aroma
        </h3>
        <p className="text-amber-900/60 text-sm font-medium leading-relaxed">
          You will definitely be a fan of the design & aroma of your coffee
        </p>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center text-center p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amber-900/10 group">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform border border-amber-900/10">
          <img src="/icons/2.png" alt="High Quality" className="w-10 h-10 object-contain" />
        </div>
        <h3 className="text-xl font-black mb-3 text-amber-950 tracking-tight">
          High Quality
        </h3>
        <p className="text-amber-900/60 text-sm font-medium leading-relaxed">
          We served the coffee to you maintaining the best quality
        </p>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col items-center text-center p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amber-900/10 group">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform border border-amber-900/10">
          <img src="/icons/3.png" alt="Pure Grades" className="w-10 h-10 object-contain" />
        </div>
        <h3 className="text-xl font-black mb-3 text-amber-950 tracking-tight">
          Pure Grades
        </h3>
        <p className="text-amber-900/60 text-sm font-medium leading-relaxed">
          The coffee is made of the green coffee beans which you will love
        </p>
      </div>

      {/* Card 4 */}
      <div className="flex flex-col items-center text-center p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amber-900/10 group">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform border border-amber-900/10">
          <img
            src="/icons/4.png"
            alt="Proper Roasting"
            className="w-10 h-10 object-contain"
          />
        </div>
        <h3 className="text-xl font-black mb-3 text-amber-950 tracking-tight">
          Proper Roasting
        </h3>
        <p className="text-amber-900/60 text-sm font-medium leading-relaxed">
          Your coffee is brewed by first roasting the green coffee beans
        </p>
      </div>
    </div>
  );
};

export default QualitySection;
