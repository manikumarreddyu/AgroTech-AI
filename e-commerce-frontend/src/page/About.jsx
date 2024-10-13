import React from 'react';

const About = () => {
  return (
    <div className="bg-green-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 text-center mb-6">
          About AgriMart
        </h1>

        {/* Main Content Section */}
        <div className="md:flex items-center gap-10">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src="/farming.png"
              alt="Farmers working in fields"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <p className="text-lg text-green-900 mb-4 leading-relaxed">
              Welcome to AgriMart, the trusted online marketplace dedicated to supporting farmers. Whether you’re looking for top-quality seeds, fertilizers, pesticides, or other essential farming supplies, we have everything you need in one place. Our mission is to provide farmers with easy access to the best agricultural products at affordable prices, ensuring that you have all the tools required to cultivate healthy crops and achieve your farming goals.
            </p>

            <p className="text-lg text-green-900 mb-6 leading-relaxed">
              At AgriMart, we are committed to serving the farming community by offering reliable, fast delivery, and customer support tailored to meet your needs. With an intuitive shopping experience, we help you make informed decisions about your purchases, so you can focus on what matters most—your farm's growth and sustainability.
            </p>

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-green-800 text-center mb-6">
            Why Choose AgriMart?
          </h2>
          <div className="md:flex justify-between items-center gap-8">
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="/quality.png"
                alt="High Quality Products"
                className="mx-auto w-16 mb-4"
              />
              <h3 className="text-2xl font-bold text-green-700 mb-2">Quality Products</h3>
              <p className="text-green-800">
                We offer only the highest quality seeds, fertilizers, and pesticides sourced from trusted brands.
              </p>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg text-center mt-8 md:mt-0">
              <img
                src="/agri.png"
                alt="Fast Delivery"
                className="mx-auto w-16 mb-4"
              />
              <h3 className="text-2xl font-bold text-green-700 mb-2">Fast & Reliable Delivery</h3>
              <p className="text-green-800">
                Get your products delivered quickly and securely, right to your doorstep.
              </p>
            </div>

            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg text-center mt-8 md:mt-0">
              <img
                src="/24.png"
                alt="Customer Support"
                className="mx-auto w-16 mb-4"
              />
              <h3 className="text-2xl font-bold text-green-700 mb-2">24/7 Customer Support</h3>
              <p className="text-green-800">
                Our dedicated support team is here to assist you with any inquiries or issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
