import React from 'react';
import { Link } from 'react-router-dom';

const fruits = [
  { name: 'Apple', image: 'https://post.healthline.com/wp-content/uploads/2020/09/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549.jpg' },
  { name: 'Blueberry', image: 'https://www.supermarketperimeter.com/ext/resources/0430-blueberries.png?t=1588260305&width=1080' },
  { name: 'Cherry', image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/health_benefits_of_cherries_slideshow/1800x1200_health_benefits_of_cherries_slideshow.jpg' },
  { name: 'Corn', image: 'https://www.mayoclinichealthsystem.org/-/media/national-files/images/hometown-health/2018/corn.jpg' },
  { name: 'Grape', image: 'https://i.ndtvimg.com/i/2015-09/grapes_625x350_61443376353.jpg' },
  { name: 'Orange', image: 'https://www.irishtimes.com/polopoly_fs/1.3923226.1560339148!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg' },
  { name: 'Peach', image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/the_health_benefits_of_peaches_slideshow/thinkstock_rf_peaches.jpg?resize=650px:*' },
  { name: 'Pepper Bell', image: 'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/bell%20peppers.jpg?h=9f30bee3&itok=PKmzyeNv' },
  { name: 'Potato', image: 'https://m.economictimes.com/thumb/height-450,width-600,imgsize-111140,msid-72862126/potato-getty.jpg' },
  { name: 'Raspberry', image: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326272/raspberries-with-ketones-in-a-bowl.jpg?w=1155&h=1541' },
  { name: 'Soybean', image: 'https://m.economictimes.com/thumb/msid-66988154,width-1200,height-900,resizemode-4,imgsize-211276/soyabean-agencies.jpg' },
  { name: 'Squash', image: 'https://post.healthline.com/wp-content/uploads/2020/08/squash-fruit-or-vegetable-732x549-thumbnail-732x549.jpg' },
  { name: 'Strawberry', image: 'https://images.indianexpress.com/2020/02/strawberry-1200.jpg' },
  { name: 'Tomato', image: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg' },
];

const Disease = () => {
  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">🍁 Plant Disease Detection 🍁</h1>
        <p className="text-xl text-gray-700 mb-8">This AI Engine Will Help To Detect Disease From Following Fruits And Veggies</p>
        <Link to="/disease_image" className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full">
          AI Engine
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {fruits.map((fruit, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <img src={fruit.image} alt={fruit.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-center text-lg font-medium text-gray-800">{fruit.name}</p>
          </div>
        ))}
      </div>

      <div className="md:hidden text-center py-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Note✍🏻</h2>
        <p className="text-lg text-gray-800 mb-2">Please🙏 Open This Site On Laptop/PC 💻 Screen Only</p>
        <p className="text-lg text-gray-800">Thank You 🤝</p>
      </div>
    </div>
  );
};

export default Disease;