import React, { useState, useEffect } from 'react';
import img1 from "../../assets/tp.png";

const PlantTaskReminder = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');

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
    setTaskName('');
    setTaskTime('');
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const sortedTasks = tasks.sort((a, b) => a.time - b.time);

  useEffect(() => {
    tasks.forEach((task) => {
      const now = new Date();
      const timeDifference = task.time - now;

      if (timeDifference > 0) {
        const timer = setTimeout(() => {
          alert(`🌿 Reminder: Time to "${task.name}" for your plant care! 🌱`);
        }, timeDifference);

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
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>

      <div className="relative bg-white bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl p-10 w-full max-w-md text-center transition-all duration-300 transform hover:scale-105">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Plant Task Reminder</h1>
        <p className="mb-6 text-gray-600 text-lg">Keep your plants happy and healthy!</p>

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

        <ul className="mt-8 space-y-4">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <li
                key={task.id}
                className="relative bg-green-50 bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200"
              >
                <button
                  onClick={() => deleteTask(task.id)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
                  style={{ fontSize: '1rem', lineHeight: '0' }}
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
      </div>
    </div>
  );
};

export default PlantTaskReminder;
