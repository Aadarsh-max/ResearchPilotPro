import React from "react";

const DifficultyPanel = ({ difficulty }) => {
  if (!difficulty) {
    return (
      <div className="text-gray-500">
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
    <div className="space-y-14">

  {/* Section Title */}
  <div className="max-w-4xl">
    <h2 className="text-4xl font-bold text-[#5B2A86] tracking-tight mb-4">
      Research Difficulty Assessment
    </h2>
    <div className="h-1 w-20 bg-[#0EA5A4] rounded-full"></div>
  </div>

  {/* Difficulty Overview */}
  <div className="bg-white p-10 rounded-3xl border border-gray-100
  shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">

    <h3 className="text-2xl font-semibold text-[#5B2A86] mb-8">
      1. Difficulty Index
    </h3>

    <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">

      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Computed Score (1–10 Scale)
        </p>

        <p className="text-5xl font-bold text-[#0EA5A4] mt-4">
          {difficultyScore}
        </p>
      </div>

      <div className="md:text-right">
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          Complexity Level
        </p>

        <p className={`text-2xl font-semibold mt-4 ${getLevelColor()}`}>
          {level}
        </p>
      </div>

    </div>

    <p className="text-gray-600 leading-relaxed text-lg bg-[#F3F4F6]
    p-6 rounded-2xl border border-gray-100">
      The difficulty index is computed using a multi-factor analytical
      model incorporating technical terminology density, interdisciplinary
      domain overlap, abstract linguistic complexity, and citation
      maturity indicators.
    </p>

  </div>

  {/* Analytical Breakdown */}
  <div className="bg-white p-10 rounded-3xl border border-gray-100
  shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

    <h3 className="text-2xl font-semibold text-[#5B2A86] mb-8">
      2. Analytical Factors Contributing to Difficulty
    </h3>

    {reasoning && reasoning.length > 0 ? (
      <ul className="space-y-5 list-disc list-inside text-gray-700 leading-relaxed text-lg">
        {reasoning.map((reason, index) => (
          <li key={index} className="hover:text-[#5B2A86] transition duration-200">
            {reason}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-lg">
        No significant contributing factors detected.
      </p>
    )}

  </div>

  {/* Interpretation Section */}
  <div className="bg-white p-10 rounded-3xl border border-gray-100
  shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

    <h3 className="text-2xl font-semibold text-[#5B2A86] mb-6">
      3. Interpretation
    </h3>

    <div className="text-gray-700 leading-relaxed text-lg space-y-4">

      {level === "High" && (
        <p>
          The selected research domain demonstrates high technical complexity
          and/or interdisciplinary integration. Successful execution will
          likely require advanced domain expertise, methodological rigor,
          and familiarity with emerging research paradigms.
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