import React from "react";
import { DollarSign, TrendingUp, ShoppingCart, Percent } from "lucide-react";

const SalesRevenueAnalytics = () => {
  const salesData = {
    totalSales: "$120,000",
    totalOrders: 3200,
    averageOrderValue: "$37.50",
    refundRate: "2%",
    monthlyGrowth: 10,
    topProducts: ["Product X", "Product Y", "Product Z"],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
        Sales & Revenue Analytics
      </h2>

      {/* Total Sales */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <DollarSign className="mr-2 text-green-700" /> Total Sales
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Revenue:</span> {salesData.totalSales}
        </p>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Monthly Growth:</span> {salesData.monthlyGrowth}%
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Sales Trends
        </button>
      </div>

      {/* Total Orders */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <ShoppingCart className="mr-2 text-green-700" /> Total Orders
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Orders:</span> {salesData.totalOrders}
        </p>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Average Order Value:</span> {salesData.averageOrderValue}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Order Insights
        </button>
      </div>

      {/* Refund Rate */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Percent className="mr-2 text-green-700" /> Refund Rate
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Refund Rate:</span> {salesData.refundRate}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Refund Analysis
        </button>
      </div>

      {/* Top Products */}
      <div className="border rounded-lg p-6 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-700" /> Top Products
        </h3>
        <p className="text-lg text-green-700 mb-4">
          <span className="font-bold">Top Selling Products:</span> {salesData.topProducts.join(", ")}
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Product Performance
        </button>
      </div>

      {/* General Analytics Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 transition-colors duration-300">
          <TrendingUp className="inline w-4 h-4 mr-2" /> View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default SalesRevenueAnalytics;
