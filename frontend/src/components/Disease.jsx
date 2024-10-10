import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { useNavigation } from "react-router-dom";
const Disease = () => {
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(Array(14).fill(false)); // Create an array for each fruit's flip state
  // const navigate = useNavigation();
  // Function to handle flipping individual cards
  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index]; // Toggle the flip state of the card at index
    setFlipped(newFlipped);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
   
  const crops = [
    {
        "id": 1,
        "name": "Sugarcane",
        "image": "https://cdn.pixabay.com/photo/2020/07/09/20/00/sugarcane-5388614_640.jpg",
        "content": "<strong>Mosaic</strong>: Yellow-green mottled leaves. <br> <strong>Red Rot</strong>: Stalk decay. <br> <strong>Rust</strong>: Orange pustules on leaves. <br> <strong>Yellow Leaf</strong>: Leaves turn yellow."
    },
    {
        "id": 2,
        "name": "Apple",
        "image": "https://post.healthline.com/wp-content/uploads/2020/09/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549.jpg",
        "content": "<strong>Scab</strong>: Dark spots on leaves. <br> <strong>Fire Blight</strong>: Branches wither. <br> <strong>Powdery Mildew</strong>: White spots on leaves. <br> <strong>Cedar Rust</strong>: Orange lesions on fruit."
    },
    {
        "id": 3,
        "name": "Blueberry",
        "image": "https://www.supermarketperimeter.com/ext/resources/0430-blueberries.png?t=1588260305&width=1080",
        "content": "<strong>Mummy Berry</strong>: Fruit shrivels. <br> <strong>Gray Mold</strong>: Flowers and fruit rot. <br> <strong>Anthracnose</strong>: Spots on leaves. <br> <strong>Rust</strong>: Orange pustules under leaves."
    },
    {
        "id": 4,
        "name": "Cherry",
        "image": "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/health_benefits_of_cherries_slideshow/1800x1200_health_benefits_of_cherries_slideshow.jpg",
        "content": "<strong>Leaf Spot</strong>: Leaves yellow and drop. <br> <strong>Brown Rot</strong>: Fruit rot. <br> <strong>Canker</strong>: Lesions on twigs. <br> <strong>Powdery Mildew</strong>: White spots on leaves."
    },
    {
        "id": 5,
        "name": "Corn",
        "image": "https://m.media-amazon.com/images/I/41F62-VbHSL._AC_UF1000,1000_QL80_.jpg",
        "content": "<strong>Leaf Blight</strong>: Tan lesions on leaves. <br> <strong>Rust</strong>: Pustules on leaves. <br> <strong>Gray Spot</strong>: Rectangular spots. <br> <strong>Smut</strong>: Galls on kernels."
    },
    {
        "id": 6,
        "name": "Grape",
        "image": "https://i.ndtvimg.com/i/2015-09/grapes_625x350_61443376353.jpg",
        "content": "<strong>Powdery Mildew</strong>: White growth. <br> <strong>Downy Mildew</strong>: Yellow spots. <br> <strong>Bunch Rot</strong>: Mold on fruit. <br> <strong>Black Rot</strong>: Lesions on fruit."
    },
    {
        "id": 7,
        "name": "Orange",
        "image": "https://www.irishtimes.com/polopoly_fs/1.3923226.1560339148!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg",
        "content": "<strong>Citrus Canker:</strong> Corky lesions on fruit. <br><strong>Greasy Spot:</strong> Oily lesions on leaves. <br><strong>Huanglongbing:</strong> Yellow leaves <br><strong>Anthracnose:</strong> Lesions on fruit, leaves."
    },
    {
        "id": 8,
        "name": "Peach",
        "image": "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/the_health_benefits_of_peaches_slideshow/thinkstock_rf_peaches.jpg?resize=650px:*",
        "content": "<strong>Leaf Curl</strong>: Curled, discolored leaves. <br> <strong>Brown Rot</strong>: Fruit rot. <br> <strong>Spot</strong>: Small spots on fruit. <br> <strong>Canker</strong>: Sunken branch cankers."
    },
    {
        "id": 9,
        "name": "Pepper Bell",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/85/Green-Yellow-Red-Pepper-2009.jpg",
        "content": "<strong>Bacterial Spot</strong>: Dark spots on fruit. <br> <strong>Anthracnose</strong>: Sunken lesions. <br> <strong>Blight</strong>: Stem rot. <br> <strong>Powdery Mildew</strong>: White growth."
    },
    {
        "id": 10,
        "name": "Potato",
        "image": "https://m.economictimes.com/thumb/height-450,width-600,imgsize-111140,msid-72862126/potato-getty.jpg",
        "content": "<strong>Late Blight</strong>: Blackened leaves, tuber rot. <br> <strong>Early Blight</strong>: Spots on leaves. <br> <strong>Blackleg</strong>: Dark stems. <br> <strong>Scab</strong>: Rough tuber lesions."
    }
];
  const handleCardClick = (route) => {
        navigate(route); // Navigate to the specified route
    };

  return (
    <div className="">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-500">
              🍁Crop Disease Detection🍁
            </h1>
            <p className="text-xl text-gray-700 mt-2">
            Select the crop you wish to receive disease detection assistance for, and empower your farming decisions with advanced insights!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 w-full [perspective:10000px]  ">
            {crops.map((crop, index) => (
              <Link
                key={index}
                to={`/engine/${crop.id}`}
                className={`w-full h-64 relative bg-white shadow-lg rounded-lg p-4 transition-all duration-1000 cursor-pointer bg-[#c0f4d4] text-black px-4 py-2 rounded hover:bg-[#0cb54b] transition duration-300 hover:scale-105`}
                onClick={
                  () => handleCardClick('/engine')
                }
              >
                <div className="[backface-visibility:hidden]">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    onMouseEnter={() => handleFlip(index)}
                    onClick={() => handleFlip(index)}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-center font-medium text-gray-800" >
                    {crop.name}
                  </p>
                </div>
                <div
                  onMouseLeave={() => handleFlip(index)}
                  onClick={() => handleFlip(index)}
                  className="w-full h-64 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] absolute inset-0 bg-green-200 flex justify-center items-center"
                >
                  <p className="text-lg text-gray-900 line-clamp-5 m-4" dangerouslySetInnerHTML={{ __html: crop.content }}></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disease;
