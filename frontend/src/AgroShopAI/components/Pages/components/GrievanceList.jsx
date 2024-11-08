// components/GrievanceList.js
import { useState } from "react";

export const GrievanceList = () => {
  const [grievances, setGrievances] = useState([
    {
      id: 1,
      issue: "Delayed seed delivery",
      status: "pending",
      date: new Date("2024-10-01"),
    },
    {
      id: 2,
      issue: "Incorrect fertilizer information",
      status: "ongoing",
      date: new Date("2024-10-02"),
    },
    {
      id: 3,
      issue: "Payment not reflected",
      status: "solved",
      date: new Date("2024-10-03"),
    },
    {
      id: 4,
      issue: "Poor quality produce received",
      status: "pending",
      date: new Date("2024-10-04"),
    },
    {
      id: 5,
      issue: "Unable to cancel order",
      status: "ongoing",
      date: new Date("2024-10-05"),
    },
    {
      id: 6,
      issue: "Wrong delivery address",
      status: "solved",
      date: new Date("2024-10-06"),
    },
    {
      id: 7,
      issue: "Damaged equipment",
      status: "pending",
      date: new Date("2024-10-07"),
    },
    {
      id: 8,
      issue: "Lack of communication from customer service",
      status: "ongoing",
      date: new Date("2024-10-08"),
    },
    {
      id: 9,
      issue: "Incorrect product received",
      status: "solved",
      date: new Date("2024-10-09"),
    },
    {
      id: 10,
      issue: "Refund not processed",
      status: "pending",
      date: new Date("2024-10-10"),
    },
    {
      id: 11,
      issue: "Broken packaging",
      status: "pending",
      date: new Date("2024-10-11"),
    },
    {
      id: 12,
      issue: "Delayed refund",
      status: "ongoing",
      date: new Date("2024-10-12"),
    },
    {
      id: 13,
      issue: "Wrong product description",
      status: "solved",
      date: new Date("2024-10-13"),
    },
    {
      id: 14,
      issue: "Unresponsive support",
      status: "pending",
      date: new Date("2024-10-14"),
    },
    {
      id: 15,
      issue: "Delayed shipment",
      status: "ongoing",
      date: new Date("2024-10-15"),
    },
    {
      id: 16,
      issue: "Missing parts in order",
      status: "solved",
      date: new Date("2024-10-16"),
    },
    {
      id: 17,
      issue: "Product quality issues",
      status: "pending",
      date: new Date("2024-10-17"),
    },
    {
      id: 18,
      issue: "Order not delivered",
      status: "pending",
      date: new Date("2024-10-18"),
    },
    {
      id: 19,
      issue: "Wrong billing amount",
      status: "solved",
      date: new Date("2024-10-19"),
    },
    {
      id: 20,
      issue: "Order mixed up with another customer",
      status: "ongoing",
      date: new Date("2024-10-20"),
    },
  ]);
  const [filteredGrievances, setFilteredGrievances] = useState(grievances);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newIssue, setNewIssue] = useState("");

  // Handle search/filter
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredGrievances(
      grievances.filter((g) => g.issue.toLowerCase().includes(term))
    );
  };

  // Update status
  const updateStatus = (id, newStatus) => {
    setGrievances(
      grievances.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
    );
    setFilteredGrievances(
      filteredGrievances.map((g) =>
        g.id === id ? { ...g, status: newStatus } : g
      )
    );
  };

  // Add a new grievance
  const addGrievance = () => {
    if (!newIssue.trim()) return alert("Please provide a valid issue");
    const newGrievance = {
      id: grievances.length + 1,
      issue: newIssue,
      status: "pending",
      date: new Date(),
    };
    setGrievances([...grievances, newGrievance]);
    setFilteredGrievances([...filteredGrievances, newGrievance]);
    setShowModal(false);
    setNewIssue("");
  };

  // Confirm delete
  const confirmDelete = (id) => {
    setDeleteConfirmation(id);
  };

  const handleDelete = (id) => {
    setGrievances(grievances.filter((g) => g.id !== id));
    setFilteredGrievances(filteredGrievances.filter((g) => g.id !== id));
    setDeleteConfirmation(null);
  };

  const cancelDelete = () => setDeleteConfirmation(null);

  // Sort grievances by date
  const sortByDate = () => {
    const sortedGrievances = [...filteredGrievances].sort(
      (a, b) => b.date - a.date
    );
    setFilteredGrievances(sortedGrievances);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Customer Grievances</h3>

      {/* Add Grievance Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h4 className="text-xl font-semibold mb-4">Add New Grievance</h4>
            <textarea
              value={newIssue}
              onChange={(e) => setNewIssue(e.target.value)}
              placeholder="Describe the grievance..."
              className="border w-full rounded px-2 py-1 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={addGrievance}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search grievances..."
          className="border px-4 py-2 rounded w-1/3"
        />
        <button
          onClick={sortByDate}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Sort by Date
        </button>
      </div>

      {/* Grievance Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Issue</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrievances.map((grievance) => (
            <tr key={grievance.id} className="border-b">
              <td className="px-4 py-2">{grievance.id}</td>
              <td className="px-4 py-2">{grievance.issue}</td>
              <td className="px-4 py-2">
                {grievance.date.toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <select
                  value={grievance.status}
                  onChange={(e) => updateStatus(grievance.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="solved">Solved</option>
                </select>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => updateStatus(grievance.id, "solved")}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Mark as Solved
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => confirmDelete(grievance.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h4 className="text-xl font-semibold mb-4">Are you sure?</h4>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(deleteConfirmation)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
      >
        Add New Grievance
      </button>
    </div>
  );
};
