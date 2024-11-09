import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const ApiUrl = process.env.NODE_ENV === 'production'
    ? 'https://agrotech-ai-11j3.onrender.com'
    : 'http://localhost:8080';

  // Fetch all orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiUrl}/api/rent-orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const onOrderApproval = async (rentalId) => {
    try {
      await axios.put(`${ApiUrl}/api/rent-orders/${rentalId}`, { status: "approved" });
      setOrders(orders.map(order => order.rentalId === rentalId ? { ...order, status: "approved" } : order));
      toast.success("Order approved successfully!"); // Success toast
    } catch (error) {
      console.error("Error approving order:", error);
      toast.error("Error approving order!"); // Error toast
    }
  };

  const onOrderRejection = async (rentalId) => {
    try {
      await axios.put(`${ApiUrl}/api/rent-orders/${rentalId}`, { status: "rejected" });
      setOrders(orders.map(order => order.rentalId === rentalId ? { ...order, status: "rejected" } : order));
      toast.success("Order rejected successfully!"); // Success toast
    } catch (error) {
      console.error("Error rejecting order:", error);
      toast.error("Error rejecting order!"); // Error toast
    }
  };

  // Handle selection of multiple orders for bulk actions
  const toggleOrderSelection = (rentalId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(rentalId)
        ? prevSelected.filter((id) => id !== rentalId)
        : [...prevSelected, rentalId]
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]); // Deselect all if all are selected
    } else {
      setSelectedOrders(orders.map(order => order.rentalId)); // Select all orders
    }
  };

  // Bulk update selected orders
  const bulkUpdateOrders = async (status) => {
    try {
      await axios.put(`${ApiUrl}/api/rent-orders/bulk-update`, { rentalIds: selectedOrders, status });
      setOrders(orders.map(order =>
        selectedOrders.includes(order.rentalId)
          ? { ...order, status }
          : order
      ));
      setSelectedOrders([]); // Clear selected orders after bulk update
      toast.success("Bulk update successful!"); // Success toast
    } catch (error) {
      console.error("Error updating orders:", error);
      toast.error("Error updating orders!"); // Error toast
    }
  };

  // Delete an order
  const onDeleteOrder = async (rentalId) => {
    try {
      await axios.delete(`${ApiUrl}/api/rent-orders/${rentalId}`);
      setOrders(orders.filter((order) => order.rentalId !== rentalId));
      toast.success("Order deleted successfully!"); // Success toast
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order!"); // Error toast
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Order Management</h2>

      {/* Bulk Actions */}
      <div className="mb-4">
        <button
          onClick={() => bulkUpdateOrders("approved")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
          disabled={selectedOrders.length === 0}
        >
          Approve Selected
        </button>
        <button
          onClick={() => bulkUpdateOrders("rejected")}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2"
          disabled={selectedOrders.length === 0}
        >
          Reject Selected
        </button>
      </div>

      {/* Select All Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={selectedOrders.length === orders.length}
          onChange={handleSelectAll}
          className="mr-2"
        />
        <span>Select All</span>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.rentalId}
            className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200"
          >
            {/* Order Details */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-lg font-semibold text-green-700">Item: {order.item}</p>
                <p className="text-sm text-gray-700 mb-1">
                  User: {order.user} | Order ID: {order.rentalId}
                </p>
                <p className="text-green-600">
                  Status: <span className="font-semibold">{order.status}</span> | Return Date: {order.returnDate}
                </p>
                <p className="text-gray-500 text-sm">
                  Payment Status: {order.paymentStatus} | Tracking ID: {order.trackingId}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.rentalId)}
                  onChange={() => toggleOrderSelection(order.rentalId)}
                  className="mr-2"
                />
                <button
                  onClick={() => onOrderApproval(order.rentalId)}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Approve
                </button>
                <button
                  onClick={() => onOrderRejection(order.rentalId)}
                  className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Reject
                </button>
                <button
                  onClick={() => onDeleteOrder(order.rentalId)}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Delete
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
};

export default OrderManagement;
