import React from "react";
import { NavLink } from "react-router";
import SharedNav from "../shared/SharedNav";

const AboutUs = () => {
  return (
    <>
      <SharedNav />
      <div
        className="px-6 lg:px-20 py-16 bg-white"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#331A15]">
            Espresso Emporium
          </h1>

          <NavLink
            to="/"
            title="Click here to go back home"
            className="text-[#331A15] raleway underline mt-2 inline-block hover:text-amber-700 transition"
          >
            ← Back to Home
          </NavLink>

          <p className="text-[#1B1A1A] raleway text-lg mt-4">
            Your ultimate destination for discovering coffee stores around you and
            helping businesses expand their reach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="/more/2.png"
              alt="Coffee lovers"
              className="w-full max-w-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#331A15]">Our Story</h2>
            <p className="text-[#1B1A1A] raleway mb-6">
              Espresso Emporium was born with a simple idea — to connect coffee
              lovers with their favorite coffee stores, while empowering local
              businesses to showcase their unique flavors. Whether you’re seeking
              a cozy spot to sip or a bold brew to fuel your day, our platform
              helps you explore and enjoy coffee like never before.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-[#331A15]">Why Choose Us?</h2>
            <ul className="space-y-3 text-[#1B1A1A] raleway">
              <li>☕ Browse coffee stores in your city with ease</li>
              <li>🌍 Help businesses grow their presence and reach more customers</li>
              <li>⭐ Personalized recommendations based on your taste</li>
              <li>💬 A community-driven platform for true coffee enthusiasts</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-[#331A15]">Our Mission</h2>
          <p className="text-[#1B1A1A] raleway">
            At Espresso Emporium, we believe coffee is more than just a drink —
            it’s an experience that connects people. Our mission is to bring
            coffee lovers and coffee businesses together, creating a thriving
            community where everyone can share their passion for coffee.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
