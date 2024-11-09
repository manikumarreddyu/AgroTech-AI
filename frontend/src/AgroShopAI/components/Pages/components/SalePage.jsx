import React, { useState, useEffect } from "react";
import FlashSaleHeader from "./FlashSaleHeader";
import Filter from "./Filter";
import ProductList from "./ProductList";
import QuickBuyModal from "./QuickBuyModal";

const flashSaleEndTime = new Date(Date.now() + 6 * 60 * 60 * 1000);

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(flashSaleEndTime));
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(flashSaleEndTime));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterCriteria]);

  function applyFilters() {
    const {
      name,
      brand,
      priceRange = { min: 0, max: Infinity },
      timeLeft,
    } = filterCriteria;

    const filtered = products.filter((product) => {
      const timeRemaining = getTimeLeft(product.endTime).hours;

      return (
        (!name || product.name.toLowerCase().includes(name.toLowerCase())) &&
        (!brand || product.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (priceRange.min === undefined ||
          product.discountedPrice >= priceRange.min) &&
        (priceRange.max === undefined ||
          product.discountedPrice <= priceRange.max) &&
        (!timeLeft || timeRemaining <= timeLeft)
      );
    });

    setFilteredProducts(filtered);
  }

  function handleFilterChange(criteria) {
    setFilterCriteria(criteria);
  }

  function handleQuickBuy(product) {
    setSelectedProduct(product);
    setModalOpen(true);
  }

  function getTimeLeft(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-15 pt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Agroshop Flash Sale
        </h1>
        <FlashSaleHeader timeLeft={timeLeft} />
        <Filter onFilterChange={handleFilterChange} />
        <ProductList products={filteredProducts} onQuickBuy={handleQuickBuy} />
      </div>
      {modalOpen && (
        <QuickBuyModal
          product={selectedProduct}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "Compact Tractor",
    brand: "FarmPower",
    originalPrice: 12999.99,
    discountedPrice: 9999.99, // Discounted price not exceeding $10,000
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqGgcHg947RkBqvdUu5fKUjko9cg5JZrD7w&s",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
  },
  {
    id: 2,
    name: "Electric Lawn Mower",
    brand: "EcoMow",
    originalPrice: 799.99,
    discountedPrice: 699.99,
    image: "https://hips.hearstapps.com/hmg-prod/images/pop-electric-lawnmowers-65f34fd591853.jpg?crop=0.502xw:1.00xh;0.383xw,0&resize=640:*",
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
  },
  {
    id: 3,
    name: "Solar-Powered Water Pump",
    brand: "SunFlow",
    originalPrice: 249.99,
    discountedPrice: 199.99,
    image: "https://www.agrisolar.co.nz/wp-content/uploads/2021/07/The-Agri-Solar-XM-500-Surface-Pump-300x300.jpg",
    endTime: new Date(Date.now() + 7 * 60 * 60 * 1000), // 7 hours from now
  },
  {
    id: 4,
    name: "Portable Greenhouse",
    brand: "GardenPro",
    originalPrice: 149.99,
    discountedPrice: 129.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYO1Cm2xju9h7s6hR0JJeXJ7927APOj1-slA&s",
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
  },
  {
    id: 5,
    name: "Hydroponic Grow Kit",
    brand: "HydroGrow",
    originalPrice: 199.99,
    discountedPrice: 149.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2pqUB9FxVdyUKUWeBxln7DvyAgJGNbYMk5w&s",
    endTime: new Date(Date.now() + 9 * 60 * 60 * 1000), // 9 hours from now
  },
  {
    id: 6,
    name: "Automatic Seed Planter",
    brand: "PlantMate",
    originalPrice: 499.99,
    discountedPrice: 399.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqZIz4ZcbOrFikJ47pfWWOCxDv5Cy4w_jJhQ&s",
    endTime: new Date(Date.now() + 10 * 60 * 60 * 1000), // 10 hours from now
  },
  {
    id: 7,
    name: "Heavy-Duty Compost Bin",
    brand: "EcoCycle",
    originalPrice: 899.99,
    discountedPrice: 699.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKfHvn6iDMjCn8HlV28qOaWZ29bJHW2NGj0A&s",
    endTime: new Date(Date.now() + 11 * 60 * 60 * 1000), // 11 hours from now
  },
  {
    id: 8,
    name: "Garden Sprayer",
    brand: "SprayMaster",
    originalPrice: 129.99,
    discountedPrice: 119.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSPfrgmp8GY0X5f_7ZeYwwk7fCSeCzGAnzQ&s",
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
  },
  {
    id: 9,
    name: "High-Pressure Washer",
    brand: "CleanTech",
    originalPrice: 399.99,
    discountedPrice: 299.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh2LiQyQ2R-_Y5tZtcaSQMfUCsJA1EHFD27A&s",
    endTime: new Date(Date.now() + 13 * 60 * 60 * 1000), // 13 hours from now
  },
  {
    id: 10,
    name: "Garden Tiller",
    brand: "TillMaster",
    originalPrice: 329.99,
    discountedPrice: 279.99,
    image: "https://powerequipment.honda.com/-/media/Images/pages/tillers/additional-resources-tiller-shopping.jpg",
    endTime: new Date(Date.now() + 14 * 60 * 60 * 1000), // 14 hours from now
  },
];
