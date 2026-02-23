import React from "react";

const ClusterSection = ({ clusters }) => {
  if (!clusters || clusters.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="mb-10 sm:mb-12 md:mb-14 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5B2A86] tracking-tight">
          Thematic Research Clusters
        </h2>

        <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
          Papers are grouped into semantically related research themes using
          embedding-based clustering.
        </p>

        <div className="h-1 w-16 sm:w-20 bg-[#0EA5A4] mt-4 sm:mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {clusters.map((cluster) => (
          <div
            key={cluster.clusterId}
            className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl 
            border border-gray-100
            shadow-[0_6px_20px_rgba(0,0,0,0.05)]
            hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
            hover:-translate-y-1 transition duration-300"
          >
            <div
              className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 
            text-[10px] sm:text-xs font-semibold
            bg-[#F3F4F6] text-[#0EA5A4] rounded-full"
            >
              Cluster {cluster.clusterId}
            </div>

            <h3
              className="text-lg sm:text-xl font-semibold 
            text-[#5B2A86] mb-3 sm:mb-4 leading-snug"
            >
              {cluster.clusterName}
            </h3>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {cluster.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterSection;
