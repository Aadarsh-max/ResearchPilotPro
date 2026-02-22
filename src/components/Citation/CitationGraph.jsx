import React from "react";

const CitationGraph = ({ papers }) => {
  if (!papers || papers.length === 0) return null;

  const topPapers = [...papers]
    .sort((a, b) => b.citationCount - a.citationCount)
    .slice(0, 5);

  const maxCitation = topPapers[0]?.citationCount || 1;

  return (
    <div className="relative bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)]
p-10 border border-gray-100 transition-all duration-300 hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

  {/* Accent Top Glow Line */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5B2A86] via-[#8B6CCF] to-[#0EA5A4] rounded-t-3xl"></div>

  {/* Header */}
  <div className="mb-10">
    <h2 className="text-3xl font-bold text-[#5B2A86] tracking-tight">
      Citation Influence Overview
    </h2>

    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
      Top cited papers within the retrieved research set.
    </p>
  </div>

  <div className="space-y-7">

    {topPapers.map((paper) => {
      const widthPercent =
        (paper.citationCount / maxCitation) * 100;

      return (
        <div key={paper._id} className="group transition duration-300">

          <div className="flex justify-between items-center text-sm mb-3 gap-4">

            <span className="text-gray-700 line-clamp-1
            group-hover:text-[#5B2A86] transition-colors duration-200 font-medium">
              {paper.title}
            </span>

            <span className="text-[#5B2A86] font-semibold text-xs md:text-sm
            bg-[#F3F4F6] px-4 py-1.5 rounded-full whitespace-nowrap">
              {paper.citationCount} citations
            </span>

          </div>

          {/* Progress Bar Background */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

            {/* Progress Fill */}
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#5B2A86] via-[#8B6CCF] to-[#0EA5A4]
              transition-all duration-1000 ease-out"
              style={{ width: `${widthPercent}%` }}
            ></div>

          </div>

        </div>
      );
    })}

  </div>

</div>
  );
};

export default CitationGraph;