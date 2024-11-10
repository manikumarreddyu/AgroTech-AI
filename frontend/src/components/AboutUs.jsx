import About from "../pages/About";
import aboutus from '../assets/aboutus.png';
import bgHero from "../assets/bgHero.png";
import editor from "../assets/editor.png";
import { Link } from "react-router-dom";
import about from '../assets/about.png';
import '../styles/hero.css'

function AboutUs() {
  return (
    <div className="w-full  py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <br />
      <div>
        {/* About Component Without Button */}
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center mt-10">
          {/* Image Section */}
          <img
            className="w-full md:w-[500px] mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
            src={about}
            alt="About Us"
          />

          {/* Text Section */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-5xl font-bold py-1">
              🌾 About AgroTech AI
            </p>
            <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold py-4 text-green-700">
              Empowering Farmers with AI-Driven Solutions
            </h1>

            {/* Mission Card */}
            <div className="bg-gradient-to-r from-green-200 to-green-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6 h-[200px] my-5">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">🌟 Our Mission</h2>
              <p className="text-md text-[#000435] leading-relaxed">
                We aim to empower farmers with innovative solutions that harness the power of AI, enabling them to achieve better yields, reduce waste, and promote sustainable farming practices.
              </p>
            </div>

            {/* How It Works Section with Cards */}
            <div className="w-full">
              <div className="bg-gradient-to-r from-green-200 to-green-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-[200px] my-5">
                <h2 className="text-2xl font-semibold text-green-700 mb-2">🤔 How it Works!</h2>
                <p className="text-md text-[#000435] leading-relaxed">
                  <span>☑️ Access various machine learning models for crop prediction and soil analysis.</span><br />
                  <span>☑️ Use the platform to make informed decisions on crop management and pest control.</span><br />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto grid gap-10 items-center">
          {/* About Us Section */}
          <div className="flex flex-col justify-center">
            <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
              🌾 About Us
            </p>
            <div className="grid md:grid-cols-2">
              <div className="mt-10">
                <p className="text-lg text-[#000435] bg-white">
                  <span> ✅  We empower farmers, agribusinesses, and stakeholders across the agricultural ecosystem by providing innovative, data-driven solutions that increase efficiency, reduce waste, and improve yields.</span><br /><br />
                  <span> ✅ We believe that technology should be accessible to all, which is why we collaborate closely with farmers, agronomists, and industry experts to develop practical solutions that cater to the unique needs of the agricultural sector.</span><br /><br />
                  <span> ✅ Whether it’s a small family farm or a large commercial operation, Agro Tech AI provides scalable, adaptable technology that helps businesses thrive in an ever-changing environment.</span><br /><br />
                </p>
              </div>
              <img className="w-full md:w-[500px] mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-white" src={aboutus} alt="About Us" />
            </div>
            {/* Mission */}
            <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
            Our Mission
            </p>
            <div className="grid md:grid-cols-2 gap-8 my-5">
              <div className="col-4 md:order-last">
                <p className="text-lg text-[#000435] bg-white ">
                  <span>  At Agro Tech AI, our mission is to revolutionize agriculture through advanced artificial intelligence technologies. We are dedicated to creating AI-driven solutions that empower farmers and agribusinesses to optimize productivity, improve sustainability, and tackle the growing challenges of global food security.
                  By leveraging the power of AI, we aim to create a future where agriculture is not only more efficient but also more resilient to the challenges posed by climate change and global food insecurity. Through collaboration, innovation, and a deep commitment to the farming community, Agro Tech AI is determined to build a more sustainable and prosperous agricultural future for all.</span><br />
                </p>
              </div>
              <img className="w-full md:w-[500px] mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-white" src={editor} alt="About Us" />
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>

  )
}

export default AboutUs;
