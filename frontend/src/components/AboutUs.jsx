import About from "../pages/About";
import aboutus from '../assets/aboutus.png';
import bgHero from "../assets/bgHero.png";
import editor from "../assets/editor.png";
import '../styles/hero.css'

function AboutUs() {
  return (
    <div className="w-full  py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div>
        <About />
        <div className="max-w-[1240px] mx-auto grid  gap-10 items-center">
          <div className="flex flex-col justify-center">
            <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
              🌾 About Us
            </p>
            <div className="flex">
              <div className="mr-5">
                <br /><br />
                <p className="text-lg text-[#000435] bg-white ">
                  <span> ✅  We empower farmers, agribusinesses, and stakeholders across the agricultural ecosystem by providing innovative, data-driven solutions that increase efficiency, reduce waste, and improve yields.</span><br /><br />
                  <span> ✅ We believe that technology should be accessible to all, which is why we collaborate closely with farmers, agronomists, and industry experts to develop practical solutions that cater to the unique needs of the agricultural sector.</span><br /><br />
                  <span> ✅ Whether it’s a small family farm or a large commercial operation, Agro Tech AI provides scalable, adaptable technology that helps businesses thrive in an ever-changing environment.</span><br /><br />
                </p>
                <br /><br />
              </div>
              <img className="w-[550px] mx-auto md:my-4" src={aboutus} alt="About Us" />
            </div>
            <p className="bg-gradient-to-r from-green-900 via-green-000 to-green-900 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
               Our Mission
            </p>
            <div className="flex">
              <img className="w-[550px] mx-auto md:my-4" src={editor} alt="About Us" />
              <div className="col-4">
                <br></br>
                <p className="text-lg text-[#000435] bg-white ">
                  <span>  At Agro Tech AI, our mission is to revolutionize agriculture through advanced artificial intelligence technologies. We are dedicated to creating AI-driven solutions that empower farmers and agribusinesses to optimize productivity, improve sustainability, and tackle the growing challenges of global food security.
                  By leveraging the power of AI, we aim to create a future where agriculture is not only more efficient but also more resilient to the challenges posed by climate change and global food insecurity. Through collaboration, innovation, and a deep commitment to the farming community, Agro Tech AI is determined to build a more sustainable and prosperous agricultural future for all.</span><br />
                </p>
                <br /><br /><br /><br />
              </div>
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

