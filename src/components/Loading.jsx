import React from 'react';
import loadingAnimation from "../assets/lottie/loading.json";
import Lottie from 'lottie-react';
const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full p-6 md:w-1/2">
         <Lottie animationData={loadingAnimation}
         loop={true}   
         className="w-full h-80"
         ></Lottie> 
        </div>
    );
};

export default Loading;