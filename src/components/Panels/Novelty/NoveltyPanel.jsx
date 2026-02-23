const NoveltyPanel = ({ novelty }) => {
  if (!novelty)
    return (
      <p className="text-sm sm:text-base px-4 text-center">
        No novelty data available.
      </p>
    );

  return (
    <div
      className="space-y-8 sm:space-y-10 md:space-y-12 
    max-w-4xl mx-auto px-4 sm:px-6 md:px-0"
    >
      <div className="text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-[#5B2A86] tracking-tight"
        >
          Novelty Score
        </h2>

        <p
          className="text-4xl sm:text-6xl md:text-7xl 
        font-bold text-[#0EA5A4] mt-6 sm:mt-8 tracking-tight"
        >
          {(novelty.noveltyScore * 100).toFixed(0)}%
        </p>
      </div>

      <div
        className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 
      rounded-2xl sm:rounded-3xl border border-gray-100
      shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
      sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)] 
      space-y-4 sm:space-y-5 text-center"
      >
        <p className="text-gray-700 text-sm sm:text-base md:text-lg">
          Compared against {novelty.comparedPapers} research papers.
        </p>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Average Similarity: {novelty.averageSimilarity}
        </p>
      </div>
    </div>
  );
};

export default NoveltyPanel;
