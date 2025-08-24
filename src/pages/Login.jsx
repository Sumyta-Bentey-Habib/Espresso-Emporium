import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

import loginAnimation from "../assets/lottie/login.json";
import SharedNav from "../shared/SharedNav";

const Login = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire("Error", "Please enter email and password.", "error");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome, ${email}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Google Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <>
      <SharedNav />
      <div
        className="flex items-center justify-center min-h-screen px-4 bg-gray-50"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col w-full max-w-4xl overflow-hidden md:flex-row">
          {/* Lottie Animation */}
          <div className="flex items-center justify-center w-full p-6 md:w-1/2">
            <Lottie
              animationData={loginAnimation}
              loop
              className="w-full h-80"
            />
          </div>

          {/* Login Form */}
          <div className="w-full p-8 space-y-6 md:w-1/2 bg-white shadow-xl rounded-2xl">
            <h1 className="text-3xl font-bold text-center text-gray-900">
              Login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  disabled={loading}
                  style={{
                    backgroundColor: "white",
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    WebkitTextFillColor: "#1f2937",
                    transitionDelay: "9999s",
                  }}
                />
              </div>

              {/* Password with visibility toggle */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 pr-10"
                    disabled={loading}
                    style={{
                      backgroundColor: "white",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "#1f2937",
                      transitionDelay: "9999s",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex justify-end mt-1 text-xs text-gray-600">
                  <a href="#" className="hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 font-semibold text-white rounded-lg bg-violet-500 hover:bg-violet-600 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-gray-900 hover:bg-amber-700 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>

            {/* Links */}
            <p className="text-sm text-center text-gray-900">
              Don’t have an account?
              <NavLink
                to="/register"
                className="ml-1 text-violet-600 hover:underline"
              >
                Sign up
              </NavLink>
              <br />
              <NavLink to="/" className="ml-1 text-violet-600 hover:underline">
                Go Home
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
