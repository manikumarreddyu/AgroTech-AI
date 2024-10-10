import { RiTailwindCssFill } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { BiSolidCustomize } from "react-icons/bi";
import { FaLaptopFile } from "react-icons/fa6";
import bgHero from "../assets/bgHero.png";

const featureData = [
  {
    icon: <RiTailwindCssFill size={23} />,
    title: "Responsive Design",
    description: "Our platform is designed to be fully responsive, ensuring a seamless experience on any device. Farmers can access our tools and resources on-the-go, whether on a smartphone, tablet, or desktop.",
  },
  {
    icon: <MdLeaderboard size={23} />,
    title: "Comprehensive Models",
    description: "AgroTech AI platform offers various machine learning models for accurate predictions. These models help farmers to make informed decisions about crop management, soil health, and pest control.",
  },
  {
    icon: <FaLaptopFile size={23} />,
    title: "User-Friendly Interface",
    description: "Our intuitive interface allows farmers to easily navigate throughout the platform and utilize the AI tools to solve their problems. The platform is designed to be accessible even for users with limited technical knowledge.",
  },
  {
    icon: <BiSolidCustomize size={23} />,
    title: "Customizable Solutions",
    description: "AgroTech AI provides customizable solutions tailored to the unique needs of each farm. Farmers can adjust parameters to get the most accurate and relevant predictions by using AI tools for their specific conditions.",
  },
];

const Features = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="container px-5 py-2 mx-auto">
        <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-green-700 mb-4">
            🫴 What We Offer to Farmers 📦
          </h1>
          <p className="text-base text-green-600 max-w-xl">
            Explore our cutting-edge AI-driven solutions crafted to transform farming practices for the better.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {featureData.map((feature, index) => (
            <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-green-200 to-green-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-green-500 text-white mb-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-green-700 mb-2">{feature.title}</h2>
                </div>
                <p className="leading-relaxed text-gray-600 mt-4">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
