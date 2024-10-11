import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import icon from "../assets/favicon2.png";
import GoogleTranslate from "./GoogleTranslate";
import { FaSun, FaMoon, FaChevronDown } from "react-icons/fa"; // Added FaChevronDown for arrow
import useTheme from "../hooks/useTheme"; // Imported useTheme hook

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Use useTheme hook
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const navbarRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setOpenDropdown(null); // Close any open dropdown when menu is closed
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null); // Close any open dropdown when menu is closed
  };

  const handleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <nav
      ref={navbarRef}
      className="bg-gradient-to-r from-[#11cb46] via-green-600 to-[#04ba10] w-full z-50 top-0 fixed"
    >
      <div className="max-w-screen-2xl flex flex-wrap items-center font-semibold justify-between mx-auto p-3">
        {/* Logo and Brand */}
        <div className="text-white font-bold flex items-center">
          <Link to="/" onClick={closeMenu}>
            <img
              className="float-left"
              src={icon}
              alt="icon"
              style={{ height: "30px", width: "30px" }}
            />
            <span className="px-2 text-xl">AgroTech AI</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="relative inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open Menu</span>
          <div className="flex flex-col gap-1">
            <span
              className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-4 bg-white transition duration-200 ease-in ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:w-auto lg:items-center transition-all duration-300 ease-in-out`}
          id="navbar-default"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            {/* Home Link */}
            <NavLink
              to="/"
              exact
              className={({ isActive }) =>
                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${
                  isActive ? "bg-green-700" : "hover:bg-green-500"
                }`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            {/* Crop Management Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdown("crop")}
                className="flex items-center py-2 px-3 text-white rounded-lg hover:bg-green-500 transition-all duration-300 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openDropdown === "crop" ? "true" : "false"}
              >
                Crop Management
                <FaChevronDown
                  className={`ml-1 transition-transform duration-200 ${
                    openDropdown === "crop" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {/* Crop Management Dropdown Menu */}
              {openDropdown === "crop" && (
                <div className="absolute left-0 mt-2 w-60 bg-white text-black rounded-lg shadow-lg z-50">
                  <NavLink
                    to="/crop"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Crop Recommendation
                  </NavLink>
                  <NavLink
                    to="/crop_recommendation"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Crop Rotation Recommendation
                  </NavLink>
                  <NavLink
                    to="/prices"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Crop Price Prediction
                  </NavLink>
                </div>
              )}
            </div>

            {/* Soil & Fertilizer Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdown("soil")}
                className="flex items-center py-2 px-3 text-white rounded-lg hover:bg-green-500 transition-all duration-300 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openDropdown === "soil" ? "true" : "false"}
              >
                Soil & Fertilizer
                <FaChevronDown
                  className={`ml-1 transition-transform duration-200 ${
                    openDropdown === "soil" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {/* Soil & Fertilizer Dropdown Menu */}
              {openDropdown === "soil" && (
                <div className="absolute left-0 mt-2 w-60 bg-white text-black rounded-lg shadow-lg z-50">
                  <NavLink
                    to="/fertilizer"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Fertilizer Prediction
                  </NavLink>
                  <NavLink
                    to="/soil"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Soil Quality Prediction
                  </NavLink>
                  <NavLink
                    to="/Irrigation"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Irrigation System Prediction
                  </NavLink>
                </div>
              )}
            </div>

            {/* Other Links */}
            <NavLink
              to="/disease"
              className={({ isActive }) =>
                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${
                  isActive ? "bg-green-700" : "hover:bg-green-500"
                }`
              }
              onClick={closeMenu}
            >
              Disease Detection
            </NavLink>
            <NavLink
              to="/forecast"
              className={({ isActive }) =>
                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${
                  isActive ? "bg-green-700" : "hover:bg-green-500"
                }`
              }
              onClick={closeMenu}
            >
              Climate
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${
                  isActive ? "bg-green-700" : "hover:bg-green-500"
                }`
              }
              onClick={closeMenu}
            >
              About Us
            </NavLink>

            {/* Google Translate Component */}
            <GoogleTranslate />
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex items-center justify-center p-2 rounded-lg text-white hover:bg-green-500 transition duration-300 ml-auto"
            >
              {theme === "light" ? (
                <FaSun className="text-2xl" />
              ) : (
                <FaMoon className="text-2xl" />
              )}
            </button>

            {/* Sign In Button for larger screens */}
            <div className="hidden lg:flex items-center ml-4">
              <NavLink
                
                className="py-2 px-4 text-white border border-white rounded-lg hover:bg-white hover:text-green-600 "
              >
                Sign In
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
