import React, { useState } from 'react';
import bgHero from "../assets/bgHero.png";

const Contact = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

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
  };

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Get in Touch</h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-10">
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
            required 
          />
        </div>
        <div className="mb-6">
          <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject:</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
            rows="6" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Send Message
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Contact Information and Location remain unchanged */}
        {/* Add your existing code for contact information and location */}
      </div>

      <div className="mb-10">
        {/* Follow Us and FAQs remain unchanged */}
        {/* Add your existing code for Follow Us and FAQs */}
      </div>
    </div>
  );
};

export default Contact;
