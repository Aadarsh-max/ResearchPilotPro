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
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PROFILE RESPONSE:", res.data);

        setUser(res.data);

        // Safely extract sessions
        if (res.data.researchSessions) {
          setSessions(res.data.researchSessions);
        } else {
          setSessions([]);
        }

      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC] relative overflow-hidden">

      <p className="text-[#5B2A86] font-medium animate-pulse">
        Loading Profile...
      </p>

    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]">

      <p className="text-red-500 font-medium">{error}</p>

    </div>
  );
}

return (
  <div className="min-h-screen bg-[#FAFAFC] px-6 md:px-16 py-16 relative overflow-hidden font-sans">

    {/* Background Glow */}
    <div className="absolute w-150 h-150 bg-[#8B6CCF]/15 rounded-full blur-3xl -top-55 -left-45"></div>
    <div className="absolute w-125 h-125 bg-[#0EA5A4]/10 rounded-full blur-3xl -bottom-62.5 -right-50"></div>

    <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl
    p-10 rounded-3xl border border-gray-100
    shadow-[0_20px_60px_rgba(0,0,0,0.06)]
    relative z-10 transition-all duration-500">

      {/* Profile Info */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-[#5B2A86] tracking-tight">
          {user?.name}
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          {user?.email}
        </p>
      </div>

      <hr className="border-gray-100 my-8" />

      {/* Saved Sessions Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-[#5B2A86]">
          Saved Research Sessions
        </h3>

        <span className="text-sm text-[#0EA5A4] font-medium">
          {sessions.length} saved
        </span>
      </div>

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No saved research yet. Start exploring topics!
        </p>
      ) : (
        <div className="space-y-4">

          {sessions.map((session) => (
            <div
              key={session._id}
              className="p-5 border border-gray-100 rounded-2xl
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
              hover:-translate-y-1 transition duration-300
              cursor-pointer bg-white"
            >

              <h4 className="font-semibold text-[#5B2A86] text-lg">
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