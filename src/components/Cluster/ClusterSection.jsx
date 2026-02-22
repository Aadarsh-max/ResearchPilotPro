import React from "react";

const ClusterSection = ({ clusters }) => {
  if (!clusters || clusters.length === 0) return null;

  return (
   <div>

  {/* Section Heading */}
  <div className="mb-14 max-w-4xl">
    <h2 className="text-4xl font-bold text-[#5B2A86] tracking-tight">
      Thematic Research Clusters
    </h2>

    <p className="text-gray-600 mt-4 text-lg leading-relaxed">
      Papers are grouped into semantically related research themes using
      embedding-based clustering.
    </p>

    <div className="h-1 w-20 bg-[#0EA5A4] mt-6 rounded-full"></div>
  </div>

  {/* Cluster Grid */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

    {clusters.map((cluster) => (
      <div
        key={cluster.clusterId}
        className="bg-white p-8 rounded-2xl border border-gray-100
        shadow-[0_8px_25px_rgba(0,0,0,0.05)]
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
        hover:-translate-y-1 transition duration-300"
      >

        <div className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold
        bg-[#F3F4F6] text-[#0EA5A4] rounded-full">
          Cluster {cluster.clusterId}
        </div>

        <h3 className="text-xl font-semibold text-[#5B2A86] mb-4 leading-snug">
          {cluster.clusterName}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          {cluster.description}
        </p>

      </div>
    ))}

  </div>

</div>
  );
};

export default ClusterSection;