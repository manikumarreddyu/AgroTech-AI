import { useEffect, useState } from "react";

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Hover effect to create visual interaction
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <header
      className={`
          bg-gradient-to-r from-green-400 to-blue-500 shadow-xl
        
      text-white p-6 rounded-lg shadow-md mt-20 mb-5 pt-12 transition-all duration-500 ease-in-out`}
    
      
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-wide mb-2 transform hover:scale-105 transition-transform duration-500">
          AgroShop Admin - Ticket Management
        </h1>
        <p className="text-lg font-medium tracking-wide opacity-90">
          Manage tickets efficiently and provide exceptional service.
        </p>
      </div>
    </header>
  );
};

export default Header;
