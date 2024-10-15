import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

function ProductRegistrationPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [machineDetails, setMachineDetails] = useState({
    name: "",
    company: "",
    description: "",
    rentalPrice: "",
    availability: "",
    category: ""
  });

  const [userRole, setUserRole] = useState("");

  // Fetch the user details from the backend to check the role
  // Fetch the user role directly from local storage
  const checkUserRole = async () => {
    const role = localStorage.getItem('role'); // Retrieve the role from local storage
    if (role) {
      if (role === 'owner') {
        // Proceed with adding tools or machinery
        console.log('User is authorized to add tools or machinery');
        setUserRole(role); // Set the role in state to use it later
      } else {
        toast.error('You do not have permission to add tools or machinery');
      }
    } else {
      toast.error('User role not found in local storage');
    }
  };

  // UseEffect to call the role check
  useEffect(() => {
    checkUserRole();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setMachineDetails((prevState) => ({
      ...prevState,
      [name]: capitalizedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has the role of 'owner'
    if (userRole !== 'owner') {
      toast.error('Invalid role. Only owners can add tools or machinery.');
      return;
    }

    try {
      const formData1 = { ...machineDetails };
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const machineDetailsResponse = await axios.post(`${BASE_URL}/api/machine`, formData1);

      setMachineDetails({
        name: "",
        company: "",
        description: "",
        rentalPrice: "",
        availability: "",
        category: ""
      });

      // File uploading code
      try {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append('avatar', file);
        });

        formData.append('machineId', machineDetailsResponse.data.machine._id);
        const response = await axios.post(`${BASE_URL}/api/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Images uploaded successfully:', response.data);
        setSelectedFiles([]);
        toast.success('Product created successfully!');

      } catch (error) {
        toast.error('Error Uploading Images');
      }

    } catch (error) {
      console.error("Error creating product:", error);
      toast.error('Error creating product');
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  return (
    <div className="">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-green-50 w-full mt-10 py-4 min-h-screen">
        <div className="container mx-auto flex w-full">
          <div className="right w-[60%] mx-auto mt-14 px-6  py-8 bg-green-100 shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center">
              Product Registration
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4">
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="text"
                    name="name"
                    value={machineDetails.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Company */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                    Company:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="text"
                    name="company"
                    value={machineDetails.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Description */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description:
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    name="description"
                    value={machineDetails.description}
                    onChange={handleChange}
                  />
                </div>
                {/* Rental Price */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rentalPrice">
                    Rental Price:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="number"
                    name="rentalPrice"
                    value={machineDetails.rentalPrice}
                    onChange={handleChange}
                  />
                </div>
                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="test"
                    name="category"
                    value={machineDetails.category}
                    onChange={handleChange}
                    placeholder="tractor / harvester"
                  />
                </div>
                {/* Availability */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
                    Availability:
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    type="text"
                    name="availability"
                    value={machineDetails.availability}
                    onChange={handleChange}
                    placeholder="9:00am - 5:00pm"
                  />
                </div>

                {/* Images */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                    Upload Images:
                  </label>
                  <input type="file" onChange={handleFileChange} multiple className="border border-gray-300 rounded-md px-4 py-2 w-full" />
                </div>
              </div>
              <div className="flex flex-row-reverse justify-between">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRegistrationPage;
