// components/DashboardStats.js
export const DashboardStats = () => {
  return (
    <div className="bg-white p-6 shadow rounded-lg mt-8">
      <h3 className="text-xl font-semibold mb-4">Dashboard Stats</h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h4 className="text-lg">Crop Forecast</h4>
          <p>50% accuracy</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h4 className="text-lg">Market Trends</h4>
          <p>Increased by 15%</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <h4 className="text-lg">Customer Support</h4>
          <p>95% satisfaction</p>
        </div>
      </div>
    </div>
  );
};
