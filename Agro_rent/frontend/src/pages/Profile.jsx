import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const Profile = () => {
    const [selectedView, setSelectedView] = useState('myTools');
    const [userMachines, setUserMachines] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: '', email: '' });
    const [userId, setUserId] = useState('');
    const [loadingMachines, setLoadingMachines] = useState(true);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            axios.get(`${BASE_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUsername(response.data.user.name);
                    setUserId(response.data.user._id);
                    setEditedUser({ name: response.data.user.name, email: response.data.user.email });
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (userId && token) {
            fetchUserMachines(token);
            fetchUserBookings(token);
        }
    }, [userId]);

    const fetchUserMachines = async (token) => {
        setLoadingMachines(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/profile/machines/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserMachines(response.data);
        } catch (error) {
            console.error("Error fetching user machines:", error);
        } finally {
            setLoadingMachines(false);
        }
    };

    const fetchUserBookings = async (token) => {
        setLoadingBookings(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/profile/bookings/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserBookings(response.data);
        } catch (error) {
            console.error("Error fetching user bookings:", error);
        } finally {
            setLoadingBookings(false);
        }
    };

    const handleEditProfile = () => {
        setEditMode(!editMode);
    };

    const handleSaveProfile = () => {
        console.log("Edited User:", editedUser);
        setEditMode(false);
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex flex-grow p-14'>
                {/* Profile Section */}
                <div className='w-1/5'>
                    <div className='flex flex-col mx-3 px-1 py-10 mt-7 items-center bg-[#f0f0f0] rounded-xl shadow-md shadow-zinc-300'>
                        <img src="../src/assets/avatar.jpg" alt="" className='rounded-full w-52 object-cover' />
                        {editMode ? (
                            <TextField
                                value={editedUser.name}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                label="Name"
                                variant='standard'
                                className="mt-3"
                            />
                        ) : (
                            <h1 className='text-xl mt-3'>{username}</h1>
                        )}
                        <div className='mt-3'>
                            {editMode ? (
                                <TextField
                                    value={editedUser.email}
                                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    label="Email"
                                    variant='standard'
                                    className="text-xl"
                                />
                            ) : (
                                <p className='text-xl'>{editedUser.mobile}</p>
                            )}
                        </div>
                        {editMode ? (
                            <Button
                                variant="contained"
                                color="success"
                                className="mt-8"
                                onClick={handleSaveProfile}
                            >
                                Save Profile
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                className="mt-8"
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                {/* Tools Section */}
                <div className='w-4/5 bg-white rounded-3xl p-3'>
                    <div className="flex mt-4 p-8 border-b border-zinc-600 pb-2">
                        <button className={`text-[#2a7f62] border-r border-zinc-600 font-bold py-2 px-4 ${selectedView === 'myTools' ? 'text-[#193a2f]' : ''}`} onClick={() => setSelectedView('myTools')}>My Tools</button>
                        <button className={`text-[#2a7f62] font-bold py-2 px-4 ${selectedView === 'onRentTools' ? 'text-[#193a2f]' : ''}`} onClick={() => setSelectedView('onRentTools')}>Rent Tools</button>
                    </div>
                    <div className='flex flex-wrap gap-4 mt-8 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
                        {selectedView === 'myTools' ? (
                            loadingMachines ? (
                                <p>Loading machines...</p>
                            ) : (
                                userMachines.map(machine => (
                                    <div key={machine._id} className="bg-zinc-100 p-4 rounded-2xl shadow-md">
                                        <img
                                            src={`${machine?.name === 'Tractor' ? '/tractor.png' : '/harvestor.png'}`}
                                            className="w-[150px] h-[150px] object-cover"
                                            alt={machine.img[0].filename}
                                        />
                                        <h2 className="text-lg font-bold text-[#41676a] mt-5">{machine.name}</h2>
                                        <p className="text-gray-600">Company: {machine.company}</p>
                                        <p className="text-gray-600">Description: {machine.description}</p>
                                        <p className="text-gray-600">Availability: {machine.availability}</p>
                                        <p className="text-gray-600">Rental Price: ₹{machine.rentalPrice}</p>
                                    </div>
                                ))
                            )
                        ) : (
                            loadingBookings ? (
                                <p>Loading bookings...</p>
                            ) : (
                                userBookings.map(booking => (
                                    <div key={booking._id} className="bg-zinc-100 p-4 rounded-2xl shadow-md">
                                        {booking.machineId && booking.machineId.img ? (
                                            <img
                                                src={`${booking.machineId.name === 'Tractor' ? '/tractor.png' : '/harvestor.png'}`}
                                                alt={booking.machineId.name}
                                                className="w-[150px] h-[150px] object-cover"
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                        <h2 className="text-lg font-bold text-[#41676a] mt-7">Booking for {booking.machineId ? booking.machineId.name : 'N/A'}</h2>
                                        <p className="text-gray-600">Owner: {booking.userId ? booking.userId.name : 'N/A'}</p>
                                        <p className="text-gray-600">Booking Status: {booking.status}</p>
                                        <p className="text-gray-600">Payment Status: {booking.paymentStatus}</p>
                                        <p className="text-gray-600">Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                                        <p className="text-gray-600">End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
                                        <p className="text-gray-600">Total Duration: {booking.totalDuration} day(s)</p>
                                        <p className="text-gray-600">Total Cost: ₹{booking.totalCost}</p>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
