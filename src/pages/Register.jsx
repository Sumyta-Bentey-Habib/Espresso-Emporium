import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { uploadImageToImgBB, API_URL } from "../utils/utils";
import registrationAnimation from "../assets/lottie/register.json";
import SharedNav from "../shared/SharedNav";

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
    document.title = "Register";
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

    if (!role) return Swal.fire("Error", "Please select a role first.", "error");
    if (!name || !email || !password)
      return Swal.fire("Error", "Please fill out all required fields.", "error");
    if (!validatePassword(password))
      return Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters and include uppercase and lowercase letters.",
        "error"
      );

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

      Swal.fire("Success", `Registration completed as ${role}!`, "success");
      setFormData({ name: "", email: "", password: "", photoURL: "", location: "" });
      setRole("");
      setProfileFile(null);
      navigate("/");
    } catch (error) {
      Swal.fire("Registration Failed", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (!role) return Swal.fire("Error", "Please select a role first.", "error");
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
        title: "Google Registration Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Google Registration Failed", text: error.message });
    }
  };

  return (
    <>
      <SharedNav />
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 py-12 md:flex-row bg-stone-50 font-inter"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

        <div className="relative flex flex-col md:flex-row w-full max-w-6xl bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-[3rem] shadow-2xl overflow-hidden border border-white/40 animate-in fade-in zoom-in duration-700">
          {}
          <div className="flex flex-col items-center justify-center w-full p-8 md:p-16 md:w-5/12 bg-gradient-to-br from-stone-900 to-amber-950 text-white">
            <div className="text-center space-y-3 md:space-y-4 mb-6 md:mb-10">
              <h2 className="text-3xl md:text-5xl font-outfit font-bold tracking-tight">Join the Craft</h2>
              <p className="text-amber-200/70 font-inter text-xs md:text-base leading-relaxed max-w-xs mx-auto">
                Become part of our exclusive coffee community. Whether you brew it or buy it, we have a seat for you.
              </p>
            </div>
            <div className="w-full max-w-[180px] md:max-w-xs drop-shadow-3xl transform hover:scale-105 transition-transform duration-500 opacity-90 md:opacity-100">
              <Lottie animationData={registrationAnimation} loop className="w-full" />
            </div>
          </div>

          {}
          <div className="w-full p-6 md:p-14 space-y-6 md:space-y-8 md:w-7/12 overflow-y-auto max-h-[none] md:max-h-[90vh] custom-scrollbar">
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-2xl md:text-4xl font-outfit font-black text-stone-900 tracking-tight">Create Account</h1>
              <p className="text-stone-500 text-xs md:text-sm">Fill in the details to start your journey with Espresso Emporium.</p>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Select Your Role</label>
              <div className="flex gap-3">
                {["Buyer", "Seller"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 px-6 py-4 rounded-2xl font-outfit font-bold text-sm border-2 transition-all duration-300 ${
                      role === r 
                        ? "bg-stone-900 text-white border-stone-900 shadow-xl shadow-stone-900/20 scale-[1.02]" 
                        : "bg-white text-stone-600 border-stone-100 hover:border-amber-200 hover:bg-amber-50/30"
                    }`}
                  >
                    {r === "Buyer" ? "☕ Coffee Lover" : "🏪 Coffee Merchant"}
                  </button>
                ))}
              </div>
            </div>

            {role && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Espresso Enthusiast"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 bg-stone-100/50 border border-stone-200 rounded-2xl text-stone-900 font-inter focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/50 focus:bg-white transition-all"
                      />
                    </div>

                    {}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="enthusiast@espresso.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 bg-stone-100/50 border border-stone-200 rounded-2xl text-stone-900 font-inter focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/50 focus:bg-white transition-all"
                      />
                    </div>

                    {}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 bg-stone-100/50 border border-stone-200 rounded-2xl text-stone-900 font-inter focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/50 focus:bg-white transition-all"
                      />
                    </div>

                    {}
                    {role === "Seller" && (
                      <div className="space-y-2 animate-in zoom-in-95 duration-300">
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Shop Location</label>
                        <input
                          type="text"
                          name="location"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-3.5 bg-stone-100/50 border border-stone-200 rounded-2xl text-stone-900 font-inter focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/50 focus:bg-white transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {}
                  <div className="space-y-4 pt-2">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">Profile Photo</label>
                    <div className="flex items-center gap-6 p-6 bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] hover:border-amber-300/50 transition-colors group">
                      <div className="relative w-20 h-20 shrink-0">
                        {preview ? (
                          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-lg shadow-stone-900/10" />
                        ) : (
                          <div className="w-full h-full bg-stone-200 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-amber-100 transition-colors">
                            <span className="text-2xl">📸</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-stone-700">Choose an image</span>
                        <span className="text-xs text-stone-400">JPG, PNG or WEBP (Max 2MB)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-[1.5rem] bg-stone-900 py-4.5 font-outfit font-bold text-white shadow-xl transition-all duration-300 hover:bg-black hover:shadow-stone-900/20 active:scale-[0.98] disabled:opacity-70"
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Account...
                        </>
                      ) : (
                        `Register as ${role}`
                      )}
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </form>

                {role === "Buyer" && (
                  <div className="mt-6 space-y-4">
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-stone-100"></div>
                      <span className="mx-4 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Quick Sign Up</span>
                      <div className="flex-grow border-t border-stone-100"></div>
                    </div>
                    <button
                      onClick={handleGoogleRegister}
                      className="w-full group flex items-center justify-center gap-3 px-5 py-4 bg-white border-2 border-stone-100 rounded-2xl font-inter font-bold text-stone-700 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300 shadow-sm"
                    >
                      <FcGoogle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span>Continue with Google</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-stone-100">
              <p className="text-center font-inter text-sm text-stone-500">
                Already have an account?{" "}
                <NavLink to="/login" className="font-bold text-amber-700 hover:text-amber-800 underline-offset-4 hover:underline transition-all">
                  Sign in here
                </NavLink>
              </p>
              
              <div className="mt-6 flex justify-center">
                <NavLink to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs font-bold transition-colors">
                  <span>← Back to Shop</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
