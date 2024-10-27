import React, { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import { FaGithub, FaDiscord, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import the required icons
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
      const response = await fetch('agro-tech-ai-backend-teal.vercel.app/contact/contactus', {
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
      <h2 className="text-5xl font-bold text-center text-green-500 mb-2">Contact Us</h2>

      <div className="w-full max-w-5xl p-5 shadow-md rounded-lg mx-auto my-10 dark:bg-[rgb(40,40,40)] border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col p-5 dark:text-white">
            <h1 className="text-left text-3xl md:text-4xl mb-2  text-green-500" style={{ fontSize: '2.4rem', fontWeight: 600, fontFamily: "Georgia, serif" }}>
              Get in Touch
            </h1>
            <p className="mb-5 text-green-500 smalltitlefont">We are here for you. How can we help?</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name" className="formlevel">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-900 dark:bg-[rgb(51,51,51)] dark:text-white`}
                  placeholder="Enter your Name"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label htmlFor="email" className="formlevel">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-900 dark:bg-[rgb(51,51,51)] dark:text-white`}
                  placeholder="Enter your Email"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="formlevel">Subject:</label>
                <input
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  rows="5"
                  className={`w-full p-2 border ${errors.subject ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-900 dark:bg-[rgb(51,51,51)] dark:text-white`}
                  placeholder="Enter your topic"
                  required
                ></input>
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              {/* Message Field */}
              <div className="flex flex-col">
                <label htmlFor="message" className="formlevel">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                  className={`w-full p-2 border ${errors.message ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-900 dark:bg-[rgb(51,51,51)] dark:text-white`}
                  placeholder="Go ahead! We are listening..."
                  required
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button type="submit" className="p-2 bg-green-600 text-white rounded-md self-start hover:bg-green-600 " disabled={loading}>
                  {loading ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>

            {responseMessage && <p className="text-green-500 text-center mt-4" style={{fontSize:"1.4rem"}}>{responseMessage}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>

          {/* Right Column: Contact Information */}
          <div className="flex flex-col items-center p-5">
          <img src={Contactus} alt="Contact" className="w-full h-auto mb-3 p-7 hidden md:block" />


            <div className="w-full p-5 rounded-lg border-2 border-gray-300 bg-white" style={{ fontFamily: "Georgia, serif" }}>
              <h2 className="text-center text-xl font-bold text-green-600 mb-2 border-b-2 pb-2 border-gray-300">Contact Information</h2>

              <div className="flex flex-col items-start space-y-4 items-center">
                <div className="flex items-center text-lg font-semibold sm:text-base">
                  <a href="mailto:info@agrotech.com" className="flex items-center">
                    <FaEnvelope className="mr-3 text-2xl" />
                    <span className="ml-3 form-level text-blue-600 hover:underline">info@agrotech.com</span>
                  </a>
                </div>
                <div className="flex items-center text-lg font-semibold sm:text-base">
                  <a href="tel:+1234567890" className="flex items-center">
                    <FaPhoneAlt className="mr-3 text-2xl" />
                    <span className="ml-3 form-level text-blue-600 hover:underline">+91 1234567890</span>
                  </a>
                </div>
                {/* Follow Us Section with React Icons */}
                <div className="mb-10 ">
                  <h3 className="text-2xl font-bold text-green-600 mb-4 text-center  font-bold mb-2 border-b-2 pb-2 border-gray-300">Follow Us</h3>
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
              </div>
            </div>

          </div>
        </div>
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

    </div>
  );
};

export default Contact;
