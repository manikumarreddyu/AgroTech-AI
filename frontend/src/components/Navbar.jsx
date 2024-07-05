import { Link } from 'react-router-dom';
import icon from '../assets/playstore.png'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold  ">
          <img className='float-left' src={icon} alt='icon' style={{ height: '30px', width: '30px' }}></img>
          <span className='px-2 text-xl'>  Agri AI Solutions</span>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/app/crop" className="text-white hover:text-gray-200">
            Crop
          </Link>
          <Link to="/app/fertilizer" className="text-white hover:text-gray-200">
            Fertilizer
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;