import { Link } from "react-router-dom";
import about from '../assets/about.png';
import bgHero from "../assets/bgHero.png";
import { FaComment } from "react-icons/fa"; // Import the message icon

function About() {
  return (
    <div className="w-full py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center">
        <img className="w-[550px] mx-auto md:my-4" src={about} alt="About Us" />
        <div className="flex flex-col justify-center">
          <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
            🌾 About AgroTech AI
          </p>
          <h1 className='md:text-3xl sm:text-2xl font-bold py-4 text-green-700'>
            Empowering Farmers with AI-Driven Solutions
          </h1>
          <p className="text-lg text-[#000435] bg-white text-justify">
            🌱 Our mission is to provide advanced AI tools to farmers, helping them optimize their agricultural practices.
          </p>
          <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-[#000435] bg-white '>
            🤔 How it Works!
          </p>
          <p className="text-lg text-[#000435] bg-white ">
            <span> ☑️ Access various machine learning models for crop prediction and soil analysis.</span><br />
            <span> ☑️ Use the platform to make informed decisions on crop management and pest control.</span><br />
          </p>
          <Link
            to="/"
            className='bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[170px] text-center font-medium my-6 mx-auto md:mx-0'
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Fixed message icon with tooltip */}
      <div className="relative">
        <Link to="/chatbot" className="group fixed bottom-4 right-20 bg-green-500 rounded-full p-3 shadow-lg transition-transform transform hover:scale-110">
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
