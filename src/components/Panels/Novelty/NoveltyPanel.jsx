const NoveltyPanel = ({ novelty }) => {
  if (!novelty) return <p>No novelty data available.</p>;

  return (
    <div className="space-y-12 max-w-4xl mx-auto">

  {/* Title Section */}
  <div className="text-center">
    <h2 className="text-4xl font-bold text-[#5B2A86] tracking-tight">
      Novelty Score
    </h2>

    <p className="text-7xl font-bold text-[#0EA5A4] mt-8 tracking-tight">
      {(novelty.noveltyScore * 100).toFixed(0)}%
    </p>
  </div>

  {/* Details Card */}
  <div className="bg-white p-10 rounded-3xl border border-gray-100
  shadow-[0_20px_60px_rgba(0,0,0,0.06)] space-y-5 text-center">

    <p className="text-gray-700 text-lg">
      Compared against {novelty.comparedPapers} research papers.
    </p>

    <p className="text-gray-600 text-lg">
      Average Similarity: {novelty.averageSimilarity}
    </p>

  </div>

</div>
  );
};

export default NoveltyPanel;