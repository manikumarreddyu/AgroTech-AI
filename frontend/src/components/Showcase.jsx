import editor from "../assets/prediction.webp";

const Showcase = () => {
  const editorData = {
    title: "🚀 Our Prediction Models 🚀",
    features: [
      {
        title: "Accurate Predictions",
        description: "Utilize our state-of-the-art prediction models to get accurate insights on crop yield, soil health, and pest outbreaks. Make data-driven decisions to enhance your farming practices."
      },
      {
        title: "User-Friendly Interface",
        description: "Our platform offers an intuitive and easy-to-navigate interface, making it simple for farmers to input data and understand the results without needing technical expertise."
      },
      {
        title: "Customizable Reports",
        description: "Generate and customize detailed reports based on your specific requirements. Share these reports with stakeholders to showcase farm performance and improvements."
      }
    ]
  };
  
  return (
    <section className="text-[#000435] bg-white dark:text-white dark:bg-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl mb-6 lg:mb-14 font-extrabold text-center text-[#b752fa] dark:text-white">
          {editorData.title}
        </p>
        <div className="flex flex-col md:flex-row md:space-x-6 items-center">
          <div className="md:w-1/2 space-y-5">
            {editorData.features.map((feature, index) => (
              <div key={index} className="p-4 sm:p-4 md:p-6 lg:p-8 rounded-lg shadow-md border dark:bg-green-600 border-green-600 transition-transform duration-300 hover:-translate-y-2">
                <h3 className="text-md md:text-xl lg:text-2xl font-bold mb-2 text-[#b752fa] dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-md lg:text-lg ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
            <img src={editor} alt="Code Editor" className="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
