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
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSessions(res.data.researchSessions || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load workspace."
        );
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
        `http://localhost:8000/api/research/session/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessions((prev) =>
        prev.filter((session) => session._id !== deleteId)
      );

      setDeleteId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete session.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#1E3A8A] font-medium">Loading Workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] px-6 md:px-16 py-16 relative overflow-hidden font-sans">

      {/* Background Glow */}
      <div className="absolute w-150 h-150 bg-[#8B6CCF]/15 rounded-full blur-3xl -top-50 -left-50"></div>
      <div className="absolute w-125 h-125 bg-[#0EA5A4]/10 rounded-full blur-3xl -bottom-55 -right-45"></div>

      {/* Header */}
      <div className="mb-16 max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-5xl font-bold text-[#5B2A86] tracking-tight">
          Your Research Workspace
        </h1>

        <p className="text-gray-600 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
          Manage and revisit your saved research sessions.
        </p>

        <div className="h-1 w-24 bg-[#0EA5A4] mt-8 rounded-full mx-auto"></div>
      </div>

      {/* Stats Card */}
      <div className="mb-14 max-w-4xl mx-auto relative z-10">
        <div className="bg-white p-10 rounded-3xl border border-gray-100
        shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center">

          <h2 className="text-xl font-semibold text-[#5B2A86]">
            Total Saved Sessions
          </h2>

          <p className="text-5xl font-bold text-[#0EA5A4] mt-6">
            {sessions.length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {sessions.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white p-14 rounded-3xl border border-gray-100
        shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center relative z-10">

          <p className="text-gray-500 text-lg">
            You haven't saved any research yet.
          </p>

          <button
            onClick={() => navigate("/researchview")}
            className="cursor-pointer mt-10 px-8 py-3 bg-linear-to-r from-[#5B2A86] to-[#8B6CCF]
            text-white rounded-xl font-semibold shadow-md
            hover:scale-105 transition duration-300"
          >
            Start New Research
          </button>

        </div>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">

          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white p-8 rounded-3xl border border-gray-100
              shadow-[0_15px_45px_rgba(0,0,0,0.06)]
              hover:-translate-y-1 transition duration-300"
            >

              <h3 className="text-xl font-semibold text-[#5B2A86] leading-snug">
                {session.topic}
              </h3>

              <p className="text-xs text-gray-500 mt-3">
                {new Date(session.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between mt-8 gap-4">

                {/* Open Button */}
                <button
                  onClick={() =>
                    navigate(`/researchview?session=${session._id}`)
                  }
                  className="cursor-pointer flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm bg-linear-to-r
                  from-[#5B2A86] to-[#8B6CCF]
                  text-white rounded-xl font-medium
                  shadow-md hover:scale-105 transition duration-300"
                >
                  <FaFolderOpen size={14} />
                  Open
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteId(session._id)}
                  className="cursor-pointer flex items-center justify-center gap-2 flex-1 px-5 py-3 text-sm border border-red-300
                  text-red-500 rounded-xl hover:bg-red-50 hover:scale-105 transition duration-300"
                >
                  <FaTrash size={14} />
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-100 text-center">

            <h3 className="text-lg font-semibold text-[#5B2A86]">
              Delete Session?
            </h3>

            <p className="text-gray-500 mt-3 text-sm">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="cursor-pointer px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="cursor-pointer px-5 py-2 bg-red-500 text-white rounded-lg 
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