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
    <footer className="bg-[#f9f6f1] text-[#331A15] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

        <div>
          <img src="/more/logo1.png" alt="Espresso Emporium Logo" className="mb-4 w-20" />
          <h2 className="text-2xl font-bold mb-3">Espresso Emporium</h2>
          <p className="text-[#1B1A1A] mb-6 raleway">
            Always ready to be your friend ☕. Come & contact with us to share your
            memorable moments, to share with your best companion.
          </p>

    
          <div className="flex gap-4 mb-6 text-2xl">
            <a href="#" className="hover:text-amber-600 transition">
              <FiFacebook />
            </a>
            <a href="#" className="hover:text-amber-600 transition">
              <FiTwitter />
            </a>
            <a href="#" className="hover:text-amber-600 transition">
              <FiInstagram />
            </a>
            <a href="#" className="hover:text-amber-600 transition">
              <FiLinkedin />
            </a>
          </div>

         
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <div className="space-y-3 text-[#1B1A1A]">
            <div className="flex items-center gap-3">
              <FiPhone className="text-amber-700" />
              <p>+88 01533 333 333</p>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-amber-700" />
              <p>contact@espresso-emporium.com</p>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-amber-700" />
              <p>123 Coffee Lane, Coffeetown, CT 56789</p>
            </div>
          </div>
        </div>

   
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <textarea
              placeholder="Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-amber-300"
            ></textarea>
            <button
              type="submit"
              className="bg-[#331A15] text-white px-6 py-2 rounded-full hover:bg-amber-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

    
      <div
        className="bg-[#331A15] text-white text-center py-4 text-sm"
        style={{
          backgroundImage: "url('/more/15.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Copyright © {new Date().getFullYear()} Espresso Emporium | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
