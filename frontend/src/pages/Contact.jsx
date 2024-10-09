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
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
          <p>Email: <a href="mailto:info@agrotech.com" className="text-blue-500">info@agrotech.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-blue-500">+1 (234) 567-890</a></p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h3>
          <p>123 AgroTech Lane, Farming City, AG 12345</p>
          <div className="h-64 w-full mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509178!2d144.95373531531797!3d-37.81720997975197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f2bfa39%3A0xa53e5c1a03bff6b!2sAgroTech!5e0!3m2!1sen!2sus!4v1633638358298!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h3>
        <div className="flex space-x-6">
          <a 
            href="https://facebook.com/agrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </a>
          <a 
            href="https://twitter.com/agrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Twitter
          </a>
          <a 
            href="https://linkedin.com/company/agrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            LinkedIn
          </a>
          <a 
            href="https://instagram.com/agrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline"
          >
            Instagram
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">FAQs</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-gray-600">What services do you provide? - We offer AI solutions for agriculture, including crop predictions and soil analysis.</li>
          <li className="text-gray-600">How can I get support? - You can reach out via our contact form or email us directly.</li>
          <li className="text-gray-600">Where are you located? - Our office is located at 123 AgroTech Lane, Farming City, AG 12345.</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
