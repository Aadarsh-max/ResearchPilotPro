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
        `http://localhost:8000/api/research/generate-ieee/${researchData.sessionId}`,
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
      `http://localhost:8000/api/research/${researchData.sessionId}/export-pdf`,
      "_blank",
    );
  };

  if (!researchData?.sessionId) {
    return <p className="text-gray-500">Search a topic first.</p>;
  }

  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold text-[#5B2A86] tracking-tight mb-4">
          IEEE Style Research Paper
        </h2>
        <div className="h-1 w-20 bg-[#0EA5A4] rounded-full"></div>
      </div>

      {/* Generate Section */}
      {!researchData.ieeePaper && !loading && (
        <div
          className="bg-white p-12 rounded-3xl border border-gray-100
        shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center max-w-4xl"
        >
          <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Generate a complete IEEE-formatted research paper based on the
            analyzed proposal and research insights.
          </p>

          <button
            onClick={handleGenerateIEEE}
            className="px-8 py-3 bg-gradient-to-r from-[#5B2A86] to-[#8B6CCF]
            text-white rounded-xl font-semibold
            shadow-md hover:scale-105 transition duration-300"
          >
            Generate IEEE Paper
          </button>
        </div>
      )}

      {loading && <Loader />}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display Paper */}
      {researchData.ieeePaper && !loading && (
        <div
          className="bg-white p-12 rounded-3xl border border-gray-100
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
        >
          {/* Export Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleExport}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg
              font-medium shadow hover:bg-blue-700 transition"
            >
              Export as PDF
            </button>
          </div>

          {/* Paper Content */}
          <div
            className="prose max-w-none whitespace-pre-wrap text-gray-800
          leading-relaxed text-lg bg-[#F3F4F6] p-8 rounded-2xl border border-gray-100"
          >
            {researchData.ieeePaper}
          </div>
        </div>
      )}
    </div>
  );
};

export default IEEEPaperPanel;
