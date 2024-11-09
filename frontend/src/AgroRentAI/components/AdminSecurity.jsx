import React from "react";
import { Shield, Lock, Eye, FileText, Download, AlertTriangle } from "lucide-react";
const SecurityAuditLogs = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
        Security & Audit Logs
      </h2>

      {/* Overview Section */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Shield className="mr-2 text-green-700" /> Security Overview
        </h3>
        <p className="text-green-700 mb-4">
          Monitor recent security events, track admin activities, audit user permissions, and export logs.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          View Security Dashboard
        </button>
      </div>

      {/* Security Options Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* Admin Activity Logs */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Lock className="mr-2 text-green-700" /> Admin Activity Logs
          </h3>
          <p className="text-green-700 mb-4">Track all actions performed by administrators within the platform.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
            <Eye className="w-4 h-4 mr-2" /> View Logs
          </button>
        </div>

        {/* User Access Permissions */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Lock className="mr-2 text-green-700" /> User Access Permissions
          </h3>
          <p className="text-green-700 mb-4">Audit and manage user permissions to ensure secure access controls.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
            <Eye className="w-4 h-4 mr-2" /> View Permissions
          </button>
        </div>

        {/* Suspicious Activity Alerts */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-600" /> Suspicious Activity Alerts
          </h3>
          <p className="text-green-700 mb-4">Review and investigate suspicious activities and potential threats.</p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center">
            <Eye className="w-4 h-4 mr-2" /> View Alerts
          </button>
        </div>

        {/* Export Logs */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <FileText className="mr-2 text-green-700" /> Export Logs
          </h3>
          <p className="text-green-700 mb-4">Generate and export security-related logs in CSV format.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export Logs
          </button>
        </div>
      </div>

      {/* Alerts or Summary Section */}
      <div className="border rounded-lg p-6 bg-yellow-50 shadow-sm hover:bg-yellow-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-yellow-700 mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-700" /> Security Summary
        </h3>
        <p className="text-yellow-700 mb-4">
          Review the summary of the latest security audits and any potential risks associated with recent actions.
        </p>
        <button className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition-colors duration-300">
          Review Security Summary
        </button>
      </div>
    </div>
  );
};

export default SecurityAuditLogs;
