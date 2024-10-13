'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import allcrops from '../assets/crops/allcrops.png'

const fruits = [
  {
    name: "Apple",
    image: "https://post.healthline.com/wp-content/uploads/2020/09/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549.jpg",
    content: `Apple Scab: Fungal disease causing black or brown lesions on leaves and fruit.
              Fire Blight: Bacterial infection that causes branches and fruit to wither and die.
              Powdery Mildew: Fungal disease that forms white powdery spots on leaves, buds, and fruit.
              Cedar Apple Rust: Fungal disease leading to bright orange lesions on leaves and fruit.`,
  },
  {
    name: "Blueberry",
    image: "https://www.supermarketperimeter.com/ext/resources/0430-blueberries.png?t=1588260305&width=1080",
    content: `Mummy Berry: A fungal disease that causes fruit to shrivel and drop prematurely.
              Botrytis Blight (Gray Mold): Causes rotting of the flowers, fruit, and leaves.
              Anthracnose: Leads to leaf spots and fruit rot.
              Blueberry Rust: Causes orange pustules on the undersides of leaves.`,
  },
  {
    name: "Cherry",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/health_benefits_of_cherries_slideshow/1800x1200_health_benefits_of_cherries_slideshow.jpg",
    content: `Cherry Leaf Spot: Fungal disease causing yellowing and premature leaf drop.
              Brown Rot: Fungal infection that rots fruit and affects blossoms and twigs.
              Bacterial Canker: Causes sunken, oozing lesions on twigs and fruit.
              Powdery Mildew: Leads to white, powdery growth on leaves and fruit.`,
  },
  {
    name: "Corn",
    image: "https://m.media-amazon.com/images/I/41F62-VbHSL.AC_UF1000,1000_QL80.jpg",
    content: `Northern Corn Leaf Blight: Fungal disease causing large, tan lesions on leaves.
              Common Rust: Fungal disease causing pustules on leaves.
              Gray Leaf Spot: Causes rectangular gray-brown spots on leaves.
              Corn Smut: Fungal infection that causes swollen galls on kernels.`,
  },
  {
    name: "Grape",
    image: "https://i.ndtvimg.com/i/2015-09/grapes_625x350_61443376353.jpg",
    content: `Powdery Mildew: White, powdery growth on leaves and fruit.
              Downy Mildew: Yellowish spots on leaves with fuzzy growth on undersides.
              Botrytis Bunch Rot: Gray mold that causes rot on fruit clusters.
              Black Rot: Causes black lesions on leaves, stems, and fruit.`,
  },
  {
    name: "Orange",
    image: "https://www.irishtimes.com/polopoly_fs/1.3923226.1560339148!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg",
    content: `Citrus Canker: Bacterial disease causing raised, corky lesions on fruit, leaves, and twigs.
              Greasy Spot: Fungal disease causing oily-looking lesions on leaves.
              Huanglongbing (Citrus Greening): Bacterial disease causing yellowing leaves and misshapen fruit.
              Anthracnose: Causes leaf and fruit lesions, often after wet conditions.`,
  },
  {
    name: "Peach",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/the_health_benefits_of_peaches_slideshow/thinkstock_rf_peaches.jpg?resize=650px:*",
    content: `Peach Leaf Curl: Fungal disease causing puckered, curled, and discolored leaves.
              Brown Rot: Fungal infection that causes fruit rot and blossom blight.
              Bacterial Spot: Causes small, water-soaked lesions on fruit and leaves.
              Cytospora Canker: Fungal disease that causes sunken cankers on branches.`,
  },
  {
    name: "Pepper Bell",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Green-Yellow-Red-Pepper-2009.jpg",
    content: `Bacterial Spot: Causes small, dark lesions on leaves and fruit.
              Anthracnose: Leads to dark, sunken lesions on fruit.
              Phytophthora Blight: Causes stem rot, root rot, and fruit rot.
              Powdery Mildew: A white fungal growth on leaves and stems.`,
  },
  {
    name: "Potato",
    image: "https://m.economictimes.com/thumb/height-450,width-600,imgsize-111140,msid-72862126/potato-getty.jpg",
    content: `Late Blight: A fungal-like pathogen causing blackened leaves and tuber rot.
              Early Blight: Causes brown spots with concentric rings on leaves and tubers.
              Blackleg: A bacterial disease causing dark, mushy stems and tubers.
              Common Scab: Bacterial disease causing rough, scabby lesions on tubers.`,
  },
  {
    name: "Raspberry",
    image: "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326272/raspberries-with-ketones-in-a-bowl.jpg?w=1155&h=1541",
    content: `Anthracnose: Causes small, dark lesions on canes and fruit.
              Botrytis Fruit Rot (Gray Mold): Affects fruit, causing them to rot.
              Phytophthora Root Rot: Causes wilting and root decay.
              Powdery Mildew: Causes white, powdery growth on leaves and fruit.`,
  },
  {
    name: "Soybean",
    image: "https://m.economictimes.com/thumb/msid-66988154,width-1200,height-900,resizemode-4,imgsize-211276/soyabean-agencies.jpg",
    content: `Soybean Cyst Nematode: A microscopic worm that affects roots and reduces yield.
              Frogeye Leaf Spot: Causes circular, brown spots on leaves.
              Sudden Death Syndrome (SDS): Fungal disease causing leaf yellowing and root rot.
              Brown Stem Rot: A fungal disease affecting stems and roots.`,
  },
  {
    name: "Squash",
    image: "https://post.healthline.com/wp-content/uploads/2020/08/squash-fruit-or-vegetable-732x549-thumbnail-732x549.jpg",
    content: `Powdery Mildew: White powdery growth on leaves.
              Downy Mildew: Yellow patches on leaves with fuzzy growth underneath.
              Squash Vine Borer: Insect that bores into stems causing wilting.
              Cucumber Mosaic Virus: Causes mottled leaves and distorted fruit.`,
  },
  {
    name: "Strawberry",
    image: "https://images.indianexpress.com/2020/02/strawberry-1200.jpg",
    content: `Gray Mold: Fungal disease that causes fruit rot.
              Powdery Mildew: White fungal growth on leaves and fruit.
              Anthracnose: Causes dark, sunken lesions on fruit.
              Leaf Spot: Small, dark spots on leaves and fruit.`,
  },
  {
    name: "Tomato",
    image: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
    content: `Blossom End Rot: Causes black, sunken spots on the blossom end of the fruit.
              Early Blight: Brown spots with concentric rings on leaves and fruit.
              Late Blight: Fungal-like pathogen causing blackened leaves and fruit rot.
              Tomato Mosaic Virus: Causes mottling and distortion of leaves.`,
  },
];

export default function PlantDiseaseDetection() {
  const [showCropList, setShowCropList] = useState(false)
  const [activeCard, setActiveCard] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8 py-24">
      <motion.h1 
        className="text-4xl font-bold text-green-700 text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🍃 Plant Disease Detection 🍃
      </motion.h1>
      
      <motion.p 
        className="text-xl text-green-600 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Choose the AI engine based on the plant species you want to diagnose for diseases.
      </motion.p>
  
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-2xl font-semibold text-green-600 mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Special AI Engines
        </motion.h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {['Sugarcane', 'Paddy'].map((crop, index) => (
            <motion.div 
              key={crop}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
            >
              <div className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border rounded-lg border-green-200">
                <img 
                  src={crop === 'Sugarcane' ? 'https://cdn.pixabay.com/photo/2020/07/09/20/00/sugarcane-5388614_640.jpg' : 'https://m.media-amazon.com/images/I/51K+Xh2VIOL._AC_UF1000,1000_QL80_.jpg'}
                  alt={`${crop} Image`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Link 
                    href={`/${crop}Recognition`}
                    className="text-xl font-semibold text-green-700 hover:text-green-500 transition-colors duration-300"
                  >
                    {crop} Engine
                  </Link>
                  {/* Add buttons for each engine */}
                  <div className="mt-4">
                    <Link 
                      to={`/${crop}Recognition`}
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-colors duration-300 mr-2"
                    >
                      Click Here
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
  
        <motion.h2 
          className="text-2xl font-semibold text-green-600 mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Combined AI Engine
        </motion.h2>
  
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <div className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border rounded-lg border-green-200">
            <div className="p-6">
              <img 
                src={allcrops}
                alt="Combined Crops"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-center mb-4">
                <Link 
                  href="/DiseaseRecognition"
                  className="text-xl font-semibold text-green-700 hover:text-green-500 transition-colors duration-300"
                >
                  Crop Engine
                </Link>
                <button
                  onClick={() => setShowCropList(!showCropList)}
                  className="flex items-center text-green-600 hover:text-green-700 transition-colors duration-300 border border-green-600 px-3 py-1 rounded-md"
                >
                  {showCropList ? <ChevronUp /> : <ChevronDown />}
                  <span className="ml-2">{showCropList ? "Hide Crops" : "Show Crops"}</span>
                </button>
              </div>
              <div className="mt-4">
                <Link 
                  to={"/DiseaseRecognition"}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-colors duration-300 mr-2"
                >
                  Click Here
                </Link>
              </div>
  
              {showCropList && (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" // Adjusted grid columns for better responsiveness
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                >
                  {fruits.map((fruit, index) => (
                    <div 
                      key={fruit.name}
                      className="overflow-hidden cursor-pointer transition-shadow duration-300 border rounded-md border-green-200 hover:shadow-lg hover:shadow-green-300" 
                      onMouseEnter={() => setActiveCard(index)}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                      <div className="p-4">
                        <img 
                          src={fruit.image} 
                          alt={fruit.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <h3 className="text-lg font-medium text-green-700 mb-2">{fruit.name}</h3>
                        <motion.p 
                          className={`text-sm transition-opacity duration-300 ${activeCard === index ? 'opacity-100' : 'opacity-50'}`}
                        >
                          {fruit.content}
                        </motion.p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}  