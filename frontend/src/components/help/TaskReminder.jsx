// src/TaskReminder.jsx

import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

const TaskReminder = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage if available
    const savedTasks = localStorage.getItem('irrigationTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State to toggle task form visibility
  const [showTaskForm, setShowTaskForm] = useState(false);

  // State to manage new task input fields
  const [newTask, setNewTask] = useState({
    crop: '',
    date: '',
    time: '',
    notes: '',
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('irrigationTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Handle input changes for the new task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (newTask.crop && newTask.date && newTask.time) {
      const task = {
        id: Date.now(),
        ...newTask,
      };
      setTasks((prev) => [...prev, task]);
      setNewTask({
        crop: '',
        date: '',
        time: '',
        notes: '',
      });
      setShowTaskForm(false);
      // Schedule notification
      scheduleNotification(task);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Schedule browser notification for the task
  const scheduleNotification = (task) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const taskDateTime = new Date(`${task.date}T${task.time}`);
      const now = new Date();
      const timeDifference = taskDateTime.getTime() - now.getTime();

      if (timeDifference > 0) {
        setTimeout(() => {
          new Notification('Irrigation Reminder', {
            body: `It's time to irrigate ${task.crop}.`,
            icon: 'https://img.icons8.com/color/48/000000/plant.png',
          });
        }, timeDifference);
      }
    }
  };

  // Handle task deletion
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8  rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold mb-4 text-teal-700">Irrigation Task Reminders</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowTaskForm(!showTaskForm)}
      >
        {showTaskForm ? 'Cancel' : 'Add New Task'}
      </button>

      {showTaskForm && (
        <form className="mb-6" onSubmit={handleTaskSubmit}>
          <div className="mb-4">
            <label htmlFor="crop" className="block text-teal-700 mb-2">Crop:</label>
            <input
              type="text"
              id="crop"
              name="crop"
              value={newTask.crop}
              onChange={handleInputChange}
              className="w-full p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
              placeholder="Enter crop name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-teal-700 mb-2">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newTask.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-teal-700 mb-2">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={newTask.time}
              onChange={handleInputChange}
              className="w-full p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block text-teal-700 mb-2">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={newTask.notes}
              onChange={handleInputChange}
              className="w-full p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Any additional notes"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Schedule Task
          </button>
        </form>
      )}

      {/* Display Scheduled Tasks */}
      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="my-2 p-4 border border-teal-700 rounded bg-teal-100 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{task.crop}</p>
                  <p>{format(parseISO(task.date), 'MMMM d, yyyy')} at {task.time}</p>
                  {task.notes && <p className="text-sm italic">{task.notes}</p>}
                </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No irrigation tasks scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default TaskReminder;
