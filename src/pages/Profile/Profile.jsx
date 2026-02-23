import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          "https://research-back-psi.vercel.app/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(res.data);

        if (res.data.researchSessions) {
          setSessions(res.data.researchSessions);
        } else {
          setSessions([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC] relative overflow-hidden px-4">
        <p className="text-[#5B2A86] text-sm sm:text-base font-medium animate-pulse text-center">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC] px-4">
        <p className="text-red-500 text-sm sm:text-base font-medium text-center">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#FAFAFC] 
    px-4 sm:px-6 md:px-12 lg:px-16 
    py-10 sm:py-12 md:py-16 
    relative overflow-hidden font-sans"
    >
      <div
        className="absolute 
      w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]
      bg-[#8B6CCF]/15 rounded-full blur-3xl 
      -top-32 sm:-top-40 md:-top-52 
      -left-24 sm:-left-32 md:-left-44"
      ></div>

      <div
        className="absolute 
      w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]
      bg-[#0EA5A4]/10 rounded-full blur-3xl 
      -bottom-32 sm:-bottom-40 md:-bottom-56 
      -right-20 sm:-right-32 md:-right-44"
      ></div>

      <div
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl
        p-5 sm:p-6 md:p-8 lg:p-10 
        rounded-2xl sm:rounded-3xl 
        border border-gray-100
        shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
        sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)]
        relative z-10 transition-all duration-500"
      >
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5B2A86] tracking-tight break-words">
            {user?.name}
          </h2>

          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg break-words">
            {user?.email}
          </p>
        </div>

        <hr className="border-gray-100 my-6 sm:my-8" />

        <div
          className="flex flex-col sm:flex-row 
        sm:justify-between sm:items-center 
        gap-2 sm:gap-4 mb-5 sm:mb-6"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#5B2A86]">
            Saved Research Sessions
          </h3>

          <span className="text-xs sm:text-sm text-[#0EA5A4] font-medium">
            {sessions.length} saved
          </span>
        </div>

        {sessions.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base text-center py-6 sm:py-8">
            No saved research yet. Start exploring topics!
          </p>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="p-4 sm:p-5 border border-gray-100 
                rounded-xl sm:rounded-2xl
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                hover:-translate-y-1 transition duration-300
                cursor-pointer bg-white"
              >
                <h4
                  className="font-semibold text-[#5B2A86] 
                text-sm sm:text-base md:text-lg break-words"
                >
                  {session.topic}
                </h4>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(session.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
