import { Link } from "react-router-dom";
import about from '../assets/about.png';
import bgHero from "../assets/bgHero.png";
import { FaComment } from "react-icons/fa"; // Import the message icon

function About() {
  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <img className="w-full md:w-[500px] mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" src={about} alt="About Us" />

        {/* Text Section */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
            🌾 About AgroTech AI
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-4 text-green-700">
            Empowering Farmers with AI-Driven Solutions
          </h1>
          <p className="text-lg text-[#000435] bg-white p-4 rounded-md shadow-md text-justify leading-relaxed mb-4">
            🌱 Our mission is to provide advanced AI tools to farmers, helping them optimize their agricultural practices.
          </p>

          {/* How It Works Section */}
          <p className="md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-green-700">
            🤔 How it Works!
          </p>
          <p className="text-lg text-[#000435] bg-white p-4 rounded-md shadow-md leading-relaxed">
            <span>☑️ Access various machine learning models for crop prediction and soil analysis.</span><br />
            <span>☑️ Use the platform to make informed decisions on crop management and pest control.</span><br />
          </p>

          {/* Explore Button */}
          <Link
            to="/"
            className="bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[170px] text-center font-medium my-6 mx-auto md:mx-0"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Fixed ChatBot Icon with Tooltip */}
      <div className="relative">
        <Link to="/chatbot" className="group fixed bottom-4 right-4 bg-green-500 rounded-full p-3 shadow-lg transition-transform transform hover:scale-110">
          <FaComment className="text-white text-3xl" />
          <span className="absolute -top-10 -right-4 bg-white text-green-500 text-sm rounded-md px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Try Our ChatBot
          </span>
        </Link>
      </div>
    </div>
  );
}

export default About;
