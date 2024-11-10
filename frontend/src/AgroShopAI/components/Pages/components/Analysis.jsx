import React from 'react';

export default function Analysis({ analysis }) {
  return (
    <div className="mt-8 bg-gray-100 p-4 rounded">
      <h3 className="font-semibold mb-2">Analysis</h3>
      <p>Sales trend is {analysis.salesTrend}.</p>
      <p>User registration trend is {analysis.userRegistrationTrend}.</p>
      <p>Top selling product: {analysis.topProduct}</p>
    </div>
  );
}
