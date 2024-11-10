import { useState } from 'react';
import { motion } from 'framer-motion';
import img1 from "/rent-assets/tp.png";

export default function HeroSectionRent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqCount, setFaqCount] = useState(3);

  // Data for features and FAQs
  const featureData = [
    { step: 'Tractors & Tillers 🚜', desc: 'Find high-performance tractors for heavy-duty tasks or tillers for soil preparation' },
    { step: 'Irrigation Systems 💧', desc: 'Rent or lease modern irrigation systems to ensure optimal water management' },
    { step: 'Harvesting Tools 🌾', desc: 'Get harvesting tools that help increase efficiency during peak season' },
    { step: 'Planting Equipment 🌱', desc: 'Automate your planting process with the best planting machinery available' },
  ];

  const faqs = [
    { step: 'How do I rent equipment?', desc: 'You can rent equipment by signing up and browsing our catalog. Once you find the equipment you need, book it based on availability.' },
    { step: 'How long can I rent equipment for?', desc: 'The duration of rentals can vary based on the equipment and your needs. Most equipment can be rented for days, weeks, or months.' },
    { step: 'What are the payment options?', desc: 'We support multiple payment options including credit cards, UPI, and net banking for hassle-free transactions.' },
    { step: 'Can I lease equipment long-term?', desc: 'Yes, we offer flexible leasing options for farmers looking to use equipment for extended periods.' },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const loadMoreFAQs = () => {
    setFaqCount(faqCount + 2);
  };

  return (
    <motion.div
      className="mt-16 flex flex-col items-center justify-center overflow-hidden min-h-screen"
      style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
    >
      {/* Hero Section */}
      <motion.div
        className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:w-2/3 text-center mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Rent or Lease Agricultural Equipment Easily with AgroRent AI
          </h1>
          <p className="text-xl sm:text-2xl text-green-100 mb-8">
            Empowering farmers to access modern equipment, anytime, anywhere.
          </p>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by equipment, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
            />
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[  
              { step: 'Step 1: Register & Browse', desc: 'Sign up to explore our wide range of agricultural equipment available for rent.' },
              { step: 'Step 2: Select & Book', desc: 'Choose the equipment you need, and book it for rent based on your location and needs.' },
              { step: 'Step 3: Deliver & Use', desc: 'Get the equipment delivered to your farm and start improving your operations right away.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 hover:from-green-300 hover:to-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-green-700">{item.step}</h3>
                <p className="mt-4 text-green-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">Features</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 hover:from-green-300 hover:to-green-400"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-green-700">{item.step}</h3>
                <p className="mt-4 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">Frequently Asked Questions</h2>
          <div className="mt-12 space-y-6">
            {faqs.slice(0, faqCount).map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 hover:from-green-300 hover:to-green-400"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3
                  className="text-xl font-semibold text-green-700 cursor-pointer hover:text-green-900 transition-colors duration-300"
                  onClick={() => handleToggle(index)}
                >
                  {item.step}
                </h3>
                {activeIndex === index && <p className="mt-4 text-green-600">{item.desc}</p>}
              </motion.div>
            ))}
          </div>
          {faqCount < faqs.length && (
            <div className="text-center mt-8">
              <motion.button
                onClick={loadMoreFAQs}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More FAQs
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
