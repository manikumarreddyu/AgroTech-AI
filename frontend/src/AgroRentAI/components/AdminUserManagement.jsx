import React from "react";
import { Edit, UserPlus, Lock, Eye } from "lucide-react";

const UserManagement = ({ users, onEditUser, onSuspendUser, onViewDetails }) => (
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
      />
      <select className="p-2 border rounded-md">
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
        <option value="vendor">Vendor</option>
      </select>
    </div>

    <div className="space-y-4">
      {users.map((user) => (
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
                    : user.accountStatus === "suspended"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {user.accountStatus}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => onViewDetails(user.id)}
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
              >
                <Eye className="w-4 h-4 mr-1" /> View
              </button>
              <button
                onClick={() => onEditUser(user.id)}
                className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </button>
              <button
                onClick={() => onSuspendUser(user.id)}
                className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
              >
                <Lock className="w-4 h-4 mr-1" /> Suspend
              </button>
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
  </div>
);

export default UserManagement;
