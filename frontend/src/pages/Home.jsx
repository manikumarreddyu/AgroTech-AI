import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import bgHero from "../assets/bgHero.png";
import '../styles/hero.css';
import About from "./About";
import MagicButton from "../components/ui/MagicButton";
import TestimonialSlider from "../components/TestimonialSlider";
import FAQ from "../components/FAQ";
import Showcase from "../components/Showcase";
import Features from "../components/Features";

function Home() {
  console.log("Home page rerendered");

  document.title = 'AgroTech AI';

  return (      
    <div className="mt-10 min-h-screen dark:bg-green-500">
      <div className="w-full py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="text-4xl text-green-500 font-bold">
              Welcome To AgroTech AI
            </p>
            <h1 className='md:text-3xl sm:text-3xl font-medium py-2 text-green-700'>A simple web-based platform where users can easily</h1>
            <p className="text-lg text-[#000435] font-semibold">
              <span> ✅ Explore - Discover a variety of AI models tailored to enhance farming practices. From crop prediction to soil analysis, explore solutions designed to optimize agricultural productivity.</span><br />
            </p>
            <Link to="/" className='mt-9'>
              <MagicButton title="Explore Now" />
            </Link>
            {/* Link to Contact Us */}
            <Link to="/contact" className='mt-4'>
              <MagicButton title="Contact Us" />
            </Link>
          </div>
          <img className="w-[600px] imgAnimate" src={hero} alt="About Us" />
        </div>
      </div>
      <Features />
      <About />
      <Showcase />
      <TestimonialSlider />
      <FAQ />
    </div>
  );
}

export default Home;
