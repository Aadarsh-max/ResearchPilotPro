import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 relative overflow-hidden">

  {/* Soft Background Glow */}
  <div className="absolute w-[400px] h-[400px] bg-[#8B6CCF]/15 rounded-full blur-3xl -top-40"></div>
  <div className="absolute w-[400px] h-[400px] bg-[#0EA5A4]/10 rounded-full blur-3xl -bottom-40 right-0"></div>

  {/* Loader */}
  <div className="w-16 h-16 border-4 border-[#8B6CCF]/30 border-t-[#5B2A86]
  rounded-full animate-spin shadow-md"></div>

  <h3 className="mt-8 text-2xl font-semibold text-[#5B2A86] tracking-tight">
    Analyzing Research...
  </h3>

  <p className="text-sm text-gray-600 mt-4 text-center max-w-md leading-relaxed">
    Retrieving papers, clustering themes, detecting research gaps,
    estimating novelty, and generating proposal.
  </p>

</div>
  );
};

export default Loader;