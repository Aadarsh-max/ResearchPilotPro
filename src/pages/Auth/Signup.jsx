import React, { useState } from "react";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        { name, email, password },
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
relative overflow-hidden px-6"
    >
      {/* Animated Background Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-[#8B6CCF]/20 rounded-full blur-[120px] -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#6D4CA3]/20 rounded-full blur-[120px] bottom-[-200px] right-[-100px]"></div>

      {/* Glass Card */}
      <div
        className="w-full max-w-lg bg-white/95 backdrop-blur-2xl 
  border border-[#E9D8FF]/70 rounded-[32px]
  shadow-[0_40px_100px_rgba(60,37,95,0.35)]
  p-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold text-[#3C255F] tracking-tight">
            Create Account
          </h3>

          <p className="text-sm mt-3 text-[#4B2E73]/80 leading-relaxed">
            Join the AI research workspace and start intelligent exploration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="text-sm font-semibold text-[#3C255F]">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-5 py-4 rounded-2xl
          border border-[#E9D8FF]
          bg-white/80 backdrop-blur-md
          text-sm text-[#3C255F]
          outline-none
          focus:border-[#6D4CA3]
          focus:ring-2 focus:ring-[#8B6CCF]/30
          transition duration-300"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="text-sm font-semibold text-[#3C255F]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-5 py-4 rounded-2xl
          border border-[#E9D8FF]
          bg-white/80 backdrop-blur-md
          text-sm text-[#3C255F]
          outline-none
          focus:border-[#6D4CA3]
          focus:ring-2 focus:ring-[#8B6CCF]/30
          transition duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-[#3C255F]">
              Password
            </label>

            <div
              className="flex items-center mt-2 px-5 py-4 rounded-2xl
        border border-[#E9D8FF]
        bg-white/80 backdrop-blur-md
        focus-within:border-[#6D4CA3]
        focus-within:ring-2 focus-within:ring-[#8B6CCF]/30
        transition duration-300"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-[#3C255F]"
              />

              {showPassword ? (
                <FaRegEye
                  size={18}
                  className="text-[#6D4CA3] cursor-pointer hover:scale-110 transition"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  size={18}
                  className="text-[#6D4CA3]/60 cursor-pointer hover:scale-110 transition"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-3 py-4 rounded-2xl
        bg-gradient-to-r from-[#6D4CA3] to-[#8B6CCF]
        text-white font-semibold tracking-wide
        shadow-[0_20px_50px_rgba(109,76,163,0.45)]
        hover:scale-[1.03]
        active:scale-95
        transition duration-300 cursor-pointer"
          >
            SIGN UP
          </button>

          <p className="text-sm text-center text-[#4B2E73]/80 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#6D4CA3] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
