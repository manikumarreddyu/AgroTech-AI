import React from "react";
import backgroundImg from "../assets/rental.jpg";
import toolImg from "../assets/images/tools.jpeg"
const Rental = () => {
  return (
    <div className="bg-green-600 text-white ">
      <div
        class="h-fit bg-cover bg-center bg-blur"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <header className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <img
              alt="AgroTech logo"
              className="w-10 h-10"
              height="40"
              src="https://storage.googleapis.com/a1aa/image/J8kfvhH4xdVqQCOaEXFEYuFkVjaL32FWDenUcPp7T9sxRvlTA.jpg"
              width="40"
            />
            <span className="text-green-400 font-bold text-xl">AgroTech</span>
          </div>
          <nav className="space-x-4">
            <a className="text-white" href="#">
              Home
            </a>
            <a className="text-white" href="#">
              Drones
            </a>
            <a className="text-white" href="#">
              Tractors
            </a>
            <a className="text-white" href="#">
              Equipment
            </a>
            <a className="text-white" href="#">
              Services
            </a>
            <a className="text-white" href="#">
              Resources
            </a>
            <a className="text-white" href="#">
              Contact Us
            </a>
          </nav>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Get Started
          </button>
        </header>
        <div className="p-8">
          <div className="flex mb-8">
            <div className="w-1/2">
              <section className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-4">
                  Innovative agricultural technology at AgroTech AI
                </h1>
                <p className="text-lg mb-6">
                  Rent cutting-edge drones and tractors & equipment for
                  efficient agriculture.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-green-500 text-white px-6 py-3 rounded">
                    Benefits
                  </button>
                  <button className="bg-white text-blue-900 px-6 py-3 rounded">
                    Explore More
                  </button>
                </div>
              </section>
              <section className="mb-8">
                <div className="bg-white/50 p-4 rounded-lg w-fit mt-10 mx-auto h-fit transition duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                  <img
                    alt="Drone image"
                    className="h-48 object-cover rounded-lg mb-4"
                    height="200"
                    src="https://storage.googleapis.com/a1aa/image/dybtkboFx1rUIpucahtf3fEmdbMgtiOoLCL1o1ee8oaknGXOB.jpg"
                    width="400"
                  />
                  <h2 className="text-xl font-extrabold mb-1 ml-2 text-green-900">
                    How this Works
                  </h2>
                  <div className="steps text-sm mb-2  bg-opacity-75 py-0 px-3 rounded-lg">
                    <p class="text-gray-700">
                      <span class="font-semibold text-grey">Step 1:</span> Select Your
                      Equipment
                    </p>
                    <p class="text-gray-700">
                      <span class="font-semibold">Step 2:</span> Book & Use
                    </p>
                    <p class="text-gray-700">
                      <span class="font-semibold">Step 3:</span> Enjoy the
                      Benefits
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-1/2"></div>
          </div>
        </div>
      </div>
      <main className="p-8">
        <section>
          <h2 className="text-center text-black justify-center text-3xl font-bold px-20 ">
            Featured Rentals
          </h2>
          <p className="text-center text-black justify-center text-lg font-bold mb-4 mt-4 px-20 bg-gradient-to-r from-green-500 via-green-300 to-green-900 inline-block py-2 rounded">
  Explore our top-rated equipment designed to boost efficiency and productivity on your farm. From high-tech drones to powerful tractors, our featured rentals offer the latest in agricultural innovation, helping you achieve more with less effort. Rent now and take your farming to the next level!
</p>
          <div className="flex space-x-4">
            <div className="bg-gray-800 p-4 rounded-lg w-1/2 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md">
              <img
                alt="Smart Agriculture image"
                className="w-full h-48 object-cover rounded-lg mb-4"
                height="200"
                src="https://storage.googleapis.com/a1aa/image/MEvKorMMCirAH5zp1gSeHwmXf1AzdDmSpUYmlQZKGEC8ixlTA.jpg"
                width="300"
              />
              <h3 className="text-xl font-bold mb-2">Harvesting Equipment</h3>
              <p className="text-gray-400 mb-4">Combine Harvesters</p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500" />
                  <span>Fast, reliable, adaptable to various crops.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500" />
                  <span>
                    Increase your harvesting efficiency with our
                    state-of-the-art combine harvesters, available for rent.
                    Suitable for grains, maize, and more.{" "}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg w-1/2 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md">
              <img
                alt="Smart Agriculture image"
                className="w-full h-48 object-cover rounded-lg mb-4"
                height="200"
                src="https://storage.googleapis.com/a1aa/image/VHK8EuZimS4IIReCqflD7JGXqyTmAOOcYaTXrb0UTD89ixlTA.jpg"
                width="300"
              />
              <h3 className="text-xl font-bold mb-2">Irrigation Systems</h3>
              <p className="text-gray-400 mb-4">Smart Irrigation Equipment</p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500" />
                  <span>
                    Soil moisture sensors, automated water control, easy setup.
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500" />
                  <span>
                    Rent advanced irrigation systems designed to conserve water
                    and ensure optimal moisture levels for your crops.{" "}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg w-1/2 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md">
              <img
                alt="Smart Agriculture image"
                className="w-full h-48 object-cover rounded-lg mb-4"
                height="200"
                src="https://storage.googleapis.com/a1aa/image/pytEghY6sGqDABBi0ya0DfDgea7qWbbljXtQlZiisEu5ixlTA.jpg"
                width="300"
              />
              <h3 className="text-xl font-bold mb-2">Tractor Rentals</h3>
              <p className="text-gray-400 mb-4">High-Performance Tractors</p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500" />
                  <span>
                    GPS navigation, automated steering, fuel efficiency.
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500" />
                  <span>
                    Lease modern tractors designed for a variety of tasks
                    including plowing, tilling, and seeding. Improve farm
                    productivity with minimal effort.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg w-1/2 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md">
              <img
                alt="Smart Agriculture image"
                className="w-full h-48 object-cover rounded-lg mb-4"
                height="200"
                src="https://storage.googleapis.com/a1aa/image/oJAEQiuSEwpkN9jExQdVMx53fLkHSYfUiUFi6OO2VKK6ixlTA.jpg"
                width="300"
              />
              <h3 className="text-xl font-bold mb-2 text-">Drone Rentals</h3>
              <p className="text-gray-400 mb-4">Precision Farming Drones</p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500 " />
                  <span >
                    Rent cutting-edge drones equipped with multispectral and
                    thermal sensors to monitor crop health, optimize irrigation,
                    and boost yields.
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500" />
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
         
 </section>
        <section className="mt-8">
        <h2 className="text-center text-black justify-center text-3xl font-bold px-20 ">
            Featured Equipment
          </h2>
          <p className="text-center text-black justify-center text-lg font-bold mb-4 mt-8 px-20 bg-gradient-to-r from-green-500 via-green-300 to-green-900 inline-block py-2 rounded">
  Discover our advanced agricultural equipment engineered to enhance productivity and efficiency on your farm. From precision seeders to robust harvesters, our rental options include the latest technology in farming, empowering you to maximize your yield with ease. Rent today and transform your farming experience!
</p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <img
              alt="Equipment image"
              className="w-full h-64 object-cover rounded-lg mb-4"
              height="200"
              src= {toolImg}
              width="800"
            />
            <h3 className="text-xl font-bold text-green-400 ml-2">
            Agricultural Tools
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="mt-0 fa-check text-gray-500 ml-2">Modern Agricultural Tools</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-check" />
                <span>Rent a variety of advanced agricultural tools to enhance your farming operations. Our selection includes precision seed drills for uniform sowing, heavy-duty plows for effective soil preparation, and automated sprayers for efficient pest and nutrient application.</span>
              </li>
              <li className="flex items-center space-x-2 ml-2">
                <span className="fas fa-check text-gray-500">Starting from &#x20B9;50/day</span>
              </li>
            </ul>
          </div>
          

        </section>
      </main>
    </div>
  );
};

export default Rental;
