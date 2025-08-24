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
    const { name, email, password, photoURL } = formData;

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
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || "",
      });

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

  const handleGoogleRegister = async () => {
    if (!role) return Swal.fire("Error", "Please select a role first.", "error");

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
          <h1 className="text-3xl font-bold text-center text-gray-900">Register</h1>

          {/* Role Selection */}
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
                {[
                  { label: "Name", name: "name", type: "text", required: true },
                  { label: "Email", name: "email", type: "email", required: true },
                  {
                    label: "Profile Picture URL (optional)",
                    name: "photoURL",
                    type: "text",
                    required: false,
                  },
                  { label: "Password", name: "password", type: "password", required: true },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-gray-900">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      required={field.required}
                    />
                    {field.name === "password" && (
                      <p className="mt-1 text-xs text-gray-700">
                        Must be at least 6 characters, with uppercase and lowercase letters.
                      </p>
                    )}
                  </div>
                ))}

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
                  className="w-full bg-gray-900 hover:bg-amber-700 text-white py-3 rounded-md transition flex items-center justify-center gap-2"
                >
                  <FcGoogle className="w-5 h-5" />
                  Continue with Google
                </button>
              )}
            </>
          )}

          <p className="text-sm text-center text-gray-900">
            Already have an account?
            <NavLink to="/login" className="ml-1 text-violet-600 hover:underline">
              Login
            </NavLink>
            <br />
            <NavLink to="/" className="ml-1 text-violet-600 hover:underline">
              Return Home
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
