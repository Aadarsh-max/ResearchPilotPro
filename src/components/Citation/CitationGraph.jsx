import React from "react";

const CitationGraph = ({ papers }) => {
  if (!papers || papers.length === 0) return null;

  const topPapers = [...papers]
    .sort((a, b) => b.citationCount - a.citationCount)
    .slice(0, 5);

  const maxCitation = topPapers[0]?.citationCount || 1;

  return (
    <div
      className="relative bg-white rounded-2xl sm:rounded-3xl 
    shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)]
    p-5 sm:p-6 md:p-8 lg:p-10 
    border border-gray-100 
    transition-all duration-300 
    hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >
      <div
        className="absolute top-0 left-0 w-full h-1 
      bg-gradient-to-r from-[#5B2A86] via-[#8B6CCF] to-[#0EA5A4] 
      rounded-t-2xl sm:rounded-t-3xl"
      ></div>

      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold 
        text-[#5B2A86] tracking-tight"
        >
          Citation Influence Overview
        </h2>

        <p
          className="text-gray-500 mt-2 sm:mt-3 
        text-xs sm:text-sm leading-relaxed"
        >
          Top cited papers within the retrieved research set.
        </p>
      </div>

      <div className="space-y-5 sm:space-y-6 md:space-y-7">
        {topPapers.map((paper) => {
          const widthPercent = (paper.citationCount / maxCitation) * 100;

          return (
            <div key={paper._id} className="group transition duration-300">
              <div
                className="flex flex-col sm:flex-row 
              sm:justify-between sm:items-center 
              text-xs sm:text-sm mb-2 sm:mb-3 gap-2 sm:gap-4"
              >
                <span
                  className="text-gray-700 line-clamp-2 sm:line-clamp-1
                group-hover:text-[#5B2A86] transition-colors duration-200 font-medium"
                >
                  {paper.title}
                </span>

                <span
                  className="text-[#5B2A86] font-semibold 
                text-xs sm:text-sm
                bg-[#F3F4F6] px-3 sm:px-4 py-1 
                rounded-full whitespace-nowrap w-fit"
                >
                  {paper.citationCount} citations
                </span>
              </div>

              <div
                className="w-full bg-gray-200 rounded-full 
              h-2 sm:h-3 overflow-hidden"
              >
                <div
                  className="h-2 sm:h-3 rounded-full 
                  bg-gradient-to-r from-[#5B2A86] via-[#8B6CCF] to-[#0EA5A4]
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
