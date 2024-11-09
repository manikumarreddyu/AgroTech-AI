import React from "react";
import { MessageCircle, ThumbsUp, AlertTriangle, Clock } from "lucide-react";

const CustomerSupportReviews = () => {
  const supportData = {
    unresolvedTickets: 3,
    recentReviews: ["Great service!", "Loved the product!", "Could be better..."],
    avgResponseTime: "2 hours",
    satisfactionRating: "85%",
    frequentIssues: ["Shipping delays", "Product quality", "Account access issues"]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
        Customer Support & Reviews
      </h2>

      {/* Unresolved Tickets */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <MessageCircle className="mr-2 text-green-700" /> Unresolved Tickets
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Open Tickets:</span> {supportData.unresolvedTickets}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Tickets
        </button>
      </div>

      {/* Average Response Time */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Clock className="mr-2 text-green-700" /> Average Response Time
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Response Time:</span> {supportData.avgResponseTime}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          Improve Response Time
        </button>
      </div>

      {/* Customer Satisfaction Rating */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <ThumbsUp className="mr-2 text-green-700" /> Customer Satisfaction
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Satisfaction Rating:</span> {supportData.satisfactionRating}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Satisfaction Trends
        </button>
      </div>

      {/* Frequent Issues */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-green-700" /> Frequent Issues
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Top Issues:</span> {supportData.frequentIssues.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          Resolve Common Issues
        </button>
      </div>

      {/* Recent Reviews */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <MessageCircle className="mr-2 text-green-700" /> Recent Reviews
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Customer Feedback:</span> {supportData.recentReviews.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View & Respond
        </button>
      </div>

      {/* General Support Overview Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 transition-colors duration-300">
          View All Support Analytics
        </button>
      </div>
    </div>
  );
};

export default CustomerSupportReviews;
