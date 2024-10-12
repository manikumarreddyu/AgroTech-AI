import React, { useState, useEffect } from 'react';

const PlantTaskReminder = () => {
  const [tasks, setTasks] = useState([]);
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

  // Function to display tasks sorted by time
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-400 p-4 mt-10">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Plant Task Reminder</h1>
        <p className="mb-6 text-gray-700">Keep your plants happy and healthy!</p>
        
        <form onSubmit={addTask} className="flex flex-col">
          <input
            type="text"
            id="taskInput"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter plant task..."
            required
            className="mb-4 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          />
          <input
            type="datetime-local"
            id="timeInput"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            required
            className="mb-4 p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition transform hover:-translate-y-1"
          >
            Add Task
          </button>
        </form>

        <ul className="mt-6 space-y-3">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <li
                key={task.id}
                className="bg-green-100 p-4 rounded-md shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              >
                <p className="font-semibold text-green-700">{task.name}</p>
                <p className="text-gray-600">
                  Due: {task.time.toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tasks added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PlantTaskReminder;
