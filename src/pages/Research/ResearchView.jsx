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
      setActiveTab("clusters"); // default tab after search
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
    FaPen,
    FaBookOpen,
    FaSearch,
    FaChartBar,
    FaBook,
    FaSearch,
    FaFileAlt,
  ];

  const fallingItems = fallingIcons.map((icon) => ({
    icon,
    left: `${Math.random() * 100}%`,
    duration: `${6 + Math.random() * 3}s`,
    delay: `${Math.random() * 4}s`,
  }));
  return (
    <div className="font-sans bg-[#FAFAFC] text-[#1F2937] min-h-screen px-6 md:px-16 py-20 relative overflow-hidden">
      <div className="absolute w-150 h-150 bg-[#8B6CCF]/15 rounded-full blur-3xl -top-50 -left-50"></div>
      <div className="absolute w-125 h-125 bg-[#0EA5A4]/10 rounded-full blur-3xl -bottom-50 -right-37.5"></div>

      {fallingItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="falling-item"
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          >
            <IconComponent size={20} />
          </div>
        );
      })}

      <div className="mb-20 max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-[#5B2A86] tracking-tight">
          Research Workspace
        </h1>

        <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
          Explore research topics and analyze intelligently.
        </p>

        <div className="h-1 w-24 bg-[#0EA5A4] mt-8 rounded-full mx-auto"></div>
      </div>

      <div className="max-w-4xl mx-auto mb-20 relative z-10">
        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl">
          <TopicInput onSearch={handleSearch} />
        </div>
      </div>

      {!researchData && !loading && (
        <div className="max-w-6xl mx-auto bg-white p-14 rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center relative z-10">
          <h2 className="text-4xl font-bold text-[#5B2A86] mb-10 tracking-tight">
            Start Your Research Journey
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
            Enter a research topic above and ResearchPilot will retrieve
            academic papers, cluster them into themes, detect research gaps,
            estimate novelty, and generate a complete research proposal.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-16 text-left">
            {[
              {
                title: "Smart Clustering",
                desc: "Automatically group research papers into meaningful thematic clusters.",
              },
              {
                title: "Gap Detection",
                desc: "Identify unsolved problems and potential research opportunities.",
              },
              {
                title: "Proposal Generator",
                desc: "Generate structured research proposals with objectives and methodology.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#F3F4F6] p-8 rounded-2xl border border-gray-100 hover:-translate-y-1 transition duration-300 shadow-sm"
              >
                <h3 className="font-semibold text-[#0EA5A4] text-xl mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-sm text-gray-500 mb-8">Try searching for:</p>

            <div className="flex flex-wrap justify-center gap-5">
              {[
                "IoT Applications in Healthcare",
                "AI in Cybersecurity",
                "Edge Computing Optimization",
                "Blockchain for Supply Chain",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => handleSearch(example)}
                  className="bg-[#5B2A86] text-white px-6 py-3 rounded-full text-sm shadow-md hover:scale-105 transition duration-300"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-8 text-center relative z-10">{error}</p>
      )}

      {loading && <Loader />}

      {researchData && !loading && (
        <div className="max-w-6xl mx-auto mt-24 relative z-10">
          {/* TAB NAVIGATION */}
          <div className="flex flex-wrap gap-4 mb-14 justify-center">
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
                className={`px-6 py-3 rounded-full text-sm font-medium transition duration-300 shadow-sm ${
                  activeTab === tab
                    ? "bg-[#5B2A86] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl">
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
                <h2 className="text-3xl font-bold text-[#5B2A86] mb-12">
                  Retrieved Research Papers
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {researchData.papers.map((paper) => (
                    <PaperCard key={paper._id} paper={paper} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-20">
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
