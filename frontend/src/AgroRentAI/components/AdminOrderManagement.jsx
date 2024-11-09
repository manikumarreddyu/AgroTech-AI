import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const OrderManagement = ({ orders, onOrderApproval, onOrderRejection }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
      Order Management
    </h2>

    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200"
        >
          {/* Order Details */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-lg font-semibold text-green-700">
                Item: {order.item}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                User: {order.user} | Order ID: {order.id}
              </p>
              <p className="text-green-600">
                Status: <span className="font-semibold">{order.status}</span> |{" "}
                Return Date: {order.returnDate}
              </p>
              <p className="text-gray-500 text-sm">
                Payment Status: {order.paymentStatus} | Tracking ID:{" "}
                {order.trackingId}
              </p>
            </div>
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => onOrderApproval(order.id)}
                className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Approve
              </button>
              <button
                onClick={() => onOrderRejection(order.id)}
                className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
              >
                <XCircle className="w-4 h-4 mr-1" /> Reject
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-gray-500 text-sm mt-2">
            <p>
              Order Date: <span className="font-semibold">{order.orderDate}</span>
            </p>
            <p>
              Customer Contact: {order.customerContact}
            </p>
            <p>
              Expected Delivery: <Clock className="inline-block w-4 h-4 mr-1" />
              {order.estimatedDelivery}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OrderManagement;
