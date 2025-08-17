import React from "react";
import SharedNav from "../shared/SharedNav";
import { NavLink } from "react-router";
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const ContactUs = () => {
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
            Contact <span className="text-[#331A15]">Us</span>
          </h1>
          <p className="text-[#1B1A1A] raleway text-lg">
            We'd love to hear from you! Reach out with any questions, feedback,
            or partnership inquiries.
          </p>
          <NavLink
            to="/"
            title="Click here to go back home"
            className="text-[#331A15] raleway underline mt-2 inline-block hover:text-amber-700 transition"
          >
            ← Back to Home
          </NavLink>
        </div>

        {/* Form and Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#331A15]">
              Send us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-[#1B1A1A] raleway mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div>
                <label className="block text-[#1B1A1A] raleway mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div>
                <label className="block text-[#1B1A1A] raleway mb-1">Message</label>
                <textarea
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-amber-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right - Contact Info with Icons */}
          <div className="flex flex-col justify-center gap-6 text-[#1B1A1A] raleway">
            <div className="flex items-center gap-3">
              <FiMapPin className="text-[#331A15] text-xl" />
              <div>
                <h2 className="text-2xl font-semibold mb-1 text-[#331A15]">Our Office</h2>
                <p>123 Coffee Lane, Coffeetown, CT 56789</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-[#331A15] text-xl" />
              <div>
                <h2 className="text-2xl font-semibold mb-1 text-[#331A15]">Email</h2>
                <p>contact@espresso-emporium.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="text-[#331A15] text-xl" />
              <div>
                <h2 className="text-2xl font-semibold mb-1 text-[#331A15]">Phone</h2>
                <p>+1 234 567 890</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiFacebook className="text-[#331A15] text-xl" />
              <FiInstagram className="text-[#331A15] text-xl" />
              <FiTwitter className="text-[#331A15] text-xl" />
              <div>
                <h2 className="text-2xl font-semibold mb-1 text-[#331A15]">Follow Us</h2>
                <p>Facebook | Instagram | Twitter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
