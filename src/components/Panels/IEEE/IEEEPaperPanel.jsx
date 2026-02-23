import React, { useState } from "react";
import axios from "axios";
import Loader from "../../Loader/Loader";

const IEEEPaperPanel = ({ researchData, setResearchData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateIEEE = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://research-back-psi.vercel.app/api/research/generate-ieee/${researchData.sessionId}`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      setResearchData((prev) => ({
        ...prev,
        ieeePaper: response.data.ieeePaper,
      }));
    } catch (err) {
      setError("Failed to generate IEEE paper.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    window.open(
      `https://research-back-psi.vercel.app/api/research/${researchData.sessionId}/export-pdf`,
      "_blank",
    );
  };

  if (!researchData?.sessionId) {
    return (
      <p className="text-gray-500 text-sm sm:text-base px-4">
        Search a topic first.
      </p>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12 px-4 sm:px-6 md:px-0">
      <div className="max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5B2A86] tracking-tight mb-3 sm:mb-4">
          IEEE Style Research Paper
        </h2>
        <div className="h-1 w-16 sm:w-20 bg-[#0EA5A4] rounded-full"></div>
      </div>

      {!researchData.ieeePaper && !loading && (
        <div
          className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 
          rounded-2xl sm:rounded-3xl border border-gray-100
          shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
          sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)] 
          text-center max-w-4xl mx-auto"
        >
          <p
            className="text-gray-600 mb-6 sm:mb-8 
          text-sm sm:text-base md:text-lg 
          leading-relaxed max-w-2xl mx-auto"
          >
            Generate a complete IEEE-formatted research paper based on the
            analyzed proposal and research insights.
          </p>

          <button
            onClick={handleGenerateIEEE}
            className="px-6 sm:px-8 py-2.5 sm:py-3 
            bg-gradient-to-r from-[#5B2A86] to-[#8B6CCF]
            text-white rounded-lg sm:rounded-xl 
            text-sm sm:text-base font-semibold
            shadow-md hover:scale-105 transition duration-300"
          >
            Generate IEEE Paper
          </button>
        </div>
      )}

      {loading && <Loader />}

      {error && (
        <p className="text-red-500 text-center text-sm sm:text-base px-4">
          {error}
        </p>
      )}

      {researchData.ieeePaper && !loading && (
        <div
          className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 
          rounded-2xl sm:rounded-3xl border border-gray-100
          shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
          sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
        >
          <div className="flex justify-end mb-4 sm:mb-6">
            <button
              onClick={handleExport}
              className="px-4 sm:px-6 py-2 
              bg-blue-600 text-white rounded-lg
              text-sm sm:text-base font-medium 
              shadow hover:bg-blue-700 transition"
            >
              Export as PDF
            </button>
          </div>

          <div
            className="prose max-w-none whitespace-pre-wrap 
            text-gray-800 leading-relaxed 
            text-sm sm:text-base md:text-lg 
            bg-[#F3F4F6] p-4 sm:p-6 md:p-8 
            rounded-xl sm:rounded-2xl 
            border border-gray-100 break-words"
          >
            {researchData.ieeePaper}
          </div>
        </div>
      )}
    </div>
  );
};

export default IEEEPaperPanel;
