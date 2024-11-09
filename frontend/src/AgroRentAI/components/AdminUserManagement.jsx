import React, { useState } from "react";
import { Edit, Lock, Eye } from "lucide-react";

const UserManagement = () => {
  // Dummy data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
      feedback: "Great service!",
      accountStatus: "active",
      createdAt: "2022-01-15",
      lastLogin: "2023-10-01",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "customer",
      feedback: "Needs improvement.",
      accountStatus: "suspended",
      createdAt: "2021-11-03",
      lastLogin: "2023-09-29",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "vendor",
      feedback: "Satisfied with the platform.",
      accountStatus: "active",
      createdAt: "2020-06-21",
      lastLogin: "2023-10-02",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.accountStatus === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle viewing user details
  const onViewDetails = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Handle editing user details
  const onEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Handle suspending user
  const onSuspendUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setIsSuspendModalOpen(true);
  };

  // Confirm suspension of user
  const confirmSuspendUser = () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, accountStatus: "suspended" }
            : user
        )
      );
      setIsSuspendModalOpen(false);
    }
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsSuspendModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        User Management
      </h2>

      {/* Search and Filter */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          className="p-2 border rounded-md w-1/3"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>
        <select
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200"
          >
            {/* User Info */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold text-green-700">{user.name}</p>
                <p className="text-sm text-gray-700 mb-1">{user.email}</p>
                <p className="text-green-600 text-sm">Role: {user.role}</p>
                <p className="text-gray-500 text-sm">
                  Feedback: {user.feedback || "No feedback available"}
                </p>
                <p
                  className={`text-sm ${
                    user.accountStatus === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {user.accountStatus}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewDetails(user.id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1" /> View
                </button>
                <button
                  onClick={() => onEditUser(user.id)}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </button>
                {user.accountStatus === "suspended" ? (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-3 py-2 rounded-md flex items-center"
                  >
                    <Lock className="w-4 h-4 mr-1" /> Suspended
                  </button>
                ) : (
                  <button
                    onClick={() => onSuspendUser(user.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 flex items-center"
                  >
                    <Lock className="w-4 h-4 mr-1" /> Suspend
                  </button>
                )}
              </div>
            </div>

            {/* More User Info */}
            <div className="text-gray-500 text-sm">
              <p>
                Account Created: <span className="font-semibold">{user.createdAt}</span>
              </p>
              <p>
                Last Login: <span className="font-semibold">{user.lastLogin}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Feedback:</strong> {selectedUser.feedback}</p>
            <button onClick={closeModals} className="mt-4 text-blue-600">Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="border rounded-md p-2 mb-4 w-full"
              placeholder="User name"
            />
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="border rounded-md p-2 mb-4 w-full"
              placeholder="User email"
            />
            <button onClick={closeModals} className="text-blue-600">Save</button>
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {isSuspendModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Suspend User</h3>
            <p>Are you sure you want to suspend {selectedUser.name}?</p>
            <button
              onClick={confirmSuspendUser}
              className="bg-red-600 text-white px-3 py-2 rounded-md mt-4"
            >
              Confirm Suspend
            </button>
            <button onClick={closeModals} className="ml-4 text-blue-600">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
