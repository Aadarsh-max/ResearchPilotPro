import React, { useState } from "react";

const ProposalView = ({ proposal }) => {
  const [expanded, setExpanded] = useState(true);

  if (!proposal) return null;

  return (
    <div
      className="bg-white 
    p-5 sm:p-6 md:p-8 lg:p-10 
    rounded-2xl sm:rounded-3xl 
    border border-gray-100
    shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
    sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)] 
    transition duration-300"
    >
      <div
        className="flex flex-col sm:flex-row 
      sm:justify-between sm:items-center 
      gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10"
      >
        <div>
          <h2
            className="text-xl sm:text-2xl md:text-3xl 
          font-bold text-[#5B2A86] tracking-tight"
          >
            Generated Research Proposal
          </h2>

          <p
            className="text-gray-600 mt-2 sm:mt-3 
          text-sm sm:text-base md:text-lg"
          >
            AI-generated structured research documentation.
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs sm:text-sm 
          bg-[#F3F4F6] text-[#5B2A86]
          px-4 sm:px-5 py-2 
          rounded-full font-medium
          hover:bg-[#E9D8FF] transition duration-300 w-fit"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {expanded && (
        <div
          className="space-y-6 sm:space-y-8 
        text-gray-700 leading-relaxed 
        text-sm sm:text-base"
        >
          {typeof proposal === "string" ? (
            <div
              className="whitespace-pre-line 
            bg-[#F3F4F6] p-4 sm:p-6 md:p-8 
            rounded-xl sm:rounded-2xl 
            border border-gray-100 break-words"
            >
              {proposal}
            </div>
          ) : (
            <>
              {[
                ["Problem Statement", proposal.problemStatement],
                ["Objectives", proposal.objectives],
                ["Methodology", proposal.methodology],
                ["Expected Outcomes", proposal.expectedOutcomes],
                ["Future Scope", proposal.futureScope],
              ].map(([title, content], index) => (
                <div
                  key={index}
                  className="bg-white 
                  p-4 sm:p-5 md:p-6 
                  rounded-xl sm:rounded-2xl 
                  border border-gray-100
                  shadow-[0_6px_20px_rgba(0,0,0,0.04)] 
                  hover:-translate-y-1 transition duration-300"
                >
                  <h3
                    className="font-semibold 
                  text-base sm:text-lg md:text-xl 
                  text-[#5B2A86]"
                  >
                    {title}
                  </h3>

                  <p
                    className="mt-2 sm:mt-3 
                  text-gray-600 leading-relaxed 
                  text-sm sm:text-base"
                  >
                    {content}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProposalView;
