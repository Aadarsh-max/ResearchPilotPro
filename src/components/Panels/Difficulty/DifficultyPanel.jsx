import React from "react";

const DifficultyPanel = ({ difficulty }) => {
  if (!difficulty) {
    return (
      <div className="text-gray-500 text-sm sm:text-base px-4">
        Difficulty analysis not available.
      </div>
    );
  }

  const { difficultyScore, level, reasoning } = difficulty;

  const getLevelColor = () => {
    if (level === "High") return "text-red-600";
    if (level === "Low") return "text-green-600";
    return "text-yellow-600";
  };

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-14 px-4 sm:px-6 md:px-0">
      <div className="max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5B2A86] tracking-tight mb-3 sm:mb-4">
          Research Difficulty Assessment
        </h2>
        <div className="h-1 w-16 sm:w-20 bg-[#0EA5A4] rounded-full"></div>
      </div>

      <div
        className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 
      rounded-2xl sm:rounded-3xl border border-gray-100
      shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
      sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#5B2A86] mb-6 sm:mb-8">
          1. Difficulty Index
        </h3>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              Computed Score (1–10 Scale)
            </p>

            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0EA5A4] mt-3 sm:mt-4">
              {difficultyScore}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              Complexity Level
            </p>

            <p
              className={`text-lg sm:text-xl md:text-2xl font-semibold mt-3 sm:mt-4 ${getLevelColor()}`}
            >
              {level}
            </p>
          </div>
        </div>

        <p
          className="text-gray-600 leading-relaxed 
        text-sm sm:text-base md:text-lg 
        bg-[#F3F4F6] p-4 sm:p-6 
        rounded-xl sm:rounded-2xl border border-gray-100"
        >
          The difficulty index is computed using a multi-factor analytical model
          incorporating technical terminology density, interdisciplinary domain
          overlap, abstract linguistic complexity, and citation maturity
          indicators.
        </p>
      </div>

      <div
        className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 
      rounded-2xl sm:rounded-3xl border border-gray-100
      shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
      sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#5B2A86] mb-6 sm:mb-8">
          2. Analytical Factors Contributing to Difficulty
        </h3>

        {reasoning && reasoning.length > 0 ? (
          <ul
            className="space-y-3 sm:space-y-5 list-disc list-inside 
          text-gray-700 leading-relaxed 
          text-sm sm:text-base md:text-lg"
          >
            {reasoning.map((reason, index) => (
              <li
                key={index}
                className="hover:text-[#5B2A86] transition duration-200"
              >
                {reason}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
            No significant contributing factors detected.
          </p>
        )}
      </div>

      <div
        className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 
      rounded-2xl sm:rounded-3xl border border-gray-100
      shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
      sm:shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#5B2A86] mb-4 sm:mb-6">
          3. Interpretation
        </h3>

        <div
          className="text-gray-700 leading-relaxed 
        text-sm sm:text-base md:text-lg space-y-3 sm:space-y-4"
        >
          {level === "High" && (
            <p>
              The selected research domain demonstrates high technical
              complexity and/or interdisciplinary integration. Successful
              execution will likely require advanced domain expertise,
              methodological rigor, and familiarity with emerging research
              paradigms.
            </p>
          )}

          {level === "Moderate" && (
            <p>
              The research topic presents a balanced level of complexity. While
              it incorporates specialized concepts, it remains accessible with
              structured literature review and focused methodological planning.
            </p>
          )}

          {level === "Low" && (
            <p>
              The topic appears conceptually mature or well-established. The
              difficulty level suggests manageable implementation with standard
              research methodologies and existing frameworks.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DifficultyPanel;
