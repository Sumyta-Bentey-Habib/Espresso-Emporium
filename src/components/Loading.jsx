import React from "react";
import loadingAnimation from "../assets/lottie/loading.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="w-64 h-64" 
      />
    </div>
  );
};

export default Loading;
