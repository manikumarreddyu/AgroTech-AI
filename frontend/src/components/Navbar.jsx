import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons from react-icons
import icon from '../assets/favicon2.png';
import GoogleTranslate from './GoogleTranslate';

// import useTheme from '../hooks/useTheme'; // Import useTheme hook

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { theme, toggleTheme } = useTheme(); // Use useTheme hook

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    //via-[#3ff132] -->from-[#11cb46] via-[#3ff132] to-[#04ba10] 

    return (
        <nav className={`bg-gradient-to-r from-[#11cb46] via-green-600 to-[#04ba10] w-full  z-20 top-0 start-0 fixed`}>
            <div className="max-w-screen-2xl flex flex-wrap items-center font-semibold justify-between mx-auto p-3">
                <div className="text-white font-bold flex items-center">
                    <img className="float-left" src={icon} alt="icon" style={{ height: '30px', width: '30px' }} />
                    <span className="px-2 text-xl">AgroTech AI</span>
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
                        <Link to="/" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Home
                        </Link>
                        <Link to="/crop" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Crop
                        </Link>
                        <Link to="/disease" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Disease
                        </Link>
                        <Link to="/fertilizer" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Fertilizer
                        </Link>
                        <Link to="/soil" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Soil Quality
                        </Link>
                        <Link to="/prices" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Price
                        </Link>
                        <Link to="/forecast" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Forecast
                        </Link>
                        <Link to="/Irrigation" className="block py-2 px-3 text-white hover:text-gray-200 text-center" onClick={closeMenu}>
                            Irrigation System
                        </Link>
                        <div className="Translator max-h-24">
                            <GoogleTranslate/>
                        </div>

                    </div>
                </div>
                {/* <button
                    className="inline-flex   items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-1 focus:ring-gray-200"
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? <FaMoon className="text-2xl p-1" /> : <FaSun className="text-2xl p-1" />}
                </button> */}
            </div>
        </nav>
    );
};

export default Navbar;

