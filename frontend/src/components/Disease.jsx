import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const Disease = () => {
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(Array(14).fill(false)); // Create an array for each fruit's flip state

  // Function to handle flipping individual cards
  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index]; // Toggle the flip state of the card at index
    setFlipped(newFlipped);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

const fruits = [
  {
    name: 'Apple',
    image: 'https://post.healthline.com/wp-content/uploads/2020/09/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549.jpg',
    content: `Apple Scab: Fungal disease causing black or brown lesions on leaves and fruit.
              Fire Blight: Bacterial infection that causes branches and fruit to wither and die.
              Powdery Mildew: Fungal disease that forms white powdery spots on leaves, buds, and fruit.
              Cedar Apple Rust: Fungal disease leading to bright orange lesions on leaves and fruit.`
  },
  {
    name: 'Blueberry',
    image: 'https://www.supermarketperimeter.com/ext/resources/0430-blueberries.png?t=1588260305&width=1080',
    content: `Mummy Berry: A fungal disease that causes fruit to shrivel and drop prematurely.
              Botrytis Blight (Gray Mold): Causes rotting of the flowers, fruit, and leaves.
              Anthracnose: Leads to leaf spots and fruit rot.
              Blueberry Rust: Causes orange pustules on the undersides of leaves.`
  },
  {
    name: 'Cherry',
    image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/health_benefits_of_cherries_slideshow/1800x1200_health_benefits_of_cherries_slideshow.jpg',
    content: `Cherry Leaf Spot: Fungal disease causing yellowing and premature leaf drop.
              Brown Rot: Fungal infection that rots fruit and affects blossoms and twigs.
              Bacterial Canker: Causes sunken, oozing lesions on twigs and fruit.
              Powdery Mildew: Leads to white, powdery growth on leaves and fruit.`
  },
  {
    name: 'Corn',
    image: 'https://m.media-amazon.com/images/I/41F62-VbHSL._AC_UF1000,1000_QL80_.jpg',
    content: `Northern Corn Leaf Blight: Fungal disease causing large, tan lesions on leaves.
              Common Rust: Fungal disease causing pustules on leaves.
              Gray Leaf Spot: Causes rectangular gray-brown spots on leaves.
              Corn Smut: Fungal infection that causes swollen galls on kernels.`
  },
  {
    name: 'Grape',
    image: 'https://i.ndtvimg.com/i/2015-09/grapes_625x350_61443376353.jpg',
    content: `Powdery Mildew: White, powdery growth on leaves and fruit.
              Downy Mildew: Yellowish spots on leaves with fuzzy growth on undersides.
              Botrytis Bunch Rot: Gray mold that causes rot on fruit clusters.
              Black Rot: Causes black lesions on leaves, stems, and fruit.`
  },
  {
    name: 'Orange',
    image: 'https://www.irishtimes.com/polopoly_fs/1.3923226.1560339148!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
    content: `Citrus Canker: Bacterial disease causing raised, corky lesions on fruit, leaves, and twigs.
              Greasy Spot: Fungal disease causing oily-looking lesions on leaves.
              Huanglongbing (Citrus Greening): Bacterial disease causing yellowing leaves and misshapen fruit.
              Anthracnose: Causes leaf and fruit lesions, often after wet conditions.`
  },
  {
    name: 'Peach',
    image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/the_health_benefits_of_peaches_slideshow/thinkstock_rf_peaches.jpg?resize=650px:*',
    content: `Peach Leaf Curl: Fungal disease causing puckered, curled, and discolored leaves.
              Brown Rot: Fungal infection that causes fruit rot and blossom blight.
              Bacterial Spot: Causes small, water-soaked lesions on fruit and leaves.
              Cytospora Canker: Fungal disease that causes sunken cankers on branches.`
  },
  {
    name: 'Pepper Bell',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Green-Yellow-Red-Pepper-2009.jpg',
    content: `Bacterial Spot: Causes small, dark lesions on leaves and fruit.
              Anthracnose: Leads to dark, sunken lesions on fruit.
              Phytophthora Blight: Causes stem rot, root rot, and fruit rot.
              Powdery Mildew: A white fungal growth on leaves and stems.`
  },
  {
    name: 'Potato',
    image: 'https://m.economictimes.com/thumb/height-450,width-600,imgsize-111140,msid-72862126/potato-getty.jpg',
    content: `Late Blight: A fungal-like pathogen causing blackened leaves and tuber rot.
              Early Blight: Causes brown spots with concentric rings on leaves and tubers.
              Blackleg: A bacterial disease causing dark, mushy stems and tubers.
              Common Scab: Bacterial disease causing rough, scabby lesions on tubers.`
  },
  {
    name: 'Raspberry',
    image: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326272/raspberries-with-ketones-in-a-bowl.jpg?w=1155&h=1541',
    content: `Anthracnose: Causes small, dark lesions on canes and fruit.
              Botrytis Fruit Rot (Gray Mold): Affects fruit, causing them to rot.
              Phytophthora Root Rot: Causes wilting and root decay.
              Powdery Mildew: Causes white, powdery growth on leaves and fruit.`
  },
  {
    name: 'Soybean',
    image: 'https://m.economictimes.com/thumb/msid-66988154,width-1200,height-900,resizemode-4,imgsize-211276/soyabean-agencies.jpg',
    content: `Soybean Cyst Nematode: A microscopic worm that affects roots and reduces yield.
              Frogeye Leaf Spot: Causes circular, brown spots on leaves.
              Sudden Death Syndrome (SDS): Fungal disease causing leaf yellowing and root rot.
              Brown Stem Rot: A fungal disease affecting stems and roots.`
  },
  {
    name: 'Squash',
    image: 'https://post.healthline.com/wp-content/uploads/2020/08/squash-fruit-or-vegetable-732x549-thumbnail-732x549.jpg',
    content: `Powdery Mildew: White powdery growth on leaves.
              Downy Mildew: Yellow patches on leaves with fuzzy growth underneath.
              Squash Vine Borer: Insect that bores into stems causing wilting.
              Cucumber Mosaic Virus: Causes mottled leaves and distorted fruit.`
  },
  {
    name: 'Strawberry',
    image: 'https://images.indianexpress.com/2020/02/strawberry-1200.jpg',
    content: `Gray Mold: Fungal disease that causes fruit rot.
              Powdery Mildew: White fungal growth on leaves and fruit.
              Anthracnose: Causes dark, sunken lesions on fruit.
              Leaf Spot: Small, dark spots on leaves and fruit.`
  },
  {
    name: 'Tomato',
    image: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg',
    content: `Blossom End Rot: Causes black, sunken spots on the blossom end of the fruit.
              Early Blight: Brown spots with concentric rings on leaves and fruit.
              Late Blight: Fungal-like pathogen causing blackened leaves and fruit rot.
              Tomato Mosaic Virus: Causes mottling and distortion of leaves.`
  }
];

  return (
    <div className=''>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-500">🍁Plant Disease Detection🍁</h1>
            <p className="text-xl text-gray-700 mt-2">
              This AI Engine Will Help To Detect Disease From Following Fruits And Veggies
            </p>
          </div>
          <div className="text-center mb-8">
            <Link to="/engine" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              AI Engine
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full [perspective:10000px]">
            {fruits.map((fruit, index) => (
              <div
                key={index}
                className={`w-full h-64 relative bg-white shadow rounded-lg p-4 transition-all duration-1000 [transform-style:preserve-3d] ${
                  flipped[index] ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                <div className="[backface-visibility:hidden]">
                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    onMouseEnter={() => handleFlip(index)} onClick = {() => handleFlip(index)}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-center font-medium text-gray-800">{fruit.name}</p>
                </div>
                <div onMouseLeave={() => handleFlip(index)} onClick = {() => handleFlip(index)} className="w-full h-64 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] absolute inset-0 bg-green-200 flex justify-center items-center">
                  <p className="text-lg text-gray-900 line-clamp-5 m-4">{`${fruit.content}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disease;
