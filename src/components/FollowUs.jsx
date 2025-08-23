import React from "react";

const FollowUs = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-12 px-6"
    >
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Follow Us on Instagram
        </h1>
        <p className="text-gray-600 mt-2">
          Stay connected with our latest brews & vibes ☕✨
        </p>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        <img src="/cups/Rectangle 10.png" alt="Coffee cup 1" className="w-full h-auto rounded-lg" />
        <img src="/cups/Rectangle 11.png" alt="Coffee cup 2" className="w-full h-auto rounded-lg" />
        <img src="/cups/Rectangle 12.png" alt="Coffee cup 3" className="w-full h-auto rounded-lg" />
        <img src="/cups/Rectangle 13.png" alt="Coffee cup 4" className="w-full h-auto rounded-lg" />
        <img src="/cups/Rectangle 14.png" alt="Coffee cup 5" className="w-full h-auto rounded-lg" />
        <img src="/cups/Rectangle 15.png" alt="Coffee cup 6" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default FollowUs;
