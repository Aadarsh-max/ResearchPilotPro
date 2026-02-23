import React, { useState } from "react";

const TopicInput = ({ onSearch }) => {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a valid research topic");
      return;
    }

    setError("");
    onSearch(topic.trim());
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 flex justify-center">
      
      <div
        className="w-full max-w-5xl bg-white
        p-6 sm:p-8 md:p-10 lg:p-12
        rounded-2xl sm:rounded-3xl
        border border-gray-100
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
      >
        {/* Heading */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
          font-bold text-[#5B2A86]
          mb-4 sm:mb-6 tracking-tight text-center md:text-left"
        >
          Enter a Research Topic
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 sm:gap-5"
        >
          <input
            type="text"
            placeholder="e.g. AI in Healthcare, Edge Computing"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 border border-gray-200
            rounded-xl sm:rounded-2xl
            px-4 sm:px-6
            py-3 sm:py-4
            text-sm sm:text-base
            outline-none bg-[#FAFAFC]
            focus:border-[#5B2A86]
            focus:ring-2 focus:ring-[#8B6CCF]/30
            transition duration-300"
          />

          <button
            type="submit"
            className="w-full md:w-auto
            bg-gradient-to-r from-[#5B2A86] to-[#8B6CCF]
            text-white
            px-6 sm:px-8
            py-3 sm:py-4
            rounded-xl sm:rounded-2xl
            font-semibold
            shadow-md
            hover:scale-105 active:scale-95
            transition duration-300"
          >
            Analyze
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center md:text-left">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default TopicInput;