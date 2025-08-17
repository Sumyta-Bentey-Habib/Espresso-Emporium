import React from "react";

const QualitySection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-10 bg-[#ECEAE3]">
      {/* Card 1 */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/icons/1.png"
          alt="Awesome Aroma"
          className="w-12 h-12 mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 text-[#331A15]">
          Awesome Aroma
        </h3>
        <p className="text-[#1B1A1A] text-sm raleway">
          You will definitely be a fan of the design & aroma of your coffee
        </p>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center text-center">
        <img src="/icons/2.png" alt="High Quality" className="w-12 h-12 mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-[#331A15]">
          High Quality
        </h3>
        <p className="text-[#1B1A1A] text-sm raleway">
          We served the coffee to you maintaining the best quality
        </p>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col items-center text-center">
        <img src="/icons/3.png" alt="Pure Grades" className="w-12 h-12 mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-[#331A15]">
          Pure Grades
        </h3>
        <p className="text-[#1B1A1A] text-sm raleway">
          The coffee is made of the green coffee beans which you will love
        </p>
      </div>

      {/* Card 4 */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/icons/4.png"
          alt="Proper Roasting"
          className="w-12 h-12 mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 text-[#331A15]">
          Proper Roasting
        </h3>
        <p className="text-[#1B1A1A] text-sm raleway">
          Your coffee is brewed by first roasting the green coffee beans
        </p>
      </div>
    </div>
  );
};

export default QualitySection;
