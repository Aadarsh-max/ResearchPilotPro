import React from "react";

const GapAnalysis = ({ researchGaps }) => {
  if (!researchGaps) return null;

  return (
    <div className="bg-white p-10 rounded-3xl border border-gray-100
shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">

  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5B2A86] via-[#8B6CCF] to-[#0EA5A4]"></div>

  <div className="mb-10 max-w-4xl">
    <h2 className="text-3xl font-bold text-[#5B2A86] tracking-tight">
      Research Gap Analysis
    </h2>

    <p className="text-gray-600 mt-4 text-lg leading-relaxed">
      Strategic insights generated using AI-based reasoning across clustered research themes.
    </p>
  </div>

  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line bg-[#F3F4F6]
  p-8 rounded-2xl border border-gray-100">
    {typeof researchGaps === "string"
      ? researchGaps
      : JSON.stringify(researchGaps, null, 2)}
  </div>

</div>
  );
};

export default GapAnalysis;