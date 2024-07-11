import { RiTailwindCssFill } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import bgHero from "../assets/bgHero.png";
import { BiSolidCustomize } from "react-icons/bi";
import { FaLaptopFile } from "react-icons/fa6";

const featureData = [
  {
    icon: <RiTailwindCssFill size={23} />,
    title: "Responsive Design",
    description: "Our platform is designed to be fully responsive, ensuring a seamless experience on any device. Farmers can access our tools and resources on-the-go, whether on a smartphone, tablet, or desktop.",
  },
  {
    icon: <MdLeaderboard size={23} />,
    title: "Comprehensive Models",
    description: "AgroTech AI platform offers various machine learning models for accurate predictions. These models help farmers to make informed decisions about crop management , soil health , and pest control.",
  },
  {
    icon: <FaLaptopFile size={23} />,
    title: "User-Friendly Interface",
    description: "Our intuitive interface allows farmers to easily navigate throughout the platform and utilize the AI tools to solve there problem. The platform is designed to be accessible for users with  technical knowledge.",
  },
  {
    icon: <BiSolidCustomize size={23} />,
    title: "Customizable Solutions",
    description: "AgroTech AI provides customizable solutions  to the unique needs of each farm. Farmers can adjust parameters to get the most accurate and relevant predictions by using AI tools for their specific conditions.",
  }
];

const Features = () => {
  return (
      <section className="" style={{ backgroundImage: `url(${bgHero})` }}>
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  text-green-500 ">
              🫴 What we offer to Farmers 📦
            </h1>
          </div>
          <div className="flex flex-wrap -m-4 text-justify">
            {featureData.map((feature, index) => (
              <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="border border-green-700 border-opacity-75 p-6 rounded-lg   hover:bg-green-300  hover:border-green-200  cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-500 hover:bg-white text-white mb-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-lg text-green-600  font-medium title-font mb-2">{feature.title}</h2>
                  <p className="leading-relaxed hover:text-gray-800 text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Features;

