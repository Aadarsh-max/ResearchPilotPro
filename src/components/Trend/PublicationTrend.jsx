import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PublicationTrend = ({ papers }) => {
  if (!papers || papers.length === 0) return null;

  // Count publications per year
  const yearMap = {};

  papers.forEach((paper) => {
    const year = paper.publicationYear;
    if (year) {
      yearMap[year] = (yearMap[year] || 0) + 1;
    }
  });

  const chartData = Object.keys(yearMap)
    .sort()
    .map((year) => ({
      year,
      count: yearMap[year],
    }));

  return (
    <div className="bg-white p-10 rounded-3xl border border-gray-100
shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

  <div className="mb-8 max-w-4xl">
    <h2 className="text-3xl font-bold text-[#5B2A86] tracking-tight">
      Publication Trend
    </h2>

    <p className="text-gray-600 mt-4 text-lg">
      Year-wise distribution of retrieved research papers.
    </p>
  </div>

  <ResponsiveContainer width="100%" height={320}>
    <LineChart data={chartData}>

      <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" opacity={0.6} />

      <XAxis dataKey="year" stroke="#6B7280" />

      <YAxis allowDecimals={false} stroke="#6B7280" />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="count"
        stroke="url(#trendGradient)"
        strokeWidth={3}
        dot={{ r: 5 }}
        activeDot={{ r: 7 }}
      />

      <defs>
        <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5B2A86" />
          <stop offset="50%" stopColor="#8B6CCF" />
          <stop offset="100%" stopColor="#0EA5A4" />
        </linearGradient>
      </defs>

    </LineChart>
  </ResponsiveContainer>

</div>
  );
};

export default PublicationTrend;