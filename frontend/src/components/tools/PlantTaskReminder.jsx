import React, { useState, useEffect } from 'react';
import img1 from "../../assets/tp.png";

const PlantTaskReminder = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');

  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault();

    if (!taskName || !taskTime) {
      alert('Please enter both task name and time.');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      time: new Date(taskTime),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Clear input fields
    setTaskName('');
    setTaskTime('');
  };

  // Function to delete a task and move it to deletedTasks
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => {
      if (task.id === taskId) setDeletedTasks([...deletedTasks, task]);
      return task.id !== taskId;
    }));
  };

  // Function to open and close modal
  const toggleModal = () => setShowModal(!showModal);

  // Function to clear history
  const clearHistory = () => setDeletedTasks([]);

  // Sort tasks by time
  const sortedTasks = tasks.sort((a, b) => a.time - b.time);

  // Effect to set reminders
  useEffect(() => {
    tasks.forEach((task) => {
      const now = new Date();
      const timeDifference = task.time - now;

      if (timeDifference > 0) {
        const timer = setTimeout(() => {
          alert(`🌿 Reminder: Time to "${task.name}" for your plant care! 🌱`);
        }, timeDifference);

        // Cleanup the timer if the component unmounts or tasks change
        return () => clearTimeout(timer);
      } else {
        alert(`⚠️ The time for the task "${task.name}" has already passed!`);
      }
    });
  }, [tasks]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 mt-12 relative"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blackish overlay with backdrop filter effect */}
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>

      {/* Form Container */}
      <div className="relative bg-white bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl p-10 w-full max-w-md text-center transition-all duration-300 transform hover:scale-105">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Plant Task Reminder</h1>
        <p className="mb-6 text-gray-600 text-lg">Keep your plants happy and healthy!</p>

        {/* Form Section */}
        <form onSubmit={addTask} className="flex flex-col space-y-4">
          <input
            type="text"
            id="taskInput"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter plant task..."
            required
            className="p-4 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
          />
          <input
            type="datetime-local"
            id="timeInput"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            required
            className="p-4 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition transform hover:-translate-y-1 duration-200"
          >
            Add Task
          </button>
        </form>

        {/* Tasks List */}
        <ul className="mt-8 space-y-4">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <li
                key={task.id}
                className="relative bg-green-50 bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200"
              >
                <button
                  onClick={() => deleteTask(task.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                >
                  &times;
                </button>
                <p className="font-semibold text-green-700">{task.name}</p>
                <p className="text-gray-500 text-sm">
                  Due: {task.time.toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tasks added yet.</p>
          )}
        </ul>

        {/* View History Button */}
        <button
          onClick={toggleModal}
          className="mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          View History
        </button>
      </div>

      {/* Modal for Deleted Tasks */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Deleted Tasks</h2>
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <ul className="space-y-2 mb-4">
              {deletedTasks.length > 0 ? (
                deletedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="bg-gray-100 p-3 rounded-lg shadow-sm text-gray-600"
                  >
                    <p>{task.name}</p>
                    <p className="text-xs text-gray-400">
                      Deleted at: {task.time.toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No deleted tasks.</p>
              )}
            </ul>
            {/* Clear History Button */}
            <button
              onClick={clearHistory}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Clear History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantTaskReminder;
