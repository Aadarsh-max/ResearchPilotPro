import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaFolderOpen,
  FaUser,
  FaChevronDown,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="flex justify-between items-center px-8 py-5
      bg-white/95 backdrop-blur-xl
      border-b border-gray-100
      shadow-[0_10px_40px_rgba(0,0,0,0.04)]
      sticky top-0 z-50"
    >
      {/* Logo */}
      <Link to="/" className="cursor-pointer">
        <h1
          className="text-2xl font-bold tracking-tight text-[#5B2A86]
          hover:opacity-80 transition duration-300 cursor-pointer"
        >
          Research Pilot 🚀
        </h1>
      </Link>

      {!token ? (
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="cursor-pointer flex items-center gap-2
            text-[#5B2A86] font-medium
            hover:text-[#0EA5A4]
            transition duration-300"
          >
            <FaSignInAlt size={14} />
            Login
          </Link>

          <Link
            to="/signup"
            className="cursor-pointer flex items-center gap-2
            bg-linear-to-r from-[#5B2A86] to-[#8B6CCF]
            text-white px-6 py-2.5 rounded-full font-semibold
            shadow-[0_10px_30px_rgba(91,42,134,0.2)]
            hover:scale-105 hover:shadow-[0_15px_35px_rgba(91,42,134,0.25)]
            transition duration-300"
          >
            <FaUserPlus size={14} />
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer flex items-center gap-2
            bg-[#5B2A86]/10 text-[#5B2A86]
            px-6 py-2.5 rounded-full font-medium
            hover:bg-[#5B2A86]/20 hover:text-[#3C255F]
            transition duration-300 backdrop-blur-md"
          >
            <FaUserCircle size={18} />
            Profile
            <FaChevronDown size={12} />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-4
              bg-white
              shadow-[0_25px_60px_rgba(0,0,0,0.08)]
              rounded-2xl w-52
              border border-gray-100
              overflow-hidden z-50"
            >
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="cursor-pointer flex items-center gap-3
                px-6 py-3 hover:bg-gray-50 transition duration-200"
              >
                <FaUser size={14} />
                My Profile
              </Link>

              <Link
                to="/workspace"
                onClick={() => setOpen(false)}
                className="cursor-pointer flex items-center gap-3
                px-6 py-3 hover:bg-gray-50 transition duration-200"
              >
                <FaFolderOpen size={14} />
                My Research
              </Link>

              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-3
                w-full text-left px-6 py-3
                hover:bg-red-50 text-red-500 transition duration-200"
              >
                <FaSignOutAlt size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
