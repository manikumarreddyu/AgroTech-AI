import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import img from "../../assets/102.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskReminder = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('irrigationTasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({
        crop: '',
        date: '',
        time: '',
        notes: '',
        to: ''
    });

    useEffect(() => {
        localStorage.setItem('irrigationTasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        if (newTask.crop && newTask.date && newTask.time && newTask.to) {
            const task = {
                id: Date.now(),
                ...newTask,
            };
            setTasks((prev) => [...prev, task]);
            setNewTask({ crop: '', date: '', time: '', notes: '', to: '' });
            setShowTaskForm(false);
            scheduleNotification(task);
            await sendEmailNotification(task, 'created');
            
            toast.success(`Task for ${task.crop} scheduled successfully!`);
        } else {
            toast.error('Please fill in all required fields.');
        }
    };

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
                    sendEmailNotification(task, 'reminder'); 
                }, timeDifference);
            }
        }
    };

    const sendEmailNotification = async (task, action) => {
        const subjects = {
            created: 'New Task Created',
            updated: 'Task Updated',
            reminder: 'Irrigation Reminder',
        };

        const bodies = {
            created: `A new task has been created for ${task.crop} on ${task.date} at ${task.time}. Notes: ${task.notes}`,
            updated: `Task for ${task.crop} has been updated. New details: ${task.date} at ${task.time}. Notes: ${task.notes}`,
            reminder: `It's time to irrigate ${task.crop} on ${task.date} at ${task.time}. Notes: ${task.notes}`,
        };

        try {
            await axios.post('/api/send-email', {
                to: task.to,
                subject: subjects[action],
                body: bodies[action],
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleDeleteTask = (id) => {
        const deletedTask = tasks.find(task => task.id === id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
        toast.error(`Task for ${deletedTask.crop} deleted successfully!`);
    };

    const handleEditTask = (task) => {
        setNewTask(task);
        setEditingTask(task.id);
        setShowTaskForm(true);
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (newTask.crop && newTask.date && newTask.time && newTask.to) {
            const updatedTask = {
                ...newTask,
            };
            setTasks((prev) =>
                prev.map((task) => (task.id === editingTask ? { ...task, ...updatedTask } : task))
            );
            await sendEmailNotification(updatedTask, 'updated');
            setNewTask({ crop: '', date: '', time: '', notes: '', to: '' });
            setShowTaskForm(false);
            setEditingTask(null);
            toast.success(`Task for ${updatedTask.crop} updated successfully!`);
        } else {
            toast.error('Please fill in all required fields.');
        }
    };


    return (
        <div className="flex items-center justify-center bg-gray-100">
        <div className="w-1/2 max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8 rounded-lg shadow-lg bg-white" style={{ backgroundImage: `url(${img})` }}>
            <div className="content flex-1 overflow-y-auto p-4">
                <h2 className="text-2xl font-semibold mb-4 text-teal-700">Irrigation Task Reminders</h2>

                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    onClick={() => setShowTaskForm(!showTaskForm)}
                >
                    {showTaskForm ? 'Cancel' : 'Add New Task'}
                </button>

                {showTaskForm && (
                    <form className="mb-6" onSubmit={editingTask ? handleUpdateTask : handleTaskSubmit}>
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
                        <label htmlFor="to" className="block text-teal-700 mb-2">To (Email):</label>
                        <input
                            type="email"
                            id="to"
                            name="to"
                            value={newTask.to}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-teal-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                            placeholder="Enter recipient's email"
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
                        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                    >
                        {editingTask ? 'Update Task' : 'Schedule Task'}
                    </button>
                    </form>
                )}

                <div>
                    {tasks.length > 0 ? (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id} className="flex justify-between items-center mb-2 p-2 border border-teal-700 rounded">
                                    <div>
                                    <p className="font-semibold text-white">{task.crop}</p>
                                    <p className="text-white">{format(parseISO(task.date), 'MMMM do, yyyy')} at {task.time}</p>
                                    {task.notes && <p className="text-white italic">Notes: {task.notes}</p>}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEditTask(task)}
                                        className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white">No tasks scheduled.</p>
                    )}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    </div>
    );
};

export default TaskReminder;
