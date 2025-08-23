import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; 

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
  });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(""); 

  useEffect(() => {
    document.title = "Register";
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUpper && hasLower && hasLength;
  };

  // Save user in MongoDB
  const saveUserToDB = async (user) => {
    try {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // Email/Password registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    if (!role) {
      Swal.fire("Error", "Please select a role first.", "error");
      return;
    }

    if (!name || !email || !password) {
      Swal.fire("Error", "Please fill out all required fields.", "error");
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters and include uppercase and lowercase letters.",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || "",
      });

      // Save user in DB
      await saveUserToDB({ name, email, photoURL, role });

      Swal.fire("Success", `Registration completed as ${role}!`, "success");

      setFormData({ name: "", email: "", password: "", photoURL: "" });
      setRole("");
      navigate("/");
    } catch (error) {
      Swal.fire("Registration Failed", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Google registration
  const handleGoogleRegister = async () => {
    if (!role) {
      Swal.fire("Error", "Please select a role first.", "error");
      return;
    }

    try {
      const result = await googleLogin();

      const saveUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role,
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
      Swal.fire({
        icon: "error",
        title: "Google Registration Failed",
        text: error.message,
      });
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
          <Lottie
            animationData={registrationAnimation}
            loop={true}
            className="w-full max-w-sm md:max-w-md"
          />
        </div>

        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl md:w-1/2 rounded-2xl">
          <h1 className="text-3xl font-bold text-center text-black">Register</h1>

          {/* Role Selection */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => setRole("Buyer")}
              className={`px-4 py-2 rounded-lg font-semibold border ${
                role === "Buyer"
                  ? "bg-violet-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setRole("Seller")}
              className={`px-4 py-2 rounded-lg font-semibold border ${
                role === "Seller"
                  ? "bg-violet-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Seller
            </button>
          </div>

          {/* Show Register Form only after role selection */}
          {role && (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-black raleway">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-black raleway">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-black raleway">
                    Profile Picture URL (optional)
                  </label>
                  <input
                    type="text"
                    name="photoURL"
                    placeholder="Photo URL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-black raleway">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className=" raleway w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
                    required
                  />
                  <p className="mt-1 text-xs text-black raleway ">
                    Must be at least 6 characters, with uppercase and lowercase
                    letters.
                  </p>
                </div>

                <button
                  type="submit"
                  className="raleway w-full py-2 font-semibold text-white rounded-lg bg-violet-500 hover:bg-violet-600"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              {/* Google Registration (only for Buyer) */}
              {role === "Buyer" && (
                <button
                  onClick={handleGoogleRegister}
                  className="w-full bg-[#331A15] hover:bg-amber-700 text-white py-3 rounded-md transition flex items-center justify-center gap-2 raleway"
                >
                  <FcGoogle className="w-5 h-5" />
                  Continue with Google
                </button>
              )}
            </>
          )}

          <p className="text-sm text-center text-black raleway">
            Already have an account?
            <NavLink
              to="/login"
              className="ml-1 text-violet-600 hover:underline raleway"
            >
              Login
            </NavLink>
            <br />
            <NavLink
              to="/"
              className="ml-1 text-violet-600 hover:underline raleway"
            >
              Return Home
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
