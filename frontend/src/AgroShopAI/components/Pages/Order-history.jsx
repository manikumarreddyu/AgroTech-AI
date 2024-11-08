import { useState } from "react";

// Dummy data
const dummyOrders = [
  {
    id: "ORD-001",
    date: "2023-05-15",
    totalAmount: 156.99,
    paymentStatus: "Paid",
    items: [
      { name: "Organic Tomatoes", quantity: 2, price: 4.99 },
      { name: "Fresh Basil", quantity: 1, price: 2.99 },
      { name: "Free-range Eggs", quantity: 2, price: 5.99 },
    ],
    shippingDetails: {
      address: "123 Green St",
      city: "Farmville",
      postalCode: "12345",
    },
  },
  {
    id: "ORD-002",
    date: "2023-05-18",
    totalAmount: 89.97,
    paymentStatus: "Pending",
    items: [
      { name: "Organic Apples", quantity: 3, price: 3.99 },
      { name: "Whole Grain Bread", quantity: 2, price: 4.99 },
      { name: "Grass-fed Beef", quantity: 1, price: 15.99 },
    ],
    shippingDetails: {
      address: "456 Harvest Rd",
      city: "Croptown",
      postalCode: "67890",
    },
  },
  {
    id: "ORD-003",
    date: "2023-05-20",
    totalAmount: 210.95,
    paymentStatus: "Paid",
    items: [
      { name: "Organic Milk", quantity: 2, price: 4.99 },
      { name: "Heirloom Carrots", quantity: 1, price: 3.99 },
      { name: "Artisanal Cheese", quantity: 1, price: 12.99 },
    ],
    shippingDetails: {
      address: "789 Orchard Ln",
      city: "Grainville",
      postalCode: "13579",
    },
  },
  {
    id: "ORD-004",
    date: "2023-05-22",
    totalAmount: 45.98,
    paymentStatus: "Failed",
    items: [
      { name: "Organic Spinach", quantity: 2, price: 3.99 },
      { name: "Free-range Chicken", quantity: 1, price: 12.99 },
      { name: "Organic Honey", quantity: 1, price: 8.99 },
    ],
    shippingDetails: {
      address: "101 Meadow Ave",
      city: "Pastureland",
      postalCode: "24680",
    },
  },
  {
    id: "ORD-005",
    date: "2023-05-25",
    totalAmount: 178.95,
    paymentStatus: "Paid",
    items: [
      { name: "Organic Strawberries", quantity: 3, price: 5.99 },
      { name: "Grass-fed Yogurt", quantity: 2, price: 4.99 },
      { name: "Organic Quinoa", quantity: 1, price: 7.99 },
    ],
    shippingDetails: {
      address: "202 Sunny Fields",
      city: "Harvestville",
      postalCode: "35791",
    },
  },
];

// Modal component for order details
const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-green-800">
          Order Details - #{order.id}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold">{order.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p
              className={`font-semibold ${
                order.paymentStatus === "Paid"
                  ? "text-green-600"
                  : order.paymentStatus === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {order.paymentStatus}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-green-700">Items</h3>
        <ul className="mb-6 divide-y divide-gray-200">
          {order.items.map((item, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-green-700">
          Shipping Details
        </h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p>{order.shippingDetails.address}</p>
          <p>
            {order.shippingDetails.city}, {order.shippingDetails.postalCode}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main component
export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = (useState < Order) | (null > null);
  const ordersPerPage = 5;
  const totalPages = Math.ceil(dummyOrders.length / ordersPerPage);

  const getCurrentPageOrders = () => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return dummyOrders.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">
        AgroShop Order History
      </h1>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getCurrentPageOrders().map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-green-600 hover:text-green-900 transition-colors focus:outline-none focus:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * ordersPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * ordersPerPage, dummyOrders.length)}
                </span>{" "}
                of <span className="font-medium">{dummyOrders.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-green-50 border-green-500 text-green-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
