import React, { useState } from "react";

const TopicInput = ({ onSearch }) => {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a research topic");
      return;
    }
    setError("");
    onSearch(topic.trim());
  };
  return (
    <div className="w-full flex justify-center relative">

  <div className="w-full max-w-4xl bg-white p-10 rounded-3xl border border-gray-100
  shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

    <h2 className="text-3xl font-bold text-[#5B2A86] mb-6 tracking-tight">
      Enter a Research Topic
    </h2>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-5"
    >

      <input
        type="text"
        placeholder="e.g.AI in Healthcare, Edge Computing."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="flex-1 border border-gray-200 rounded-2xl px-6 py-4
        text-sm md:text-base outline-none bg-[#FAFAFC]
        focus:border-[#5B2A86]
        focus:ring-2 focus:ring-[#8B6CCF]/30
        transition duration-300"
      />

      <button
        type="submit"
        className="bg-linear-to-r from-[#5B2A86] to-[#8B6CCF]
        text-white px-8 py-4 rounded-2xl font-semibold
        shadow-md hover:scale-105 active:scale-95
        transition duration-300 whitespace-nowrap cursor-pointer"
      >
        Analyze
      </button>

    </form>

    {error && (
      <p className="text-red-500 text-sm mt-3">
        {error}
      </p>
    )}

  </div>

</div>
  );
};

export default TopicInput;
