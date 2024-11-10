// SecurityPrivacyComponent.js
import React from 'react';
import { Lock, Eye, Shield, Settings } from 'lucide-react';

const SecurityPrivacyComponent = () => (
  <div className="bg-white p-6 rounded-lg ">
    <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
      <Shield className="mr-2 text-green-700" /> Security & Privacy
    </h3>
    <p className="text-gray-700 mb-4">Manage your privacy settings and security options to keep your account safe.</p>
    
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="border rounded-lg p-4 shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200">
        <h4 className="text-lg font-semibold text-green-600 flex items-center mb-2">
          <Lock className="mr-2" /> Two-Factor Authentication
        </h4>
        <p className="text-gray-700 mb-3">Add an extra layer of security by enabling two-factor authentication.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
          Enable Two-Factor Authentication
        </button>
      </div>

      {/* Data Visibility Controls */}
      <div className="border rounded-lg p-4 shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200">
        <h4 className="text-lg font-semibold text-green-600 flex items-center mb-2">
          <Eye className="mr-2" /> Data Visibility
        </h4>
        <p className="text-gray-700 mb-3">Control who can see your profile information and activity on the platform.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
          Manage Visibility
        </button>
      </div>

      {/* Privacy Settings */}
      <div className="border rounded-lg p-4 shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200">
        <h4 className="text-lg font-semibold text-green-600 flex items-center mb-2">
          <Settings className="mr-2" /> Privacy Settings
        </h4>
        <p className="text-gray-700 mb-3">Adjust your preferences for marketing emails, notifications, and personalized ads.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
          Configure Privacy Settings
        </button>
      </div>
    </div>
  </div>
);

export default SecurityPrivacyComponent;
