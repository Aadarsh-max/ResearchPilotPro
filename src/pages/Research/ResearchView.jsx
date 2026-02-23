import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import TopicInput from "../../components/Topic/TopicInput";
import ClusterSection from "../../components/Cluster/ClusterSection";
import GapAnalysis from "../../components/Gap/GapAnalysis";
import ProposalView from "../../components/Proposal/ProposalView";
import PaperCard from "../../components/Paper/PaperCard";
import CitationGraph from "../../components/Citation/CitationGraph";
import Loader from "../../components/Loader/Loader";
import PublicationTrend from "../../components/Trend/PublicationTrend";
import NoveltyPanel from "../../components/Panels/Novelty/NoveltyPanel";
import DifficultyPanel from "../../components/Panels/Difficulty/DifficultyPanel";
import IEEEPaperPanel from "../../components/Panels/IEEE/IEEEPaperPanel";

import {
  FaFileAlt,
  FaCopy,
  FaPen,
  FaBookOpen,
  FaSearch,
  FaChartBar,
  FaBook,
} from "react-icons/fa";

import "../../styles/research.css";

const ResearchView = () => {
  const [loading, setLoading] = useState(false);
  const [researchData, setResearchData] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("clusters");
  const location = useLocation();

  const handleSearch = async (topic) => {
    try {
      setLoading(true);
      setError("");
      setResearchData(null);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://research-back-psi.vercel.app/api/research/search",
        { topic },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      setResearchData(response.data);
      setActiveTab("clusters");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session");
      if (!sessionId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://research-back-psi.vercel.app/api/research/session/${sessionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setResearchData(res.data);
      } catch (err) {
        console.error("Failed to load session");
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [location.search]);

  const fallingIcons = [
    FaFileAlt,
    FaCopy,
    FaPen,
    FaBookOpen,
    FaSearch,
    FaChartBar,
    FaBook,
  ];

  const fallingItems = fallingIcons.map((icon) => ({
    icon,
    left: `${Math.random() * 100}%`,
    duration: `${6 + Math.random() * 3}s`,
    delay: `${Math.random() * 4}s`,
  }));

  return (
    <div
      className="font-sans bg-[#FAFAFC] text-[#1F2937] min-h-screen
      px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
      py-8 sm:py-12 md:py-16 relative overflow-hidden"
    >
      <div className="absolute w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#8B6CCF]/15 rounded-full blur-3xl -top-32 -left-32"></div>
      <div className="absolute w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[#0EA5A4]/10 rounded-full blur-3xl -bottom-32 -right-32"></div>

      {fallingItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="falling-item hidden md:block"
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          >
            <IconComponent size={16} />
          </div>
        );
      })}

      <div className="mb-10 sm:mb-14 md:mb-20 max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#5B2A86] tracking-tight">
          Research Workspace
        </h1>

        <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore research topics and analyze intelligently.
        </p>

        <div className="h-1 w-16 sm:w-20 bg-[#0EA5A4] mt-6 rounded-full mx-auto"></div>
      </div>

      <div className="max-w-4xl mx-auto mb-10 sm:mb-16 relative z-10">
        <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <TopicInput onSearch={handleSearch} />
        </div>
      </div>

      {!researchData && !loading && (
        <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#5B2A86] mb-6">
            Start Your Research Journey
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Enter a research topic above and ResearchPilot will retrieve
            academic papers, cluster them into themes, detect research gaps,
            estimate novelty, and generate a complete research proposal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16 text-left">
            {[
              {
                title: "Smart Clustering",
                desc: "Automatically group research papers into thematic clusters.",
              },
              {
                title: "Gap Detection",
                desc: "Identify unsolved problems and research opportunities.",
              },
              {
                title: "Proposal Generator",
                desc: "Generate structured proposals with objectives and methodology.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#F3F4F6] p-6 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 transition"
              >
                <h3 className="font-semibold text-[#0EA5A4] text-base sm:text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-6 text-center relative z-10 text-sm sm:text-base">
          {error}
        </p>
      )}

      {loading && <Loader />}

      {researchData && !loading && (
        <div className="max-w-6xl mx-auto mt-14 sm:mt-20 relative z-10">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
            {[
              "clusters",
              "gaps",
              "proposal",
              "papers",
              "analytics",
              "novelty",
              "difficulty",
              "ieee",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm rounded-full font-medium transition ${
                  activeTab === tab
                    ? "bg-[#5B2A86] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            {activeTab === "clusters" && (
              <ClusterSection clusters={researchData.clusters} />
            )}

            {activeTab === "gaps" && (
              <GapAnalysis researchGaps={researchData.researchGaps} />
            )}

            {activeTab === "proposal" && (
              <ProposalView proposal={researchData.proposal} />
            )}

            {activeTab === "papers" && (
              <div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#5B2A86] mb-8">
                  Retrieved Research Papers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {researchData.papers.map((paper) => (
                    <PaperCard key={paper._id} paper={paper} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-8 sm:space-y-16">
                <CitationGraph papers={researchData.papers} />
                <PublicationTrend papers={researchData.papers} />
              </div>
            )}

            {activeTab === "novelty" && (
              <NoveltyPanel novelty={researchData.novelty} />
            )}

            {activeTab === "difficulty" && (
              <DifficultyPanel difficulty={researchData.difficulty} />
            )}

            {activeTab === "ieee" && (
              <IEEEPaperPanel
                researchData={researchData}
                setResearchData={setResearchData}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchView;
