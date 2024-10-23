import { Link } from "react-router-dom";
import about from '../assets/about.png';

function About() {
  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* Image Section */}
        <img 
          className="w-full md:w-[500px] mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" 
          src={about} 
          alt="About Us" 
        />

        {/* Text Section */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-5xl font-bold py-1">
            🌾 About AgroTech AI
          </p>

          {/* Mission Card */}
          <div className="bg-gradient-to-r from-green-200 to-green-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6 h-[200px] my-5">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">🌟 Our Mission</h2>
            <p className="text-md text-[#000435] leading-relaxed">
              We aim to empower farmers with innovative solutions that harness the power of AI, enabling them to achieve better yields, reduce waste, and promote sustainable farming practices.
            </p>
          </div>

          {/* How It Works Section with Cards */}
          <div className="w-full">
            <div className="bg-gradient-to-r from-green-200 to-green-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-[200px] mt-2">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">🤔 How it Works!</h2>
              <p className="text-md text-[#000435] leading-relaxed">
                <span>☑️ Access various machine learning models for crop prediction and soil analysis.</span><br />
                <span>☑️ Use the platform to make informed decisions on crop management and pest control.</span><br />
              </p>
            </div>
          </div>


          {/* Explore Button */}
          <Link
            to="/products"
            className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[180px] text-center font-medium my-6 mx-auto md:mx-0"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
