import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const machineId = '6612a3180befcf76a03dda13';
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`http://localhost:3000/api/image/all?machineId=${machineId}`);
      console.log(response);
      const  imgs  = response.data;
      console.log(imgs);
      if (Array.isArray(imgs)) {
        setImages(imgs);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      <div className="image-container">
        {images.map((image) => {
          console.log(image); // Log the image object
          const base64String = btoa(
            new Uint8Array(image.data.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          return (
            <img
              key={image._id}
              src={`data:${image.contentType};base64,${base64String}`}
              alt={image.filename}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;