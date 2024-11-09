import React from 'react';

export default function SalesTrend({ data, maxSales }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Sales Trend</h3>
      <svg className="w-full h-60 bg-gray-50" viewBox="0 0 100 60">
        {data.map((sale, index) => (
          <rect
            key={index}
            x={index * 14 + 2}
            y={60 - (sale / maxSales) * 60}
            width="10"
            height={(sale / maxSales) * 60}
            fill="#4CAF50"
          />
        ))}
      </svg>
    </div>
  );
}
