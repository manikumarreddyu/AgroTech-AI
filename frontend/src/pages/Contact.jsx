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
      <div className='flex w-full'>
        <div className="w-full max-w-4xl mb-10 mx-auto p-6 bg-green-100 bg-opacity-60 rounded shadow-lg">
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
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Crop Prediction and Analysis</li>
              <li>Soil Health Monitoring</li>
              <li>Climate Impact Forecasting</li>
              <li>Custom AI Solutions for Farm Management</li>
            </ul>
          </div>

          {/* Testimonials */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h3>
            <p>"AgroTech AI has revolutionized our farming processes! Their predictive models help us optimize crop yield and reduce wastage." - Farmer John</p>
            <p>"The insights provided by AgroTech are invaluable for making data-driven decisions on the field." - Dr. Smith, Agronomist</p>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10 text-white">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest updates and AI innovations in agriculture.</p>
            <input
              type="email"
              placeholder="Your Email"
              className="mt-4 p-2 w-full rounded"
            />
            <button className="mt-2 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">Subscribe</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
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
        <div className="grid w-full max-w-4xl gap-8 mb-10 mx-auto">

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
      </div>
    </div>
  );
};

export default Contact;
