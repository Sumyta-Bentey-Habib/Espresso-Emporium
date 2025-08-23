import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import errorAnimation from "../assets/lottie/404.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "Error";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <Player
        autoplay
        loop
        src={errorAnimation}
        style={{ height: "300px", width: "300px" }}
      />

      <h1 className="mt-6 text-4xl font-bold text-gray-800">
        Oops! Page not found
      </h1>
      <p className="max-w-md mt-2 text-center text-gray-600">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 mt-6 text-lg font-semibold text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;