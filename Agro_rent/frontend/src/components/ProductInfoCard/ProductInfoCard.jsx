import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductInfoCard.css";

const ProductInfoCard = ({ product }) => {
  // Placeholder data
  const { company, availability, category  , name , description  } = product;
  

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the slider infinitely
    speed: 100, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Autoplay slides
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    pauseOnHover: true, // Pause autoplay when hovering over the slider
    arrows: true, // Show navigation arrows
    pauseOnFocus: true, // Pause autoplay when slider is in focus
    draggable: true, // Enable dragging/swiping to navigate
    fade: false, // Enable fade effect instead of sliding
    adaptiveHeight: false, // Adjust slider height based on the height of the current slide
    centerMode: false, // Enable center mode (center the current slide)
    centerPadding: "50px", // Padding on the sides when center mode is enabled
  };

  return (
    <div className="flex bg-white rounded-lg overflow-hidden border-b border-green-100">
      {/* Image Display Section */}
      <div className="w-1/2 p-8">
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index} className="w-64 h-96">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product Information Section */}
      <div className="w-1/2 p-4 grid gap-4">
        {/* Basic Information */}
        <div className="grid grid-cols-2">
          <h1 className="text-xl font-semibold col-span-2">
            Basic Information
          </h1>
          <div className="label">
            <p className="text-gray-600">Product Name:</p>
          </div>
          <div className="value">
            <h2 className="text-lg  col-span-2">{product.name}</h2>
          </div>
          <div className="label">
            <p className="text-gray-600">Category:</p>
          </div>
          <div className="value">
            <p className="col-span-2">{product.category}</p>
          </div>
          <div className="label">
            <p className="text-gray-600">Company:</p>
          </div>
          <div className="value">
            <p className="col-span-2">{product.company}</p>
          </div>
          <div className="label">
            <p className="text-gray-600">Location:</p>
          </div>
          <div className="value">
            {/* <p className="col-span-2">{product.location}</p> */}
          </div>
        </div>

        {/* Sale Information */}
        <div className="grid grid-cols-2">
          <h1 className="text-xl font-semibold col-span-2">Sale Information</h1>
          <div className="label">
            <p className="text-gray-600">Price:</p>
          </div>
          <div className="value">
            <p className="col-span-2">${product.rentalPrice.toFixed(2)}</p>
          </div>
          <div className="label">
            <p className="text-gray-600 font-bold">Availability:</p>
          </div>
          <div className="value">
            <p
              className={`col-span-2 ${
                product.availability ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.availability ? "Available" : "Out of Stock"}
            </p>
          </div>
        </div>

        {/* Description and Condition */}
        <div>
          <h1 className="text-xl font-semibold">Description and Condition</h1>
          <div className="label">
            <p className="text-gray-600">Description:</p>
          </div>
          <div className="value">
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>

        {/* Working Time */}
        <div>
          <h1 className="text-xl font-semibold">Working Time</h1>
          <div className="label">
            <p className="text-gray-600">Operational hours:</p>
          </div>
          <div className="value">
            <p className="text-gray-600">{product.availability}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;
