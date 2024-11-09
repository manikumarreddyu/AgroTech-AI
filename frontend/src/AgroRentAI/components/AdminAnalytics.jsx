import React from "react";
import { BarChart, TrendingUp, Users, Activity, ShoppingCart } from "lucide-react";

const Analytics = () => {
  // Dummy analytics data for demonstration purposes
  const analytics = {
    revenue: "$50,000",
    revenueGrowth: 15,
    popularProducts: ["Product A", "Product B", "Product C"],
    rentalFrequency: ["High", "Medium", "Low"],
    userBehavior: ["Browse", "Purchase", "Review"],
    siteTraffic: "1,000,000",
    bounceRate: 45,
    ageGroups: ["18-24", "25-34", "35-44"],
    geography: ["USA", "Canada", "UK"]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
        Analytics & Reporting
      </h2>

      {/* Revenue Section */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <ShoppingCart className="mr-2 text-green-700" /> Revenue Overview
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Total Revenue:</span> {analytics.revenue}
        </p>
        <p className="text-green-700 mb-4">
          <span className="font-bold">Revenue Growth:</span> {analytics.revenueGrowth}%
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Revenue Trends
        </button>
      </div>

      {/* Popular Products Section */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-700" /> Popular Products
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Top Selling Products:</span> {analytics.popularProducts.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Product Performance
        </button>
      </div>

      {/* Rental Frequency Section */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Activity className="mr-2 text-green-700" /> Rental Frequency
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Frequent Rentals:</span> {analytics.rentalFrequency.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Rental Analytics
        </button>
      </div>

      {/* User Behavior Section */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Users className="mr-2 text-green-700" /> User Behavior Insights
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Top User Actions:</span> {analytics.userBehavior.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View User Behavior Details
        </button>
      </div>

      {/* Traffic Analysis Section */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <BarChart className="mr-2 text-green-700" /> Traffic Analysis
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Site Traffic:</span> {analytics.siteTraffic} visits
        </p>
        <p className="text-green-700 mb-4">
          <span className="font-bold">Bounce Rate:</span> {analytics.bounceRate}%
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Traffic Trends
        </button>
      </div>

      {/* User Demographics Section */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Users className="mr-2 text-green-700" /> User Demographics
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Age Groups:</span> {analytics.ageGroups.join(", ")}
        </p>
        <p className="text-green-700 mb-4">
          <span className="font-bold">Geographic Distribution:</span> {analytics.geography.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Demographic Breakdown
        </button>
      </div>

      {/* General Analytics Overview */}
      <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 transition-colors duration-300">
          <BarChart className="inline w-4 h-4 mr-2" /> View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default Analytics;
