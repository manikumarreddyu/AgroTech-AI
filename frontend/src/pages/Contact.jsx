import React, { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import { FaGithub, FaDiscord, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Contactus from "../assets/contactus.png"; 
import "../styles/Contact.css";

const Contact = () => {
  // Form state
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What services do you provide?",
      answer: "We offer AI solutions for agriculture, including crop predictions and soil analysis.",
    },
    {
      question: "How can I get support?",
      answer: "You can reach out via our contact form or email us directly.",
    },
    {
      question: "Where are you located?",
      answer: "Our office is located at 1-14 AgroTech AI Lane, Farming City, Madhapur, Hyderabad 533417.",
    },
    {
      question: "What industries do you serve?",
      answer: "AgroTech AI primarily serves the agricultural industry, helping farmers and researchers make data-driven decisions.",
    },
  ];
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Social media links with icons and colors
  const socialMedia = [
    { Icon: FaGithub, link: 'https://github.com/manikumarreddyu/AgroTech-AI', color: '#333' },
    { Icon: FaDiscord, link: 'https://discord.gg/yRPQDDP6', color: '#7289DA' },
    { Icon: FaXTwitter, link: 'https://twitter.com/YourTwitterHandle', color: '#1DA1F2' },
    { Icon: FaLinkedin, link: 'https://www.linkedin.com/in/manikumarreddyu', color: '#0077B5' },
  ];

  const handleSubmit = async (e) => {
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

    // Prepare form data
    const formData = {
      name,
      email,
      subject,
      message,
    };

    setLoading(true);

    try {
      // Send form data to backend
      const response = await fetch('https://agrotech-ai-11j3.onrender.com/api/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResponseMessage(data.message);
        // Reset form fields after successful submission
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => {
          setResponseMessage('');
        }, 9000); 
      } else {
        setError(data.message || 'Failed to submit form');
        setTimeout(() => {
          setError('');
        }, 9000); 
      }
    } catch (error) {
      console.error('Error:', error);
      setError('There was an error sending your message.');
    } finally {
      setLoading(false);
    }
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
      <h2 className="text-5xl font-bold text-center text-green-500 mb-4">Contact Us</h2>

      {/* contact us section */}
      <div className="mb-10 max-w-2xl mx-auto p-6 bg-green-100 bg-opacity-60 rounded shadow-lg">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Get in Touch</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`border rounded w-full py-2 px-3 text-gray-700 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border rounded w-full py-2 px-3 text-gray-700 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Your Email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`border rounded w-full py-2 px-3 text-gray-700 ${errors.subject ? 'border-red-500' : ''}`}
              placeholder="Subject"
            />
            {errors.subject && <p className="text-red-500 text-xs italic">{errors.subject}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`border rounded w-full py-2 px-3 text-gray-700 ${errors.message ? 'border-red-500' : ''}`}
              placeholder="Your Message"
              rows="4"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
          </div>

          {responseMessage && <p className="text-green-500">{responseMessage}</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <button
            type="submit"
            className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <div className="flex justify-center space-x-4 mb-10">
        <a
          href="mailto:info@agrotech.com"
          className="flex items-center border-b-2 border-blue-500 text-blue-500 font-bold py-2 px-4 hover:border-blue-600 hover:text-blue-600 transition"
        >
          <FaEnvelope className="mr-2" />
          info@agrotech.com
        </a>
        <a
          href="tel:+911234567890"
          className="flex items-center border-b-2 border-green-500 text-green-500 font-bold py-2 px-4 hover:border-green-600 hover:text-green-600 transition"
        >
          <FaPhoneAlt className="mr-2" />
          +91 1234567890
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">FAQs</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b-2 border-gray-300">
                {/* Question */}
                <div
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center cursor-pointer p-4 bg-green-100 hover:bg-green-200 rounded-md"
                >
                  <h4 className="text-lg font-semibold text-green-700">{faq.question}</h4>
                  <span className="text-green-600">
                    {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>

                {/* Answer */}
                {activeIndex === index && (
                  <div className="p-4 text-gray-600 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
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



      {/* FAQs Section */}
      {/* Email and phone number */}
      
    </div>
  );
};

export default Contact;
