import React from "react";
import { Tag, Gift, Users, TrendingUp } from "lucide-react";

const MarketingPromotions = () => {
  const promotionsData = {
    activeCampaigns: ["Spring Sale", "Holiday Discounts"],
    discountCodes: ["SAVE10", "FREESHIP"],
    upcomingCampaigns: ["Back to School", "Black Friday"],
    customerSegments: ["New Customers", "Returning Customers", "High Spenders"],
    campaignPerformance: {
      totalReach: "50,000",
      conversionRate: "12%",
      revenueGenerated: "$30,000"
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
        Marketing & Promotions
      </h2>

      {/* Active Campaigns */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Tag className="mr-2 text-green-700" /> Active Campaigns
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Campaigns:</span> {promotionsData.activeCampaigns.join(", ")}
        </p>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Discount Codes:</span> {promotionsData.discountCodes.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          Manage Promotions
        </button>
      </div>

      {/* Upcoming Campaigns */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Gift className="mr-2 text-green-700" /> Upcoming Campaigns
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Next Campaigns:</span> {promotionsData.upcomingCampaigns.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Campaign Calendar
        </button>
      </div>

      {/* Customer Segments */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Users className="mr-2 text-green-700" /> Targeted Customer Segments
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Segments:</span> {promotionsData.customerSegments.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          Manage Customer Segments
        </button>
      </div>

      {/* Campaign Performance */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-700" /> Campaign Performance
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Total Reach:</span> {promotionsData.campaignPerformance.totalReach}
        </p>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Conversion Rate:</span> {promotionsData.campaignPerformance.conversionRate}
        </p>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Revenue Generated:</span> {promotionsData.campaignPerformance.revenueGenerated}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Performance Details
        </button>
      </div>

      {/* General Analytics Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 transition-colors duration-300">
          View All Marketing Analytics
        </button>
      </div>
    </div>
  );
};

export default MarketingPromotions;
