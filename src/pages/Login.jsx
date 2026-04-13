import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { Mail, Lock } from "lucide-react";

import loginAnimation from "../assets/lottie/login.json";
import SharedNav from "../shared/SharedNav";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    document.title = "Login | Espresso Emporium";
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please enter both email and password.",
        confirmButtonColor: "#451a03"
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `The perfect brew is being prepared for you.`,
        timer: 2000,
        showConfirmButton: false,
        background: '#fff',
        customClass: { popup: 'rounded-[2.5rem]' }
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: error.message,
        confirmButtonColor: "#451a03"
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
        title: "Google Sync Successful",
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: 'rounded-[1.5rem]' }
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sync Failed",
        text: error.message,
        confirmButtonColor: "#451a03"
      });
    }
  };

  return (
    <>
      <SharedNav />
      <div
        className="flex items-center justify-center min-h-screen px-4 py-8 md:py-12 bg-stone-50 font-georama"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"></div>

        <div className="relative flex flex-col w-full max-w-5xl overflow-hidden md:flex-row bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl animate-in fade-in zoom-in duration-700">
          {/* Left Panel: Hero */}
          <div className="flex flex-col items-center justify-center w-full p-8 md:p-12 md:w-5/12 bg-gradient-to-br from-amber-950 to-stone-900 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="text-center space-y-4 mb-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-amber-100">Welcome Back</h2>
              <p className="text-amber-100/60 font-medium text-xs md:text-sm tracking-widest uppercase leading-relaxed">
                The daily grind begins with excellence.
              </p>
            </div>
            
            <div className="w-full max-w-[200px] md:max-w-xs drop-shadow-2xl relative z-10">
              <Lottie
                animationData={loginAnimation}
                loop
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="w-full p-8 md:p-16 space-y-8 md:w-7/12 flex flex-col justify-center bg-white/50">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-amber-950 tracking-tight">Account Login</h1>
              <p className="text-amber-900/40 text-[10px] font-black uppercase tracking-[0.3em]">Credentials for Artisan Access</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <Input 
                  label="Email Address"
                  icon={Mail}
                  name="email"
                  type="email"
                  placeholder="artisan@espresso.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />

                <div className="relative group">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <Lock size={12} /> Password
                      </label>
                      <NavLink to="/forgot-password" size="sm" className="text-[9px] text-amber-700 font-bold uppercase tracking-widest hover:underline">
                        Forgot?
                      </NavLink>
                   </div>
                   <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-sm font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all pr-12"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-4 flex items-center text-amber-950/20 hover:text-amber-700 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                   </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-4"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Sign In to Emporium"}
              </Button>
            </form>

            <div className="relative py-2 flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-amber-900/10"></div>
              <span className="relative bg-[#faf9f6] px-4 text-[9px] font-black text-amber-900/20 uppercase tracking-[0.3em]">Or synchronize</span>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-amber-900/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-amber-950 hover:bg-amber-50 transition-all shadow-sm active:scale-95"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Login with Google</span>
            </button>

            <div className="flex flex-col items-center gap-4 pt-4">
                <p className="text-center text-xs font-bold text-amber-900/40">
                  New to our beans?{" "}
                  <NavLink
                    to="/register"
                    className="text-amber-700 hover:text-amber-900 underline underline-offset-4 decoration-2"
                  >
                    Create an account
                  </NavLink>
                </p>
                
                <NavLink to="/" className="inline-flex items-center gap-2 px-6 py-2 bg-amber-50 text-amber-900/60 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all active:scale-95">
                    ← Return to Home
                </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
