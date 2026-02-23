import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaTrash } from "react-icons/fa";

const Workspace = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
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

        setSessions(res.data.researchSessions || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load workspace.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [navigate]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://research-back-psi.vercel.app/api/research/session/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSessions((prev) => prev.filter((session) => session._id !== deleteId));

      setDeleteId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete session.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-[#1E3A8A] text-sm sm:text-base font-medium text-center">
          Loading Workspace...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
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
    py-10 sm:py-14 md:py-16 
    relative overflow-hidden font-sans"
    >
      <div
        className="absolute 
      w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]
      bg-[#8B6CCF]/15 rounded-full blur-3xl 
      -top-32 sm:-top-40 md:-top-48 
      -left-24 sm:-left-32 md:-left-40"
      ></div>

      <div
        className="absolute 
      w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]
      bg-[#0EA5A4]/10 rounded-full blur-3xl 
      -bottom-32 sm:-bottom-40 md:-bottom-52 
      -right-20 sm:-right-32 md:-right-40"
      ></div>

      <div className="mb-10 sm:mb-14 md:mb-16 max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#5B2A86] tracking-tight">
          Your Research Workspace
        </h1>

        <p className="text-gray-600 mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Manage and revisit your saved research sessions.
        </p>

        <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#0EA5A4] mt-6 sm:mt-8 rounded-full mx-auto"></div>
      </div>

      <div className="mb-10 sm:mb-14 max-w-4xl mx-auto relative z-10">
        <div
          className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100
        shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center"
        >
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#5B2A86]">
            Total Saved Sessions
          </h2>

          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0EA5A4] mt-4 sm:mt-6">
            {sessions.length}
          </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div
          className="max-w-4xl mx-auto bg-white p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border border-gray-100
        shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center relative z-10"
        >
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
            You haven't saved any research yet.
          </p>

          <button
            onClick={() => navigate("/researchview")}
            className="cursor-pointer mt-8 sm:mt-10 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-linear-to-r from-[#5B2A86] to-[#8B6CCF]
            text-white rounded-lg sm:rounded-xl font-semibold shadow-md
            hover:scale-105 transition duration-300"
          >
            Start New Research
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto relative z-10">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-100
              shadow-[0_10px_30px_rgba(0,0,0,0.05)]
              hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#5B2A86] leading-snug break-words">
                {session.topic}
              </h3>

              <p className="text-xs text-gray-500 mt-2 sm:mt-3">
                {new Date(session.createdAt).toLocaleDateString()}
              </p>

              <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-3 sm:gap-4">
                <button
                  onClick={() =>
                    navigate(`/researchview?session=${session._id}`)
                  }
                  className="cursor-pointer flex items-center justify-center gap-2 flex-1 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm bg-linear-to-r
                  from-[#5B2A86] to-[#8B6CCF]
                  text-white rounded-lg sm:rounded-xl font-medium
                  shadow-md hover:scale-105 transition duration-300"
                >
                  <FaFolderOpen size={14} />
                  Open
                </button>

                <button
                  onClick={() => setDeleteId(session._id)}
                  className="cursor-pointer flex items-center justify-center gap-2 flex-1 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm border border-red-300
                  text-red-500 rounded-lg sm:rounded-xl hover:bg-red-50 hover:scale-105 transition duration-300"
                >
                  <FaTrash size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md text-center">
            <h3 className="text-base sm:text-lg font-semibold text-[#5B2A86]">
              Delete Session?
            </h3>

            <p className="text-gray-500 mt-3 text-xs sm:text-sm">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="cursor-pointer px-4 sm:px-5 py-2 text-sm border rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="cursor-pointer px-4 sm:px-5 py-2 text-sm bg-red-500 text-white rounded-lg 
                hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;
