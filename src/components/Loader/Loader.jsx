import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center 
    py-16 sm:py-20 md:py-24 
    px-4 sm:px-6 
    relative overflow-hidden">

      <div className="absolute 
      w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] 
      bg-[#8B6CCF]/15 rounded-full blur-3xl 
      -top-32 sm:-top-40"></div>

      <div className="absolute 
      w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] 
      bg-[#0EA5A4]/10 rounded-full blur-3xl 
      -bottom-32 sm:-bottom-40 right-0"></div>

      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
      border-4 border-[#8B6CCF]/30 border-t-[#5B2A86]
      rounded-full animate-spin shadow-md"></div>

      <h3 className="mt-6 sm:mt-8 
      text-lg sm:text-xl md:text-2xl 
      font-semibold text-[#5B2A86] tracking-tight text-center">
        Analyzing Research...
      </h3>

      <p className="text-xs sm:text-sm text-gray-600 
      mt-3 sm:mt-4 text-center 
      max-w-xs sm:max-w-md md:max-w-lg 
      leading-relaxed">
        Retrieving papers, clustering themes, detecting research gaps,
        estimating novelty, and generating proposal.
      </p>

    </div>
  );
};

export default Loader;