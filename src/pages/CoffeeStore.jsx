import React, { useEffect } from "react";
import SharedNav from "../shared/SharedNav";
import AllCoffee from "../components/AllCoffee";

const CoffeeStore = () => {
  useEffect(() => {
    document.title = "Coffee Store";
  }, []);
  return (
    <>
      <SharedNav />
      <AllCoffee />
    </>
  );
};

export default CoffeeStore;
