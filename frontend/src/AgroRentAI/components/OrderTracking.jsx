// OrderDeliveryTrackingComponent.js
import React from 'react';
import { Truck, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const OrderDeliveryTrackingComponent = ({ rentals }) => (
  <div className="bg-white p-6 rounded-lg ">
  <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
      <Truck className="mr-2 text-green-600" />
      Order & Delivery Tracking
    </h3>
    <ul className="space-y-6">
      {rentals.map((rental, index) => (
        <li key={index} className="p-4 border rounded-lg bg-green-50 shadow-md hover:bg-green-100 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-green-800">{rental.name}</h4>
            <p className={`text-sm px-3 py-1 rounded-md ${rental.status === 'Active' ? 'bg-yellow-300 text-yellow-900' : 'bg-green-300 text-green-900'}`}>
              {rental.status}
            </p>
          </div>

          {/* Tracking Details */}
          <div className="mb-3 text-gray-700">
            <p><strong>Expected Delivery:</strong> {rental.expectedDelivery || "N/A"}</p>
            <p><strong>Rental Period:</strong> {rental.duration}</p>
            <p><strong>Tracking ID:</strong> {rental.trackingId || 'Unavailable'}</p>
          </div>

          {/* Tracking Progress Bar */}
          <div className="my-4">
            <p className="text-sm font-semibold mb-2">Delivery Progress:</p>
            <div className="relative w-full bg-gray-200 rounded-full h-3">
              <div className="absolute top-0 left-0 h-3 rounded-full bg-green-600" style={{ width: `${rental.progress || 0}%` }}></div>
            </div>
            <p className="text-sm mt-2 text-gray-500">{rental.progress}% Completed</p>
          </div>

          {/* Contact & Support */}
          <div className="flex items-center mt-4">
            <Truck className="text-green-700 mr-2" />
            <p className="text-gray-600 text-sm">Questions? <a href="/contact-support" className="text-green-600 font-semibold hover:underline">Contact Support</a></p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default OrderDeliveryTrackingComponent;
