import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className='bg-green-100'>

      <div>
        <Navbar />
      </div >
      <div className='flex flex-col justify-center items-center caret-transparent' >
        <div className="container flex-col  mt-24 px-4">
          
            <div className='flex justify-between'>
              <img className='h-40 w-40 rounded-lg border-4 shadow-sm border-green-300 hover:border-teal-500 transition duration-300' src="../src/assets/mm.png" alt="" />
              <img className='h-40 w-40 rounded-lg border-4 shadow-sm border-green-300 hover:border-teal-500 transition duration-300' src="../src/assets/hero.png" alt="" />
            </div>
            <div className='pb-10 -mt-20'>
              <h2 className="text-8xl caret-transparent text-center font-semibold mb-4">Join Our Team</h2>
            </div>
            <div className='flex justify-evenly space-x-96'>
              <img className='h-40 w-40 object-cover rounded-lg shadow-sm border-4 border-green-300 hover:border-teal-500 transition duration-300' src="https://cdn.dribbble.com/users/3152125/screenshots/10763828/media/e96161bb4abf3695dc7dd3579a605343.gif" alt="" />
              <img className='h-40 w-40 rounded-lg border-4 shadow-sm border-green-300 hover:border-teal-500 transition duration-300' src="../src/assets/logo2.png" alt="" />
            </div>
          
        </div>
        
        <div className='flex space-x-4  p-24 mt-4'>
          <div className='w-full md:w-1/2 flex rounded-lg bg-teal-200 items-center justify-center'>

            <h2 className="text-7xl text-center font-semibold mb-4">Who We Are?</h2>

          </div>
          <div className="w-full md:w-1/2 bg-teal-200 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold mb-4">AgroRent</h1>
            <p className="text-lg mb-6">AgroRent connects farmers with a diverse range of rental machinery, facilitating seamless transactions for increased productivity and reduced costs.</p>
            <h2 className="text-3xl font-semibold mb-2">Our Mission:</h2>
            <p className="text-lg mb-6">To provide farmers with easy access to quality agricultural machinery and equipment for rent, empowering them to enhance productivity and optimize resources.</p>
            <h2 className="text-3xl font-semibold mb-2">Our Values:</h2>
            <p className="text-lg mb-6">Committed to quality, customer satisfaction, and fostering transparent, trustworthy relationships.</p>
          </div>
        </div>
      </div>
      
      <div>
        <Footer />
      </div >
    </div>

  );
}

export default About;
