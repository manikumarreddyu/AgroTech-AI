import React from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Contact = () => {

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, formData);
      console.log(response.data); 
      setMessage({ text: "Message Send Successfully.", error: false });
      setFormData({
        name: "",
        mobile: "",
        message: ""
      });
    } catch (error) {
      console.error('Error Sending Message : ', error.response.data);
    }
  };

  return (
    <div className="bg-[#246f423d]">
      <div className="">
        <Navbar />
      </div>
      <div className="flex justify-center px-10 pt-10 items-center h-screen bg-gray-100">
      <div className="w-full bg-white rounded-xl shadow-2xl  md:flex">
        <div className="md:w-1/2 bg-[#2a7f62] text-white p-10 py-20">
          <p className="text-xl font-medium">Contact Us</p>
          <div className="text-5xl font-bold mt-2">
            Get in Touch with <br /> FarmEase
          </div>
          <p className="mt-5">
            Feel free to connect with us for any of your needs regarding our
            services. <br /> Our support team is ready to solve any of your
            issues. Just push a text to us <br /> and we will get back to you
            immediately.
          </p>
          <div className="text-2xl font-medium mt-5">
            India
          </div>
          <hr className="border border-white my-5" />
          <div className="mt-7 space-y-2">
            <div className="flex space-x-2 cursor-pointer">
              <i className="ri-map-pin-2-fill" style={{ fontSize: "20px", fontWeight: "800" }} />
              <p>Pune, Maharashtra 444905</p>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <i className="ri-mail-fill" style={{ fontSize: "20px", fontWeight: "800" }} />
              <a href="mailto:farmease01@gmail.com" className="hover:underline">farmease01@gmail.com</a>
            </div>
            <div className="flex space-x-2 cursor-pointer">
              <i className="ri-phone-fill" style={{ fontSize: "20px", fontWeight: "800" }} />
              <p>+91 9945670186</p>
            </div>
          </div>
        </div>
        <form action="" className="md:w-1/2 bg-gray-100 p-10 py-20">
          <p className="text-4xl font-bold text-[#2a7f62]">Drop Us a Message</p>
          <div className="mt-4">
            <label className="block text-[#2a7f62] text-sm font-bold mb-2" htmlFor="name">Your Name</label>
            <input className="border border-gray-300 rounded-md px-4 py-2 w-full" type="text" name="name" required />
          </div>
          <div className="mt-4">
            <label className="block text-[#2a7f62] text-sm font-bold mb-2" htmlFor="number">Your Number</label>
            <input className="border border-gray-300 rounded-md px-4 py-2 w-full" type="number" name="number" required />
          </div>
          <div className="mt-4">
            <label className="block text-[#2a7f62] text-sm font-bold mb-2" htmlFor="message">How Can We Help?</label>
            <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full" name="message" required />
          </div>
          <div className="mt-7">
            <button type="submit" className="w-full bg-[#2a7f62] text-white p-2 hover:bg-[#246f42] hover:shadow-lg">Send My Message</button>
          </div>
        </form>
      </div>
    </div>

    </div>
  );
};

export default Contact;
