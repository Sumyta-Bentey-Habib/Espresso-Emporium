import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../components/Loading"; 

const HomeLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
