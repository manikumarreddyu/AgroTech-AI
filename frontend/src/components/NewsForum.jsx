import React, { useEffect, useState } from 'react';
import Card from './NewsCard';

export default function NewsForum() {
  const [search, setSearch] = useState("agriculture");
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "823eff063e324ab1a016abf49b309b75";

  const getData = async () => {
    setLoading(true);
    const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
    const jsonData = await response.json();
    let dt = jsonData.articles.slice(0, 12); // Fetch top 12 articles
    setNewsData(dt);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const categories = [
    { name: "Agri-Tech", search: "smart agriculture" },
    { name: "Organic Farming", search: "organic farming" },
    { name: "Crops", search: "crops" },
    { name: "Livestock", search: "livestock" },
    { name: "Policies", search: "agriculture policies" },
  ];

  return (
    <div className="min-h-screen py-12 mt-20 mb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-green-800 flex-grow">
            Stay Updated with the Latest in Agriculture
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => setSearch(category.search)} 
              className="bg-green-100 text-green-800 px-6 py-3 rounded-full shadow-md hover:bg-green-200 transition duration-300 font-medium"
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            newsData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">  
                {newsData.map((article, index) => (
                  <Card key={index} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-xl text-gray-700 text-center">No articles found</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
