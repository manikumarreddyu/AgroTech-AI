import React, { useState } from "react";
import Header from "./components/THeader";
import Banner from "./components/Banner";
import SearchAndSort from "./components/SearchAndSort";
import ProductGrid from "./components/ProductGrid";

export default function TrendingProductsPage() {
  const [sortBy, setSortBy] = useState("trending");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filtering products based on search term
  const filteredProducts = trendingProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting products based on selected criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Simulate loading state
  const fetchData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <Banner />
      <div className="container mx-auto px-4 py-12">
        {/* Search and Sort Component */}
        <SearchAndSort
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {/* Loading state and Product Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-xl text-gray-600">
            Loading...
          </div>
        ) : (
          <ProductGrid sortedProducts={sortedProducts} />
        )}
      </div>
    </div>
  );
}

const trendingProducts = [
  {
    id: 1,
    name: "Smart Irrigation System",
    price: 299.99,
    rating: 4.8,
    reviews: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTkXzsfqi9x6H46rC1Ir7k2WEQ1V0lVv8ONA&s",
    tag: "Trending Now",
  },
  {
    id: 2,
    name: "Organic Fertilizer Pack",
    price: 49.99,
    rating: 4.5,
    reviews: 85,
    image: "https://m.media-amazon.com/images/I/91Y3l-BVm-L.jpg",
    tag: "Hot Deal",
  },
  {
    id: 3,
    name: "Drone Crop Sprayer",
    price: 1299.99,
    rating: 4.9,
    reviews: 200,
    image:
      "https://5.imimg.com/data5/ANDROID/Default/2022/4/AA/WY/ED/14166347/product-jpeg-500x500.jpg",
    tag: "Top Rated",
  },
  {
    id: 4,
    name: "Soil pH Tester",
    price: 29.99,
    rating: 4.2,
    reviews: 60,
    image: "https://m.media-amazon.com/images/I/71933Pfn55L.jpg",
    tag: "Trending Now",
  },
  {
    id: 5,
    name: "Hydroponic Growing Kit",
    price: 199.99,
    rating: 4.7,
    reviews: 150,
    image:
      "https://m.media-amazon.com/images/I/81n3GQOCOQL._AC_UF1000,1000_QL80_.jpg",
    tag: "Hot Deal",
  },
  {
    id: 6,
    name: "Weather Station",
    price: 149.99,
    rating: 4.6,
    reviews: 95,
    image:
      "https://5.imimg.com/data5/YN/KT/YB/SELLER-5098190/weather-station.jpg",
    tag: "Top Rated",
  },
];
