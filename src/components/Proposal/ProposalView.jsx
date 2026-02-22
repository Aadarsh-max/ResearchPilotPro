import React, { useState } from "react";

const ProposalView = ({ proposal }) => {
  const [expanded, setExpanded] = useState(true);

  if (!proposal) return null;

  return (
   <div className="bg-white p-10 rounded-3xl border border-gray-100
shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition duration-300">

  {/* Header */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

    <div>
      <h2 className="text-3xl font-bold text-[#5B2A86] tracking-tight">
        Generated Research Proposal
      </h2>

      <p className="text-gray-600 mt-3 text-lg">
        AI-generated structured research documentation.
      </p>
    </div>

    <button
      onClick={() => setExpanded(!expanded)}
      className="text-sm bg-[#F3F4F6] text-[#5B2A86]
      px-5 py-2.5 rounded-full font-medium
      hover:bg-[#E9D8FF] transition duration-300"
    >
      {expanded ? "Collapse" : "Expand"}
    </button>

  </div>

  {expanded && (
    <div className="space-y-8 text-gray-700 leading-relaxed text-base">

      {typeof proposal === "string" ? (
        <div className="whitespace-pre-line bg-[#F3F4F6] p-8 rounded-2xl border border-gray-100">
          {proposal}
        </div>
      ) : (
        <>
          {[
            ["Problem Statement", proposal.problemStatement],
            ["Objectives", proposal.objectives],
            ["Methodology", proposal.methodology],
            ["Expected Outcomes", proposal.expectedOutcomes],
            ["Future Scope", proposal.futureScope]
          ].map(([title, content], index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100
            shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition duration-300">

              <h3 className="font-semibold text-xl text-[#5B2A86]">
                {title}
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
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