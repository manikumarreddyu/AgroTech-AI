import React from "react";
import { Settings, Sliders, CreditCard, Truck, DollarSign, Bell, Users } from "lucide-react";

const SettingsConfiguration = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
        Settings & Configuration
      </h2>

      {/* General Overview */}
      <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
          <Settings className="mr-2 text-green-700" /> Platform Settings Overview
        </h3>
        <p className="text-lg text-green-700 mb-4">
          Customize your platform settings, including payments, shipping, taxes, notifications, and user roles.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
          Configure All Settings
        </button>
      </div>

      {/* Individual Settings Sections */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* Payment Settings */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <CreditCard className="mr-2 text-green-700" /> Payment Settings
          </h3>
          <p className="text-green-700 mb-4">Set up and manage payment methods, currency, and refund policies.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
            Manage Payments
          </button>
        </div>

        {/* Shipping Settings */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Truck className="mr-2 text-green-700" /> Shipping Settings
          </h3>
          <p className="text-green-700 mb-4">Define shipping regions, rates, and carrier integrations.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
            Manage Shipping
          </button>
        </div>

        {/* Tax Settings */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <DollarSign className="mr-2 text-green-700" /> Tax Settings
          </h3>
          <p className="text-green-700 mb-4">Configure tax rates and rules for different regions and product types.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
            Manage Taxes
          </button>
        </div>

        {/* Notification Settings */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Bell className="mr-2 text-green-700" /> Notification Settings
          </h3>
          <p className="text-green-700 mb-4">Set up notifications for order updates, promotions, and alerts.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
            Manage Notifications
          </button>
        </div>

        {/* User Role Settings */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Users className="mr-2 text-green-700" /> User Role Settings
          </h3>
          <p className="text-green-700 mb-4">Define roles and permissions for users and team members.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
            Manage Roles
          </button>
        </div>

        {/* Advanced Configuration */}
        <div className="border rounded-lg p-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
            <Sliders className="mr-2 text-green-700" /> Advanced Configuration
          </h3>
          <p className="text-green-700 mb-4">Access advanced settings for integrations, APIs, and platform customization.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300">
            Advanced Settings
          </button>
        </div>
      </div>

      {/* General Settings Overview Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 transition-colors duration-300">
          View All Platform Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsConfiguration;
