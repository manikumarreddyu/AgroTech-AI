import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending data to an API
    console.log('Form submitted:', formData);
    // Reset the form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-green-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 text-center mb-6">
          Get in Touch
        </h1>
        
        {/* Contact Form Section */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-green-800 font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-green-800 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-green-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-green-800 font-semibold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-green-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
