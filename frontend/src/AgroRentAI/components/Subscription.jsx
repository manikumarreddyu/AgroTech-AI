// SubscriptionMembershipComponent.js
import React from 'react';
import { BadgeCheck, CheckCircle, Info, RefreshCcw, XCircle } from 'lucide-react';

const SubscriptionMembershipComponent = () => (
  <div className="bg-white p-6 rounded-lg ">
    <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
      <BadgeCheck className="mr-2 text-green-600" />
      Subscription & Membership
    </h3>
    <p className="text-gray-700 mb-6">
      Manage your membership plan and explore exclusive benefits to maximize your rental experience.
    </p>

    {/* Current Plan Section */}
    <div className="border rounded-lg p-4 mb-6 bg-green-50 shadow-sm">
      <h4 className="text-lg font-semibold text-green-600 flex items-center mb-3">
        <CheckCircle className="mr-2" /> Current Plan: <span className="ml-2 font-bold text-green-800">Premium</span>
      </h4>
      <p className="text-gray-700 mb-4">You are currently on the Premium plan with access to all features, including:</p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Unlimited rentals per month</li>
        <li>Priority customer support</li>
        <li>Exclusive access to new equipment</li>
        <li>Discounts on all rentals</li>
      </ul>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
        View Benefits
      </button>
    </div>

    {/* Upgrade Plan Section */}
    <div className="border rounded-lg p-4 mb-6 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
      <h4 className="text-lg font-semibold text-green-600 flex items-center mb-3">
        <Info className="mr-2" /> Interested in Upgrading?
      </h4>
      <p className="text-gray-700 mb-4">
        Discover additional benefits with our Elite membership, designed for professionals who need regular equipment rentals.
      </p>
      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
        Explore Elite Membership
      </button>
    </div>

    {/* Manage Subscription Section */}
    <div className="border rounded-lg p-4 bg-green-50 shadow-sm hover:bg-green-100 transition-colors duration-200">
      <h4 className="text-lg font-semibold text-green-600 flex items-center mb-3">
        <RefreshCcw className="mr-2" /> Manage Subscription
      </h4>
      <p className="text-gray-700 mb-4">Update your subscription or cancel anytime from this section.</p>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors duration-300">
          Change Plan
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
          Cancel Membership
        </button>
      </div>
    </div>
  </div>
);

export default SubscriptionMembershipComponent;
