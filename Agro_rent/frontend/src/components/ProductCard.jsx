import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import axios from 'axios'; // Ensure you import axios

const ProductCard = ({ machine }) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(''); // State for start date
  const [endDate, setEndDate] = useState(''); // State for end date
  const [totalCost, setTotalCost] = useState(machine.rentalPrice); // Assuming rentalPrice is the total cost

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/booking`, {
        ownerId: machine.ownerId, // Make sure this is included in your machine object
        machineId: machine._id,
        startDate: new Date(startDate),
        endDate: new Date(endDate), // You may want to calculate this based on user input
        totalDuration: 1, // You can adjust this based on the selected duration
        totalCost: totalCost,
        status: 'confirmed', // Set default status
        paymentStatus: 'pending', // Default payment status
      });
      console.log(response.data); // Handle success response
      closeModal(); // Close the modal after booking
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="w-full h-fit pb-5 bg-slate-100 shadow-md hover:scale-105 hover:shadow-xl duration-500">
      <Link to={`/products/${machine._id}`}>
        <div className="bg-slate-200 w-full h-[15rem] mb-2 cursor-pointer overflow-hidden">
          {machine.img.length > 0 && (
            <img
              src={`data:${machine.img[0].contentType};base64,${btoa(
                new Uint8Array(machine.img[0].data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )}`}
              className="w-full h-full object-cover"
              alt={machine.img[0].filename}
            />
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-between px-5">
        <div className="flex flex-col">
          <p className="text-xl font-bold mb-2 overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {machine.name.length > 35 ? machine.name.substring(0, 35) + '...' : machine.name}
          </p>
          <p className="text-lg mb-2">{machine.availability}</p>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-blue-200 p-2 hover:bg-blue-400" onClick={openModal}>
            Book Now
          </button>
          <div className="bg-slate-200 rounded-full p-2">
            <i className="ri-heart-line" style={{ fontSize: '27px' }}></i>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          content: {
            color: 'black',
            width: '30%',
            height: '40%',
            margin: 'auto',
            borderRadius: '10px',
            padding: '20px',
          },
        }}
      >
        <h2 className='text-2xl font-bold text-center mb-4'>Confirm Booking</h2>
        <p className='text-lg mb-4 text-center'>Are you sure you want to book <b>{machine.name}</b>?</p>
        <p className='mb-4'>Price: ${machine.rentalPrice}</p>
        <div className='flex items-center mb-4'>
          <p className='mr-2'>Start Date:</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className='flex items-center mb-4'>
          <p className='mr-2'>End Date:</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <p className='mb-4'>Availability: {machine.availability}</p>
        <div className='flex justify-center gap-5'>
          <button onClick={handleConfirmBooking} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-2xl'>Confirm</button>
          <button onClick={closeModal} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl'>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
