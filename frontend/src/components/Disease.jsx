import React from 'react';
import { Link } from 'react-router-dom';

const Disease = () => {
  const fruits = [
    { name: 'Apple', image: 'https://post.healthline.com/wp-content/uploads/2020/09/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549.jpg' },
    { name: 'Blueberry', image: 'https://www.supermarketperimeter.com/ext/resources/0430-blueberries.png?t=1588260305&width=1080' },
    { name: 'Cherry', image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/health_benefits_of_cherries_slideshow/1800x1200_health_benefits_of_cherries_slideshow.jpg' },
    { name: 'Corn', image: 'https://m.media-amazon.com/images/I/41F62-VbHSL._AC_UF1000,1000_QL80_.jpg' },
    { name: 'Grape', image: 'https://i.ndtvimg.com/i/2015-09/grapes_625x350_61443376353.jpg' },
    { name: 'Orange', image: 'https://www.irishtimes.com/polopoly_fs/1.3923226.1560339148!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg' },
    { name: 'Peach', image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/the_health_benefits_of_peaches_slideshow/thinkstock_rf_peaches.jpg?resize=650px:*' },
    { name: 'Pepper Bell', image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Green-Yellow-Red-Pepper-2009.jpg'  },
    { name: 'Potato', image: 'https://m.economictimes.com/thumb/height-450,width-600,imgsize-111140,msid-72862126/potato-getty.jpg' },
    { name: 'Raspberry', image: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326272/raspberries-with-ketones-in-a-bowl.jpg?w=1155&h=1541' },
    { name: 'Soybean', image: 'https://m.economictimes.com/thumb/msid-66988154,width-1200,height-900,resizemode-4,imgsize-211276/soyabean-agencies.jpg' },
    { name: 'Squash', image: 'https://post.healthline.com/wp-content/uploads/2020/08/squash-fruit-or-vegetable-732x549-thumbnail-732x549.jpg' },
    { name: 'Strawberry', image: 'https://images.indianexpress.com/2020/02/strawberry-1200.jpg' },
    { name: 'Tomato', image: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg' },
  ];

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-500">🍁Plant Disease Detection🍁</h1>
        <p className="text-xl text-gray-700 mt-2">This AI Engine Will Help To Detect Disease From Following Fruits And Veggies</p>
      </div>
      <div className="text-center mb-8">
        <Link to="/engine" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          AI Engine
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fruits.map((fruit, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4">
            <img src={fruit.image} alt={fruit.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-center font-medium text-gray-800">{fruit.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disease;