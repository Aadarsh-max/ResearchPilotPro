import React, { useState } from "react";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { validateEmail } from "../../utils/helper";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
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
px-4 relative overflow-hidden"
    >
      {/* Soft Animated Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#8B6CCF]/20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-softPulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#6D4CA3]/20 rounded-full blur-3xl bottom-[-120px] right-[-120px] animate-softPulse"></div>

      <div
        className="bg-white/85 backdrop-blur-xl w-full max-w-md rounded-3xl 
  shadow-[0_30px_70px_rgba(109,76,163,0.35)] 
  border border-[#E9D8FF]
  p-10 animate-fadeScale relative z-10 transition-all duration-500"
      >
        <h3 className="text-3xl font-bold text-[#3C255F]">Welcome Back</h3>

        <p className="text-sm text-[#4B2E73]/80 mt-3 mb-8">
          Login to save your research history and workspace.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-[#3C255F] font-medium">
              Email Address
            </label>

            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border border-[#E9D8FF] rounded-xl px-4 py-3 text-sm 
          outline-none bg-white/70 backdrop-blur-md
          focus:border-[#6D4CA3] focus:ring-2 focus:ring-[#8B6CCF]/30
          transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-[#3C255F] font-medium">
              Password
            </label>

            <div
              className="flex items-center border border-[#E9D8FF] rounded-xl px-4 py-3 mt-2 
        bg-white/70 backdrop-blur-md
        focus-within:border-[#6D4CA3] focus-within:ring-2 focus-within:ring-[#8B6CCF]/30
        transition-all duration-300"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
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

          {error && (
            <p className="text-red-500 text-xs animate-fadeIn">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6D4CA3] to-[#8B6CCF] 
        text-white py-3 rounded-xl font-semibold 
        shadow-[0_15px_35px_rgba(109,76,163,0.4)]
        hover:shadow-[0_25px_55px_rgba(139,108,207,0.5)]
        hover:scale-105 active:scale-95
        transition-all duration-300 cursor-pointer"
          >
            LOGIN
          </button>

          <p className="text-sm text-[#4B2E73]/80 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#6D4CA3] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
