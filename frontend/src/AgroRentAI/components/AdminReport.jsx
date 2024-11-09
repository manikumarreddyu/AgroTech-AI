import React from "react";
import { FileText, Download, BarChart, User, Layers, Activity } from "lucide-react";

const ReportsDataExport = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
        Reports and Data Export
      </h2>

      {/* General Overview */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <FileText className="mr-2 text-green-700" /> Export Overview
        </h3>
        <p className="text-green-700 mb-4">
          Generate comprehensive reports on sales, user activity, inventory, and performance metrics.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          Generate All Reports
        </button>
      </div>

      {/* Individual Report Options */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">

        {/* Sales Report */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <BarChart className="mr-2 text-green-700" /> Sales Report
          </h3>
          <p className="text-green-700 mb-4">Download sales data and performance by product and region.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
            <Download className="w-4 h-4 mr-2" /> Download Sales Report
          </button>
        </div>

        {/* User Activity Report */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <User className="mr-2 text-green-700" /> User Activity Report
          </h3>
          <p className="text-green-700 mb-4">Access insights on user engagement, sessions, and feedback.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
            <Download className="w-4 h-4 mr-2" /> Download User Report
          </button>
        </div>

        {/* Inventory Report */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Layers className="mr-2 text-green-700" /> Inventory Report
          </h3>
          <p className="text-green-700 mb-4">Export current inventory levels, low stock alerts, and product stats.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
            <Download className="w-4 h-4 mr-2" /> Download Inventory Report
          </button>
        </div>

        {/* Performance Metrics Report */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Activity className="mr-2 text-green-700" /> Performance Metrics
          </h3>
          <p className="text-green-700 mb-4">Analyze website performance metrics, traffic, and conversion rates.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
            <Download className="w-4 h-4 mr-2" /> Download Performance Report
          </button>
        </div>

      </div>

      {/* General Reports Overview Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 transition-colors duration-300">
          View All Reports
        </button>
      </div>
    </div>
  );
};

export default ReportsDataExport;
