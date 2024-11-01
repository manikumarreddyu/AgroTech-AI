import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LOGO from "/favicon2.png";


function ShopNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState("India"); // Default location
  const [showAlert, setShowAlert] = useState(false); // State to control the alert dialog
  const [cartCount, setCartCount] = useState(5); // Example cart count
  const [manualLocation, setManualLocation] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if click is outside
      }
    }

    // Bind event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  // Function to handle location update
  const updateLocation = () => {
    setShowAlert(true); // Show the custom alert dialog
  };

  // Function to handle alert confirmation
  const handleConfirm = (userLocation) => {
    if (userLocation) {
      setLocation(userLocation); // Update the location state with input value
      setManualLocation(true)
    }
    setShowAlert(false); // Hide the alert dialog
  };

  // Function to handle alert cancellation
  const handleCancel = () => {
    setShowAlert(false); // Hide the alert dialog
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-green-600 text-white px-4 py-2 shadow-md relative z-50">
      <div className="mx-4 flex items-center">

        {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={LOGO}
              className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12"
              alt="AgroTech AI Logo"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent group-hover:from-lime-200 group-hover:to-white transition-all duration-300">
              AgroShop
            </span>
          </Link>
        <div className="text-2xl font-bold flex items-center">

          {/* Location Section */}
          <div className="ml-4 pl-5 text-sm flex flex-col">
            <div className="flex items-center">
              {/* SVG Map Logo */}
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                <path d="M28.292 1.326C27.226 1.116 26.127 1 25 1c-4.71 0-8.98 1.93-12.06 5.04l6.92 5.592L28.292 1.326zM18.595 13.178L11.62 7.55C9.35 10.43 8 14.07 8 18c0 2.281.452 4.487 1.304 6.534L18.595 13.178zM22.608 11.432C23.353 11.159 24.154 11 25 11c3.87 0 7 3.13 7 7 0 .338-.032.667-.078.992l7.772-9.499c-2.058-3.539-5.348-6.268-9.285-7.595L22.608 11.432zM27.341 24.591C26.608 24.851 25.822 25 25 25c-3.87 0-7-3.13-7-7 0-.354.034-.7.084-1.039l-7.803 9.537c.386.666.809 1.315 1.289 1.932.37.5.87 1.14 1.45 1.89 1.267 1.633 2.959 3.816 4.59 6.164L27.341 24.591zM18.778 38.215c2.082 3.184 3.852 6.497 4.172 9.055.14.99.99 1.73 1.99 1.73 1.02 0 1.87-.75 1.99-1.75.61-4.83 6.57-12.48 9.78-16.6.56-.72 1.05-1.35 1.5-1.94C40.65 25.69 42 21.89 42 18c0-2.322-.471-4.536-1.319-6.555L18.778 38.215z"></path>
              </svg>
              <span>Delivering to {location}</span>
            </div>
            <button 
              onClick={updateLocation} 
              className="text-lime-200 underline mt-1"
            >
              Update your location
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 hidden md:flex">
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="w-full px-3 py-2 rounded-l-md focus:outline-none text-black"
          />
          <button className="bg-white text-green-600 px-4 rounded-r-md hover:bg-gray-200">Search</button>
        </div>

        {/* Right Corner Tabs */}
        <div className="ml-auto flex items-center space-x-6">
          <a href="/orders" className=" hover:bg-green-700 p-3 rounded-sm">Orders</a>
          <a href="/agroshop/cart"className='flex hover:bg-green-700 p-3 rounded-sm' >
          <div className="hover:text-gray-300 relative mr-2 ">

         

          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32.402 32" id="cart">
  <path d="M6 30a2 2 1080 1 0 4 0 2 2 1080 1 0-4 0zm18 0a2 2 1080 1 0 4 0 2 2 1080 1 0-4 0zM-.058 5a1 1 0 0 0 1 1H3.02l1.242 5.312L6 20c0 .072.034.134.042.204l-1.018 4.58A.997.997 0 0 0 6 26h22.688a1 1 0 0 0 0-2H7.248l.458-2.06c.1.016.19.06.294.06h18.23c1.104 0 1.77-.218 2.302-1.5l3.248-9.964C32.344 8.75 31.106 8 30 8H6c-.156 0-.292.054-.438.088l-.776-3.316A1 1 0 0 0 3.812 4H.942a1 1 0 0 0-1 1zm6.098 5h23.81l-3.192 9.798c-.038.086-.07.148-.094.19-.066.006-.17.012-.334.012H8v-.198l-.038-.194L6.04 10z"></path>
</svg>

            
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                {cartCount}
              </span>
            )}
          </div>
            Cart
          </a>
          
          {/* Account Dropdown */}
          <div className="relative hover:bg-green-700 p-3 rounded-sm">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-300 focus:outline-none z-50"
            >
              Account
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg transition-all duration-200 transform origin-top-right">
                <Link to="/agroshop/profile" className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg ">Your Profile</Link>
                <Link to="/agroshop/wishlist" className="block px-4 py-2 hover:bg-gray-200">Your Wishlist</Link>
                <Link to="/logout" className="block px-4 py-2 hover:bg-gray-200 rounded-b-lg">Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render Custom Alert Dialog */}
      {showAlert && (
        <CustomAlertDialog 
          message={"Would you like to update your postal code?"}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <div className="flex md:hidden mt-2 w-full">
    <input
      type="text"
      placeholder="Search..."
      className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
    />
    <button className="bg-white text-green-600 px-4 rounded-md ml-2 hover:bg-gray-200">Search</button>
  </div>
    </nav>
  );
}






const CustomAlertDialog = ({ message, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    onConfirm(inputValue); // Pass the input value to the confirm function
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
        {/* Cross icon to close the dialog */}
        <button 
          className="absolute top-[-6px] right-[-6px]  text-black bg-gray-300 rounded-full hover:text-gray-900"
          onClick={onCancel}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        
        <p className="mb-4 text-black text-center">{message}</p> {/* Ensure message is rendered here */}
        
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter your postal code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-md mr-2 text-black"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={handleConfirm}
          >
            Apply
          </button>
        </div>
      
      </div>
    </div>
  );
};



  
export default ShopNavbar;
