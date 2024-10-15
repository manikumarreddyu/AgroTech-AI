import React from 'react';

const Card = ({ article }) => {
    const { title, description, url, urlToImage } = article;

    // Default image if no urlToImage is provided
    const defaultImage = 'https://via.placeholder.com/300x200?text=Image+Not+Available';

    return (
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 flex flex-col justify-between h-full transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-opacity-30">
            <div className="relative">
                <img
                    src={urlToImage || defaultImage}
                    alt={title}
                    className="w-full h-40 object-cover rounded-md mb-4 transition duration-500 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-green-700">{title}</h3>
            <p className="text-black flex-grow mb-4">
                {description ? description.slice(0, 100) + '...' : 'No description available.'}
            </p>
            <div className="flex justify-center">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 text-sm rounded-md hover:bg-gradient-to-l transition duration-300"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default Card;
