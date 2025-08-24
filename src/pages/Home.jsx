import React, { useEffect } from "react";
import Banner from "../components/Banner";
import QualitySection from "../components/QualitySection";
import FollowUs from "../components/FollowUs";
import AllCoffee from "../components/AllCoffee";
import { Link } from "react-router-dom";
import QandA from "../components/QandA";
import Reviews from "../components/Reviews";

const Home = () => {
   useEffect(() => {
      document.title = "Espresso-Emporium";
    }, []);
  return (
    <div>
      <Banner />
      <QualitySection />

     <div className="bg-white"
     style={{
        backgroundImage: "url('/more/11.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <section className="py-12 "
      style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      
      >
        <h2 className="text-4xl font-bold text-center text-[#331A15] mb-8">
           Coffee Selection 
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Discover  finest selection of coffee. Here are some of  popular
          blends crafted with love and passion from different business.
        </p>

        {/* Show only 6 coffees */}
        <AllCoffee limit={2} />
      </section>
      
      <QandA></QandA>
      <Reviews></Reviews>
      <FollowUs />

     </div>

      
    </div>
  );
};

export default Home;
