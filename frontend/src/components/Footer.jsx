import React from 'react';
import { Link } from "react-router-dom";
import playstore from "../assets/favicon2.png";
import { FaHome, FaGithub, FaRegCopyright, FaDiscord,  FaLinkedinIn } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 p-8 text-white'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
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

                    <div>
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Company</h3>
                        <ul className='space-y-2'>
                            {['About Us', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link to='/contact' className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{item}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>
                            Quick Links
                        </h3>
                        <ul className='space-y-2'>
                            {[
                                { name: 'Crop Recommendation', path: '/crop' },
                                { name: 'Fertilizer Recommendation', path: '/fertilizer' },
                                { name: 'Soil Quality', path: '/soil' },
                                { name: 'Price Prediction', path: '/prices' },
                                { name: 'Forecast', path: '/forecast' },
                                { name: 'Disease', path: '/disease' },
                            ].map((link) => (
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


                    <div>
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Connect with us</h3>
                        <div className='flex space-x-4 mt-4'>
                            {[
                                { Icon: FaGithub, link: 'https://github.com/manikumarreddyu/AgroTech-AI', color: '#333' },
                                { Icon: FaDiscord, link: 'https://discord.gg/yRPQDDP6', color: '#7289DA' },
                                { Icon: FaXTwitter, link: '/', color: '#1DA1F2' },
                                { Icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/manikumarreddyu', color: '#0077B5' },
                            ].map(({ Icon, link, color }, index) => (
                                <a
                                    key={index}
                                    href={link}
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

                        <h3 className='text-lg font-semibold mt-6 mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Legal</h3>
                        <ul className='space-y-2'>
                            {['Privacy Policy', 'Terms and Conditions', 'Cookie Policy'].map((item) => (
                                <li key={item}>
                                    <Link to='/' className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{item}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mt-8 pt-8 border-t border-white/30 text-center'>
                    <p className='flex items-center justify-center text-sm'>
                        Copyright <FaRegCopyright className="mx-2" /> {currentYear}
                        <span className="font-bold ml-2 bg-white text-emerald-600 px-2 py-1 rounded transition-all duration-300 hover:bg-emerald-600 hover:text-white">AgroTech AI</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
