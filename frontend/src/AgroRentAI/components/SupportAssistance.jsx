// SupportAssistanceComponent.js
import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react';

const SupportAssistanceComponent = () => (
  <div className="bg-white p-6 rounded-lg ">
    <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
      <HelpCircle className="mr-2 text-green-700" /> Support & Assistance
    </h3>
    <p className="text-gray-700 mb-4">We’re here to help with any questions or issues regarding your rentals and account.</p>
    
    <div className="space-y-6">
      {/* Open Support Ticket */}
      <div className="border rounded-lg p-4 shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200">
        <h4 className="text-lg font-semibold text-green-600 flex items-center mb-2">
          <MessageSquare className="mr-2" /> Open a Support Ticket
        </h4>
        <p className="text-gray-700 mb-3">Have an issue with your rental or account? Create a support ticket, and we’ll get back to you shortly.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
          Open Ticket
        </button>
      </div>

      {/* Contact Us Section */}
      <div className="border rounded-lg p-4 shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200">
        <h4 className="text-lg font-semibold text-green-600 flex items-center mb-2">
          <Phone className="mr-2" /> Contact Us
        </h4>
        <p className="text-gray-700 mb-3">Reach out directly to our support team for immediate assistance.</p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
            Call Us
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
            Email Us
          </button>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="border rounded-lg p-4 shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200">
        <h4 className="text-lg font-semibold text-green-600 flex items-center mb-2">
          <HelpCircle className="mr-2" /> Frequently Asked Questions
        </h4>
        <p className="text-gray-700 mb-3">Find quick answers to the most common questions regarding our rentals, billing, and policies.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
          Browse FAQs
        </button>
      </div>
    </div>
  </div>
);

export default SupportAssistanceComponent;
