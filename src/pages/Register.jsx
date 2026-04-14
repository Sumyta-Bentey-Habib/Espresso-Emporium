import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { User, Mail, Lock, MapPin, Camera } from "lucide-react";
import { uploadImageToImgBB, API_URL } from "../utils/utils";
import registrationAnimation from "../assets/lottie/register.json";
import SharedNav from "../shared/SharedNav";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Register = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
    location: "",
  });
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    document.title = "Register | Espresso Emporium";
    if (profileFile) {
      const objectUrl = URL.createObjectURL(profileFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else setPreview(null);
  }, [profileFile]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setProfileFile(e.target.files[0]);
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUpper && hasLower && hasLength;
  };

  const saveUserToDB = async (user) => {
    try {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, location } = formData;

    if (!role) {
        return Swal.fire({
            icon: "warning",
            title: "Role Required",
            text: "Please select whether you're a Lover or a Merchant.",
            confirmButtonColor: "#451a03"
        });
    }
    
    if (!name || !email || !password) {
        return Swal.fire({
            icon: "error",
            title: "Required Fields",
            text: "Please fill out all mandatory fields.",
            confirmButtonColor: "#451a03"
        });
    }

    if (!validatePassword(password)) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters with upper & lowercase letters.",
        confirmButtonColor: "#451a03"
      });
    }

    setLoading(true);
    try {
      let uploadedURL = formData.photoURL;
      if (profileFile) {
        uploadedURL = await uploadImageToImgBB(profileFile);
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name, photoURL: uploadedURL || "" });

      await saveUserToDB({
        uid: result.user.uid,
        name,
        email,
        photoURL: uploadedURL,
        role,
        location: role === "Seller" ? location : "",
      });

      Swal.fire({
        icon: "success",
        title: "Welcome to the Emporium!",
        text: `Registration completed as ${role}.`,
        confirmButtonColor: "#451a03",
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-[2.5rem]' }
      });

      setFormData({ name: "", email: "", password: "", photoURL: "", location: "" });
      setRole("");
      setProfileFile(null);
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        confirmButtonColor: "#451a03"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (!role) {
        return Swal.fire({
            icon: "warning",
            title: "Select Role",
            text: "Please select your role before using Google signup.",
            confirmButtonColor: "#451a03"
        });
    }
    try {
      const result = await googleLogin();
      const saveUser = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role,
        location: role === "Seller" ? formData.location : "",
      };
      await saveUserToDB(saveUser);

      Swal.fire({
        icon: "success",
        title: "Sync Successful",
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: 'rounded-[1.5rem]' }
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Google Sync Failed", text: error.message, confirmButtonColor: "#451a03" });
    }
  };

  return (
    <>
      <SharedNav />
      <div
        className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-stone-50 font-georama"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] z-0"></div>

        <Card
          className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl overflow-hidden bg-white/90 backdrop-blur-2xl animate-in fade-in zoom-in duration-700"
          padding="p-0"
          rounded="rounded-[3rem]"
        >
          {/* Left Panel: Branding */}
          <div className="flex flex-col items-center justify-center w-full p-8 md:p-16 md:w-5/12 bg-gradient-to-br from-amber-950 to-stone-900 text-white relative">
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="text-center space-y-4 mb-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-amber-100">Join the Craft</h2>
              <p className="text-amber-100/60 font-medium text-xs md:text-sm tracking-widest uppercase leading-relaxed max-w-xs mx-auto">
                Become part of our exclusive community.
              </p>
            </div>
            <div className="w-full max-w-[180px] md:max-w-xs drop-shadow-2xl relative z-10 opacity-90 transition-transform hover:scale-105 duration-700">
              <Lottie animationData={registrationAnimation} loop className="w-full" />
            </div>
          </div>

          {/* Right Panel: Form Content */}
          <div className="w-full p-8 md:p-16 space-y-10 md:w-7/12 overflow-y-auto max-h-[none] md:max-h-[95vh] custom-scrollbar bg-white/40">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-amber-950 tracking-tight">Create Account</h1>
              <p className="text-amber-900/40 text-[10px] font-black uppercase tracking-[0.3em]">Ignite your passion for excellence</p>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
              <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">Select Identity</label>
              <div className="flex gap-4">
                {[
                    { val: "Buyer", label: "Artisan Lover", icon: "☕" },
                    { val: "Seller", label: "Merchant", icon: "🏪" }
                ].map((r) => (
                  <button
                    key={r.val}
                    type="button"
                    onClick={() => setRole(r.val)}
                    className={`flex-1 px-6 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all duration-500 shadow-sm ${
                      role === r.val 
                        ? "bg-amber-950 text-white border-amber-950 shadow-xl shadow-amber-950/20 scale-[1.02]" 
                        : "bg-white text-amber-900/60 border-amber-900/5 hover:border-amber-900/20 hover:bg-amber-50"
                    }`}
                  >
                    <span className="block text-2xl mb-1">{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {role && (
              <div className="animate-in fade-in slide-in-from-top-6 duration-700">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Full Name"
                      icon={User}
                      name="name"
                      placeholder="Espresso Enthusiast"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <Input 
                      label="Email Address"
                      icon={Mail}
                      name="email"
                      type="email"
                      placeholder="enthusiast@espresso.com"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <Input 
                      label="Security Secret"
                      icon={Lock}
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    {role === "Seller" && (
                      <div className="animate-in zoom-in-95 duration-500">
                         <Input 
                           label="Merchant Hub"
                           icon={MapPin}
                           name="location"
                           placeholder="City, Country"
                           value={formData.location}
                           onChange={handleChange}
                         />
                      </div>
                    )}
                  </div>

                  {/* Profile Photo Upload */}
                  <div className="space-y-4">
                    <label className="text-[9px] text-amber-900/40 font-black uppercase tracking-[0.2em] ml-1">Profile Identity Image</label>
                    <div className="flex items-center gap-8 p-8 bg-amber-50/50 border-2 border-dashed border-amber-900/10 rounded-[2.5rem] hover:border-amber-900/30 transition-all group/upload relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/upload:opacity-100 transition-opacity pointer-events-none"></div>
                      
                      <div className="relative w-24 h-24 shrink-0 group/img transition-transform hover:scale-110 duration-500">
                        {preview ? (
                          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[1.5rem] shadow-xl border-2 border-white ring-4 ring-amber-950/5" />
                        ) : (
                          <div className="w-full h-full bg-white rounded-[1.5rem] flex items-center justify-center text-amber-950/20 shadow-inner group-hover/upload:text-amber-700 transition-colors">
                            <Camera size={32} />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        />
                      </div>
                      
                      <div className="flex flex-col relative z-10">
                        <span className="text-xs font-black text-amber-950 uppercase tracking-widest mb-1">Upload Portrait</span>
                        <span className="text-[10px] text-amber-900/40 font-bold uppercase tracking-tighter">JPG, PNG or WEBP (Max 2MB)</span>
                        <div className="mt-3 flex items-center gap-2 group/btn">
                             <span className="text-[9px] bg-amber-950 text-white px-3 py-1 rounded-lg font-black uppercase transition-all group-hover/upload:bg-black">Choose File</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-5 text-sm"
                    disabled={loading}
                    variant={loading ? "ghost" : "primary"}
                  >
                    {loading ? "Initializing Artisan Identity..." : `Establish Account as ${role}`}
                  </Button>
                </form>

                {role === "Buyer" && (
                  <div className="mt-8 space-y-6">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-full h-[1px] bg-amber-900/10"></div>
                      <span className="relative bg-[#faf9f6]/80 px-4 text-[9px] font-black text-amber-900/20 uppercase tracking-[0.3em]">Or quick establish</span>
                    </div>
                    
                    <button
                      onClick={handleGoogleRegister}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-amber-900/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-amber-950 hover:bg-amber-50 transition-all shadow-sm active:scale-95"
                    >
                      <FcGoogle className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span>Synchronize with Google</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="pt-8 border-t border-amber-900/10 flex flex-col items-center gap-6">
              <p className="text-center text-xs font-bold text-amber-900/40">
                Already part of the legacy?{" "}
                <NavLink to="/login" className="text-amber-700 font-black hover:text-amber-950 underline underline-offset-4 decoration-2">
                  Sign in here
                </NavLink>
              </p>
              
              <NavLink to="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-50 text-amber-900/60 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all active:scale-95 shadow-sm">
                  <span>← Back to the Shop</span>
              </NavLink>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
