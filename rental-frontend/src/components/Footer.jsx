import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import playstore from "../assets/favicon2.png";
import { FaHome, FaGithub, FaRegCopyright, FaDiscord, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Corrected import for Twitter icon

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    // Define company links with distinct paths
    const companyLinks = [
        { name: 'About Us', path: '/aboutus' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // Define quick links
    const quickLinks = [
        { name: 'Home', path: '/rental' },
        { name: 'Drones', path: '/drones' },
        { name: 'Tractors', path: '/tractors' },
        { name: 'Equipments', path: '/equipments' },
        { name: 'Services', path: '/services' }
    ];

    // Define social media links
    const socialMedia = [
        { Icon: FaGithub, link: 'https://github.com/manikumarreddyu/AgroTech-AI', color: '#333' },
        { Icon: FaDiscord, link: 'https://discord.gg/yRPQDDP6', color: '#7289DA' },
        { Icon: FaXTwitter, link: 'https://twitter.com/YourTwitterHandle', color: '#1DA1F2' }, // Updated to FaTwitter
        { Icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/manikumarreddyu', color: '#0077B5' },
    ];

    // Define legal links with their paths if available
    const legalLinks = [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms and Conditions', path: '/terms-and-conditions' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
    ];

    const handleRating = (value) => {
        setRating(value);
    };

    const submitRating = () => {
        alert(`Thank you for rating us ${rating} out of 5! Comment: ${comment}`);
        setIsModalOpen(false);
        setRating(0);
        setComment('');
        navigate('/thank-you'); // Redirect to the "Thank You" page after rating
    };

    return (
        <footer className='bg-gradient-to-r from-[#11cb46] via-green-600 to-[#04ba10]  p-8 text-white'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Company Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group transition-all duration-300 ease-in-out transform hover:scale-105">
                            <img src={playstore} className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12" alt="AgroTech AI Logo" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent group-hover:from-lime-200 group-hover:to-white transition-all duration-300">
                                AgroTech AI
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            AgroTech AI platform provides cutting-edge Machine Learning models for agricultural predictions and insights.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Company</h3>
                        <ul className='space-y-2'>
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{link.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col">
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>
                            Quick Links
                        </h3>
                        <ul className='space-y-2'>
                            {quickLinks.map((link) => (
                                <li key={link.name} className="w-full">
                                    <Link to={link.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{link.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect with Us and Legal */}
                    <div>
                        {/* Social Media Links */}
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Connect with us</h3>
                        <div className='flex space-x-4 mt-4'>
                            {socialMedia.map(({ Icon, link, color }, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                                    style={{
                                        backgroundColor: 'white',
                                        color: color,
                                        boxShadow: '0 0 0 0 rgba(255,255,255,0.7)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = color;
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.boxShadow = `0 0 0 8px rgba(255,255,255,0.3)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = color;
                                        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(255,255,255,0.7)';
                                    }}
                                    aria-label={`Social media link ${index + 1}`}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <h3 className='text-lg font-semibold mt-6 mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Legal</h3>
                        <ul className='space-y-2'>
                            {legalLinks.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{item.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="mt-8 text-center">
                    <button
                        className="bg-lime-200 text-black py-2 px-4 rounded hover:bg-lime-300 transition duration-300"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Give Feedback
                    </button>
                </div>

                {/* Feedback Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                            <h3 className="text-lg font-semibold mb-4">Feedback</h3>
                            <div>
                                <div className="mb-4">
                                    <label className="block mb-2">Rating (1-5):</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={rating}
                                        onChange={(e) => handleRating(e.target.value)}
                                        className="border rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Comment:</label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="border rounded w-full p-2"
                                        rows="4"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-lime-200 text-black py-2 px-4 rounded hover:bg-lime-300 transition duration-300"
                                    onClick={submitRating}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='text-center mt-8'>
                <FaRegCopyright className='inline mr-2' /> {currentYear} AgroTech AI. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
