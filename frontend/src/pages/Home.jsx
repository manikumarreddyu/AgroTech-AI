import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import bgHero from "../assets/bgHero.png";
import '../styles/hero.css'
import About from "./About";
import { TypewriterEffectSmoothDemo } from "../components/HeroText";
import MagicButton from "../components/ui/MagicButton";
import TestimonialSlider from "../components/TestimonialSlider";
import FAQ from "../components/FAQ";
import Showcase from "../components/Showcase";
import Features from "../components/Features";

function Home() {
  console.log("Home page rerendered");

  document.title = 'AgroTech AI | Welcome 🙏';

  return (      
    <div className="mt-10 min-h-screen text-[#000435] bg-white dark:text-white dark:bbg-green-500" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full text-[#000435] bg-white dark:text-white dark:bg-green-400 py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1>
              <TypewriterEffectSmoothDemo />
            </h1>
            <h1 className='md:text-3xl sm:text-3xl font-medium py-2'>A simple web-based platform where users can easily</h1>
            <p className="text-lg text-[#000435] bg-white dark:text-white dark:bg-green-400 font-semibold">
              {/* <span> ☑️ Contribute -Share your knowledge and insights to improve our AI models. Join our community of farmers, researchers, and tech enthusiasts to drive innovation in agriculture.</span><br /> */}
              <span> ☑️ Explore - Discover a variety of AI models tailored to enhance farming practices. From crop prediction to soil analysis, explore solutions designed to optimize agricultural productivity.</span><br />
            
            </p>
            <Link
              to="/app/posts"
              className='text-[#000435] bg-white dark:text-white dark:bg-green-400 mt-9'>
              <MagicButton title="Explore Now" />
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
