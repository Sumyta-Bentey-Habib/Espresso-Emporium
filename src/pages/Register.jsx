import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { uploadImageToImgBB } from "../utils/utils";
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
      await fetch("https://espresso-emporium-server-phi.vercel.app/users", {
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
        className="flex flex-col items-center justify-center min-h-screen px-4 py-10 md:flex-row bg-white"
        style={{
          backgroundImage: "url('/more/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center w-full mb-10 md:w-1/2 md:mb-0">
          <Lottie animationData={registrationAnimation} loop className="w-full max-w-sm md:max-w-md" />
        </div>

        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl md:w-1/2 rounded-2xl">
          <h1 className="text-3xl font-bold text-center text-black">Register</h1>

          <div className="flex justify-center gap-4 mb-4">
            {["Buyer", "Seller"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-lg font-semibold border ${
                  role === r ? "bg-violet-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {role && (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-black">Full Name / Business Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name or business name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-black">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-black">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>

                {/* Location - only for Sellers */}
                {role === "Seller" && (
                  <div>
                    <label className="block mb-1 text-sm font-medium text-black">Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter your shop location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>
                )}

                {/* Profile Picture */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-black">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                  {preview && (
                    <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-full mx-auto mt-2" />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-white rounded-lg bg-violet-500 hover:bg-violet-600"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              {role === "Buyer" && (
                <button
                  onClick={handleGoogleRegister}
                  className="w-full bg-gray-900 hover:bg-amber-700 text-white py-3 rounded-md flex items-center justify-center gap-2 mt-2"
                >
                  <FcGoogle className="w-5 h-5" /> Continue with Google
                </button>
              )}
            </>
          )}

          <p className="text-sm text-center text-black mt-4">
            Already have an account?
            <NavLink to="/login" className="ml-1 text-black hover:underline">
              Login
            </NavLink>
            <br />
            <NavLink to="/" className="ml-1 text-black hover:underline">
              Return Home
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
