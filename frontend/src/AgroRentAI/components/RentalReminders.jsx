// src/components/RentalReminders.js
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const RentalRemindersComponent = () => {
  // Dummy reminders data
  const reminders = [
    {
      id: 1,
      itemName: "Tractor",
      dueDate: "2024-11-15",
      status: "Active",
      duration: 7,
      remainingDays: 3,
      cost: 150,
    },
    {
      id: 2,
      itemName: "Plow",
      dueDate: "2024-11-18",
      status: "Active",
      duration: 5,
      remainingDays: 6,
      cost: 80,
    },
    {
      id: 3,
      itemName: "Seeder",
      dueDate: "2024-11-20",
      status: "Overdue",
      duration: 10,
      remainingDays: -2,
      cost: 200,
    },
  ];

  const handleExtendRental = (id) => {
    toast.success(`Extend rental for item ID: ${id}`);
  };

  const handleViewDetails = (id) => {
   return;
  };

  const handleContactSupport = (id) => {
  return
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
        <ToastContainer/>
      <h3 className="text-xl font-semibold text-green-700 mb-4">Rental Reminders</h3>
      {reminders.length > 0 ? (
        reminders.map((reminder) => (
          <div key={reminder.id} className="p-4 mb-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-gray-800">{reminder.itemName}</h4>
              <span className="text-sm text-gray-600">Due Date: {reminder.dueDate}</span>
            </div>

            <div className="text-gray-800 mb-2">
              <p><strong>Status:</strong> {reminder.status}</p>
              <p><strong>Rental Duration:</strong> {reminder.duration} days</p>
              <p><strong>Days Left:</strong> {reminder.remainingDays >= 0 ? `${reminder.remainingDays} days` : "Overdue"}</p>
              <p><strong>Total Rental Cost:</strong> ${reminder.cost}</p>
            </div>

            <div className="flex items-center space-x-4 mt-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm"
                onClick={() => handleExtendRental(reminder.id)}
              >
                Extend Rental
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg text-sm"
                onClick={() => handleViewDetails(reminder.id)}
              >
                View Details
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
                onClick={() => handleContactSupport(reminder.id)}
              >
                Contact Support
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No rental reminders at this time.</p>
      )}
    </div>
  );
};

export default RentalRemindersComponent;
