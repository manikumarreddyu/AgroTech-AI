import React, { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import { FaGithub, FaDiscord, FaTwitter, FaLinkedinIn } from 'react-icons/fa'; // Import the required icons
import {FaXTwitter} from 'react-icons/fa6';

const Contact = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Social media links with icons and colors
  const socialMedia = [
    { Icon: FaGithub, link: 'https://github.com/manikumarreddyu/AgroTech-AI', color: '#333' },
    { Icon: FaDiscord, link: 'https://discord.gg/yRPQDDP6', color: '#7289DA' },
    { Icon: FaXTwitter, link: 'https://twitter.com/YourTwitterHandle', color: '#1DA1F2' },
    { Icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/manikumarreddyu', color: '#0077B5' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate fields
    const validationErrors = {};

    // Validate name
    if (!name.trim()) {
      validationErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
      validationErrors.name = 'Name must contain at least 3 letters';
    }

    // Validate email
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }

    // Validate subject
    if (!subject.trim()) {
      validationErrors.subject = 'Subject is required';
    } else if (!/^[a-zA-Z\s]{3,}$/.test(subject)) {
      validationErrors.subject = 'Subject must contain at least 3 letters';
    }

    // Validate message
    if (!message.trim()) {
      validationErrors.message = 'Message is required';
    } else if (message.length < 10) {
      validationErrors.message = 'Message must be at least 10 characters long';
    }

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with submission
    alert("Message submitted!");
    // Here you can add your submission logic (e.g., API call)

    // Reset form fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div
      className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-4xl font-bold text-center text-green-500 mb-8">Contact Us</h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-10">
        {/* Name Field */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className={`w-full mt-2 p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`} 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className={`w-full mt-2 p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Subject Field */}
        <div className="mb-6">
          <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject:</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            className={`w-full mt-2 p-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`} 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            className={`w-full mt-2 p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`} 
            rows="6" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Contact Information and Location */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Contact Information */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
          <p>Email: <a href="mailto:info@agrotech.com" className="text-blue-500 hover:underline">info@agrotechai.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+91 1212345656</a></p>
        </div>

        {/* Our Location */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h3>
          <p>1-14 AgroTech AI Lane, Farming City, Madhapur,Hyderabad 533417</p>
          <div className="h-64 w-full mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13527.487707281556!2d78.3738297750517!3d17.449315703489304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1728457656915!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="AgroTech-AI Company Location"
            />


          </div>
        </div>
      </div>

      {/* Follow Us Section with React Icons */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h3>
        <div className="flex space-x-6">
          {socialMedia.map(({ Icon, link, color }, index) => (
            <a 
              key={index}
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition transform duration-200"
              style={{ color }}
            >
              <Icon size={30} />
            </a>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">FAQs</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-gray-600">
            <strong>What services do you provide?</strong> - We offer AI solutions for agriculture, including crop predictions and soil analysis.
          </li>
          <li className="text-gray-600">
            <strong>How can I get support?</strong> - You can reach out via our contact form or email us directly.
          </li>
          <li className="text-gray-600">
            <strong>Where are you located?</strong> - Our office is located at 1-14 AgroTech AI Lane, Farming City, Madhapur,Hyderabad 533417
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
