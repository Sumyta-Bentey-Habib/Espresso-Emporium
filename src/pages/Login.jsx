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

      navigate("/dashboard");
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
      navigate("/dashboard");
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
        className="flex items-center justify-center min-h-screen px-4 py-8 md:py-12 bg-stone-50 font-inter"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        <div className="relative flex flex-col w-full max-w-5xl overflow-hidden md:flex-row bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-white/50 animate-in fade-in zoom-in duration-700">
          {}
          <div className="flex flex-col items-center justify-center w-full p-8 md:p-12 md:w-5/12 bg-gradient-to-br from-amber-900/90 to-stone-900/95 text-white">
            <div className="text-center space-y-3 md:space-y-4 mb-6 md:mb-8">
              <h2 className="text-3xl md:text-5xl font-outfit font-bold tracking-tight">Welcome Back</h2>
              <p className="text-amber-200/80 font-inter text-xs md:text-base tracking-wide leading-relaxed">
                The perfect brew is just one login away. Fresh beans, better mornings.
              </p>
            </div>
            <div className="w-full max-w-[200px] md:max-w-xs drop-shadow-2xl opacity-90 md:opacity-100">
              <Lottie
                animationData={loginAnimation}
                loop
                className="w-full h-auto scale-100 md:scale-110"
              />
            </div>
          </div>

          {}
          <div className="w-full p-6 md:p-14 space-y-6 md:space-y-8 md:w-7/12 flex flex-col justify-center">
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-2xl md:text-4xl font-outfit font-black text-stone-900 tracking-tight">
                Account Login
              </h1>
              <p className="text-stone-500 font-inter text-xs md:text-sm">Enter your credentials to access your coffee paradise.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {}
                <div className="group">
                  <label htmlFor="email" className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-amber-700 transition-colors">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="enthusiast@espresso.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-stone-100/50 border border-stone-200 rounded-2xl text-stone-900 font-inter focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/50 focus:bg-white transition-all duration-300 placeholder:text-stone-400"
                      disabled={loading}
                    />
                  </div>
                </div>

                {}
                <div className="group">
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label htmlFor="password" className="block text-xs font-bold text-stone-500 uppercase tracking-widest group-focus-within:text-amber-700 transition-colors">
                      Password
                    </label>
                    <a href="#" className="text-[11px] font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider underline-offset-4 hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-stone-100/50 border border-stone-200 rounded-2xl text-stone-900 font-inter focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/50 focus:bg-white transition-all duration-300 placeholder:text-stone-400 pr-12"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-4 flex items-center text-stone-400 hover:text-amber-700 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-2xl bg-stone-900 py-4 font-outfit font-bold text-white shadow-xl transition-all duration-300 hover:bg-black hover:shadow-stone-900/20 active:scale-[0.98] disabled:opacity-70"
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Authenticating...
                    </>
                  ) : (
                    "Sign In to Emporium"
                  )}
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-4 text-stone-400 font-bold tracking-widest backdrop-blur-sm">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full group flex items-center justify-center gap-3 px-5 py-4 bg-white border-2 border-stone-100 rounded-2xl font-inter font-bold text-stone-700 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300 shadow-sm"
            >
              <FcGoogle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Login with Google</span>
            </button>

            <p className="text-center font-inter text-sm text-stone-500">
              New to our beans?{" "}
              <NavLink
                to="/register"
                className="font-bold text-amber-700 hover:text-amber-800 underline-offset-4 hover:underline transition-all"
              >
                Create an account
              </NavLink>
            </p>
            
            <div className="pt-2 flex justify-center">
              <NavLink to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs font-bold transition-colors">
                <span>← Return to Home</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
