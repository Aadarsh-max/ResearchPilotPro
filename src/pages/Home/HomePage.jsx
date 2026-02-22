import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaBrain,
  FaSearch,
  FaChartBar,
  FaCogs,
  FaFileAlt,
  FaCopy,
  FaPen,
  FaBookOpen
} from "react-icons/fa";
import "../../styles/homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const fallingElements = [
    { icon: <FaFileAlt />, left: "8%", duration: "12s", delay: "0s" },
    { icon: <FaCopy />, left: "20%", duration: "14s", delay: "3s" },
    { icon: <FaPen />, left: "35%", duration: "11s", delay: "2s" },
    { icon: <FaBookOpen />, left: "55%", duration: "15s", delay: "4s" },
    { icon: <FaPen />, left: "70%", duration: "13s", delay: "1s" },
    { icon: <FaFileAlt />, left: "85%", duration: "16s", delay: "5s" },
  ];

  return (
    <div className="font-sans bg-[#FAFAFC] text-[#1F2937] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-[#5B2A86] via-[#4C1D95] to-[#0EA5A4] text-white px-6 overflow-hidden">
        {/* Falling Items */}
        {fallingElements.map((item, index) => (
          <div
            key={index}
            className="falling-item"
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          >
            {item.icon}
          </div>
        ))}

        <div className="relative text-center max-w-4xl z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight animate-fadeUp">
            Autonomous AI Research Strategist
          </h1>

          <p
            className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed animate-fadeUp"
            style={{ animationDelay: "0.2s" }}
          >
            From research exploration to proposal generation — ResearchPilot
            structures knowledge, identifies gaps, evaluates feasibility, and
            guides innovation intelligently.
          </p>

          <button
            onClick={() => navigate("/researchview")}
            className="bg-white text-[#5B2A86] font-semibold px-8 py-3 rounded-full 
            shadow-xl hover:scale-110 hover:bg-gray-100 
            transition duration-300 animate-glow cursor-pointer"
          >
            Get Started with ResearchPilot
          </button>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 bg-[#F3F4F6] px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center text-[#5B2A86] mb-16 animate-fadeUp">
          Core Intelligence Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            title={
              <>
                <FaBook className="inline mr-2" /> Automated Paper Retrieval
              </>
            }
            desc="Instantly fetches relevant academic papers from trusted research databases. 
Saves time by eliminating manual searching and filtering."
          />

          <FeatureCard
            title={
              <>
                <FaBrain className="inline mr-2" /> Semantic Clustering
              </>
            }
            desc="Intelligently groups research papers into meaningful thematic clusters. 
Helps users quickly understand major research directions."
          />

          <FeatureCard
            title={
              <>
                <FaSearch className="inline mr-2" /> Research Gap Detection
              </>
            }
            desc="Analyzes clustered papers to uncover unexplored or under-researched areas. 
Assists in identifying strong and innovative project ideas."
          />

          <FeatureCard
            title={
              <>
                <FaChartBar className="inline mr-2" /> Novelty Score
              </>
            }
            desc="Evaluates how unique a research idea is compared to existing studies. 
Provides a quantitative score to measure innovation potential."
          />

          <FeatureCard
            title={
              <>
                <FaCogs className="inline mr-2" /> Difficulty Estimator
              </>
            }
            desc="Estimates the technical complexity and feasibility of a research topic. 
Helps students choose projects based on their skill level."
          />

          <FeatureCard
            title={
              <>
                <FaFileAlt className="inline mr-2" /> Proposal Generator
              </>
            }
            desc="Automatically generates a structured research proposal in IEEE format. 
Includes abstract, methodology, and expected outcomes."
          />
        </div>
      </section>

      {/* FINAL STATEMENT */}
      <section className="py-20 px-6 md:px-32 text-center animated-gradient">
        <h2 className="text-4xl font-bold text-[#0EA5A4] mb-6 animate-fadeUp">
          Most tools summarize research.
        </h2>

        <p
          className="text-2xl font-semibold text-[#5B2A86] animate-fadeUp"
          style={{ animationDelay: "0.2s" }}
        >
          ResearchPilot thinks like a Research Strategist.
        </p>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, desc }) => (
  <div
    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg 
  hover:-translate-y-3 hover:shadow-2xl 
  transition duration-300 transform"
  >
    <h3 className="text-xl font-semibold text-[#0EA5A4] mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
