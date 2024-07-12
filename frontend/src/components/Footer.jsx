import { Link } from "react-router-dom";
import { FaHome, FaGithub, FaRegCopyright } from 'react-icons/fa';
import playstore from "../assets/favicon2.png";
// import bgHero from "../assets/bgHero.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='bg-gradient-to-r from-[#11cb46] via-[#3ff132] to-[#04ba10]  p-6'>
            <div className='md:flex'>
                <div className="md:w-1/2 2xl:-mt-7 xl:-mt-10 lg:-mt-5  md:-mt-10 sm:mt-1 sm:w-full content-center">
                    <div className="flex flex-col md:items-start">
                        <div className="flex items-center sm:w-full">
                            <Link to="/" className="flex items-center gap-1">
                                <img src={playstore} className="h-8" alt="AgroTech AI Logo" />
                                <span className="ml-4 text-2xl font-semibold whitespace-nowrap text-white">
                                    AgroTech AI
                                </span>
                            </Link>
                        </div>
                        <p className="mt-2 text-white text-justify text-sm md:text-base md:text-left  lg:w-1/2 sm:w-full pr-2">
                            AgroTech AI platform provides various Machine Learning models for predictions.
                        </p>
                    </div>
                </div>
                <div className='md:w-3/4 md:flex'>
                    <div className='md:w-1/3'>
                        <p className='text-white font-bold mt-8 md:mt-0'>Company</p>
                        <ul className='text-white py-1'>
                            <li className='py-0.5 cursor-pointer hover:text-green-600'>
                                <Link to='/'>About Us</Link>
                            </li>
                            <li className='py-0.5 cursor-pointer hover:text-green-600'>
                                <Link to='/'>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='text-white font-bold text-md'>Quick Links</p>
                        <ul className='text-white py-1 cursor-pointer'>
                            {/* <li className='py-1 cursor-pointer hover:text-green-800'>
                                <Link className='flex items-center gap-1' to='/crop'>
                                    Crop Recommendation 
                                </Link>
                            </li> */}
                            {/* <li className='py-1 cursor-pointer hover:text-green-800'>
                                <Link className='flex items-center gap-1' to='/fertilizer'>
                                    Fertilizer Recommendation
                                </Link>
                            </li> */}
                            {/* <li className='py-0.5 cursor-pointer hover:text-green-600'>
                                <Link className='flex items-center gap-1' to='/soil'>
                                    Soil Quality 
                                </Link>
                            </li> */}
                            <li className='py-0.5 cursor-pointer hover:text-green-600'>
                                <Link className='flex items-center gap-1' to='/prices'>
                                    Price Prediction
                                </Link>
                            </li>
                            <li className='py-0.5 cursor-pointer hover:text-green-600'>
                                <Link className='flex items-center gap-1' to="/forecast">
                                   Forecast
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className='md:w-1/3'>
                        <p className='text-white font-bold'>Legal Pages</p>
                        <ul className='text-white py-4 cursor-pointer'>
                            <li className='py-1 cursor-pointer hover:text-green-800'>
                                <Link to='/'>Privacy Policy</Link>
                            </li>
                            <li className='py-1 cursor-pointer hover:text-green-800'>
                                <Link to='/'>Terms and Conditions</Link>
                            </li>
                            <li className='py-1 cursor-pointer hover:text-green-800'>
                                <Link to='/'>Cookie Policy</Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
            {/* <div className='block items-center m-auto mt-2'>
                <div className='flex gap-4 justify-center '>
                    <a href="https://github.com/manikumarreddyu/AGRO-AI" className="hover:scale-110 hover:shadow-[0_0_10px_2px_green] transition-transform duration-300 ease-in-out flex items-center justify-center p-2 rounded-full">
                        <FaGithub size={35} className="text-white" />
                    </a>
                    <Link to='/' className="hover:scale-110 hover:shadow-[0_0_10px_2px_green] transition-transform duration-300 ease-in-out flex items-center justify-center p-2 text-white rounded-full focus:outline-none">
                        <FaHome size={35} />
                    </Link>
                </div>
            </div> */}
            <div className='mt-4 text-white flex justify-center space-x-2 text-md lg:text-md xl:text-md'>
                Copyright <FaRegCopyright className="mx-0.5 my-1.5" /> {currentYear} <span className="font-bold">AgroTech AI</span>
            </div>
        </div>
    )
}

export default Footer;

