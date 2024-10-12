import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
// import AllProduct from "../component/AllProduct";
import { Link } from "react-router-dom";
import { FaShippingFast, FaCheckCircle, FaLeaf } from "react-icons/fa";

const Home = () => {
  const userData = useSelector((state) => state.user);
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);

  // Filter for each category
  const homeProductCartListSeeds = productData.filter(
    (el) => el.category === "seeds"
  );
  const homeProductCartListFertilizers = productData.filter(
    (el) => el.category === "fertilizers"
  );
  const homeProductCartListPesticides = productData.filter(
    (el) => el.category === "pesticides"
  );
  const homeProductCartListHerbicides = productData.filter(
    (el) => el.category === "herbicides"
  );
  const homeProductCartListMachinery = productData.filter(
    (el) => el.category === "machinery"
  );
  const homeProductCartListIrrigation = productData.filter(
    (el) => el.category === "irrigation"
  );

  // Simulate user-owned products or recommended products
  const yourProducts = productData.filter(
    (el) => el.recommended === true || el.owner === userData.email
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  // Separate refs for each carousel section
  const slideProductRefSeeds = useRef();
  const slideProductRefFertilizers = useRef();
  const slideProductRefPesticides = useRef();
  const slideProductRefHerbicides = useRef();
  const slideProductRefMachinery = useRef();
  const slideProductRefIrrigation = useRef();
  const slideYourProductsRef = useRef();

  // Generic scroll function
  const scroll = (ref, direction) => {
    ref.current.scrollLeft += direction * 200;
  };

  return (
    <div className="p-4 space-y-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-6 py-6">
        <div className="md:w-1/2 space-y-8 md:space-y-10 p-4 md:px-8 lg:px-12">
          <h2 className="text-4xl md:text-6xl font-bold">
            The Direct Delivery to Farmers{" "}
            <span className="text-green-600 pl-3">Our AgriCart</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed md:leading-loose">
            Welcome to AgriMart, your one-stop e-commerce platform for all agricultural
            needs! We provide a wide range of high-quality seeds, fertilizers, 
            pesticides, and other essential farming products to help you cultivate 
            healthy crops and maximize yields.
          </p>
          {/* Feature points with icons */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center space-x-4">
              <FaShippingFast className="text-green-600 text-3xl" />
              <p className="text-lg md:text-xl font-semibold">
                Fast and Reliable Delivery
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaCheckCircle className="text-green-600 text-3xl" />
              <p className="text-lg md:text-xl font-semibold">
                Quality Assured Products
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaLeaf className="text-green-600 text-3xl" />
              <p className="text-lg md:text-xl font-semibold">
                Sustainable and Eco-Friendly
              </p>
            </div>
          </div>
          <Link to={"cart"}>
            <button className="font-bold bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-all duration-300 mt-10">
              Order Now
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 grid grid-cols-2 gap-6 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              ))
            : loadingArray.map((_, index) => (
                <HomeCard key={index + "loading"} loading={"Loading..."} />
              ))}
        </div>
      </div>

      {/* Seeds Section */}
      <ProductSection
        title="Quality Seeds"
        products={homeProductCartListSeeds}
        loading={loadingArrayFeature}
        slideRef={slideProductRefSeeds}
        scroll={scroll}
        userData={userData}
      />

      {/* Fertilizers Section */}
      <ProductSection
        title="Quality Fertilizers"
        products={homeProductCartListFertilizers}
        loading={loadingArrayFeature}
        slideRef={slideProductRefFertilizers}
        scroll={scroll}
        userData={userData}
      />

      {/* Pesticides Section */}
      <ProductSection
        title="Quality Pesticides"
        products={homeProductCartListPesticides}
        loading={loadingArrayFeature}
        slideRef={slideProductRefPesticides}
        scroll={scroll}
        userData={userData}
      />

      {/* Herbicides Section */}
      <ProductSection
        title="Quality Herbicides"
        products={homeProductCartListHerbicides}
        loading={loadingArrayFeature}
        slideRef={slideProductRefHerbicides}
        scroll={scroll}
        userData={userData}
      />

      {/* Machinery Section */}
      <ProductSection
        title="Quality Machinery"
        products={homeProductCartListMachinery}
        loading={loadingArrayFeature}
        slideRef={slideProductRefMachinery}
        scroll={scroll}
        userData={userData}
      />

      {/* Irrigation Section */}
      <ProductSection
        title="Irrigation Supplies"
        products={homeProductCartListIrrigation}
        loading={loadingArrayFeature}
        slideRef={slideProductRefIrrigation}
        scroll={scroll}
        userData={userData}
      />

      {/* Your Products Section */}
      <ProductSection
        title="Your Products"
        products={yourProducts}
        loading={loadingArrayFeature}
        slideRef={slideYourProductsRef}
        scroll={scroll}
        userData={userData}
      />
    </div>
  );
};

// Reusable Product Section Component
const ProductSection = ({ title, products, loading, slideRef, scroll, userData }) => (
  <div className="space-y-4">
    <div className="flex w-full items-center">
      <h2 className="font-bold text-2xl text-green-700">{title}</h2>
      <div className="ml-auto flex gap-4">
        <button
          onClick={() => scroll(slideRef, -1)}
          className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded"
        >
          <GrPrevious />
        </button>
        <button
          onClick={() => scroll(slideRef, 1)}
          className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded"
        >
          <GrNext />
        </button>
      </div>
    </div>

    <div
      className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
      ref={slideRef}
    >
      {products[0]
        ? products.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}
              userEmail={userData.email} // Passing email to card
            />
          ))
        : loading.map((_, index) => (
            <CardFeature loading="Loading..." key={index + title + "Loading"} />
          ))}
    </div>
  </div>
);

export default Home;
