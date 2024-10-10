import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../assets/favicon2.png';
import GoogleTranslate from './GoogleTranslate';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-gradient-to-r from-[#11cb46] via-green-600 to-[#04ba10] w-full z-20 top-0 start-0 fixed">
            <div className="max-w-screen-2xl flex flex-wrap items-center font-semibold justify-between mx-auto p-3">
                <div className="text-white font-bold flex items-center">
                    <Link to="/" onClick={closeMenu}>
                    <img className="float-left" src={icon} alt="icon" style={{ height: '30px', width: '30px' }} />
                    <span className="px-2 text-xl">AgroTech AI</span>
                    </Link>
                </div>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="relative inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                >
                    <span className="sr-only">Open Menu</span>
                    <div className="flex flex-col gap-1">
                        <span className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${isMenuOpen ? "rotate-[45deg]" : "rotate-0"}`}></span>
                        <span className={`h-0.5 w-4 ${isMenuOpen ? "bg-transparent" : "bg-white"} transition duration-200 ease-in ${isMenuOpen ? "absolute" : "relative"}`}></span>
                        <span className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${isMenuOpen ? "rotate-[-45deg]" : "rotate-0"} ${isMenuOpen ? "absolute" : "relative"}`}></span>
                    </div>
                </button>
                <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:block lg:w-auto transition-all duration-300 ease-in-out`} id="navbar-default">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                        <NavLink 
                            exact to="/" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/crop" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Crop
                        </NavLink>
                        <NavLink 
                            to="/disease" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Disease
                        </NavLink>
                        <NavLink 
                            to="/fertilizer" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Fertilizer
                        </NavLink>
                        <NavLink 
                            to="/soil" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Soil
                        </NavLink>
                        <NavLink 
                            to="/prices" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Price
                        </NavLink>
                        <NavLink 
                            to="/forecast" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Forecast
                        </NavLink>
                        <NavLink 
                            to="/crop_recommendation" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Rotation
                        </NavLink>
                        <NavLink 
                            to="/Irrigation" 
                            className={({ isActive }) => 
                                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`
                            }
                            onClick={closeMenu}
                        >
                            Irrigation
                        </NavLink>
                        <GoogleTranslate/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
