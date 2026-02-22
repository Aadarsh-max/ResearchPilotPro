import React from "react";

const PaperCard = ({ paper }) => {
  return (
   <div className="bg-white p-8 rounded-3xl border border-gray-100
shadow-[0_15px_45px_rgba(0,0,0,0.06)]
hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
hover:-translate-y-1 transition duration-300 flex flex-col justify-between h-full">

  <h3 className="text-xl font-semibold text-[#5B2A86] mb-4 line-clamp-2 leading-snug">
    {paper.title}
  </h3>

  <div className="flex items-center justify-between text-sm text-gray-500 mb-5">

    <span className="bg-[#F3F4F6] px-3 py-1.5 rounded-full">
      Year: {paper.publicationYear || "N/A"}
    </span>

    <span className="text-[#0EA5A4] font-semibold">
      {paper.citationCount} Citations
    </span>

  </div>

  <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-4 flex-grow">
    {paper.abstract && paper.abstract.trim() !== ""
      ? paper.abstract
      : "No abstract available for this paper."}
  </p>

  <a
    href={paper.url}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-auto inline-block w-full text-center
    bg-gradient-to-r from-[#5B2A86] to-[#8B6CCF]
    text-white py-3 rounded-xl text-sm font-semibold
    shadow-md hover:scale-105 transition duration-300"
  >
    View Paper
  </a>

</div>
  );
};

export default PaperCard;
