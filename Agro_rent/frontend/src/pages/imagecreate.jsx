
import React, { useState } from 'react';
import axios from 'axios';

const MultipleImageUpload = () => {

const [selectedFiles, setSelectedFiles] = useState([]);

const handleFileChange = (event) => {
  setSelectedFiles(Array.from(event.target.files));
};

const handleUpload = async () => {
  try {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('avatar', file);
    });

    formData.append('machineId', '66103b64dc73356869ae5b1c');

    const token = localStorage.getItem('token');
    console.log('token:', token);
    // add token to headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Send POST request to upload images
    console.log('formData:', formData);
    const response = await axios.post('http://localhost:3000/api/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Images uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading images:', error);
  }
};

return (
  <div>
    <input type="file" onChange={handleFileChange} multiple />
    <button onClick={handleUpload}>Upload Images</button>
  </div>
);
};

export default MultipleImageUpload;