import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import { Link } from "react-router-dom";

const Home = () => {
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  
  // Filter for each category
  const homeProductCartListSeeds = productData.filter(
    (el) => el.category == "seeds"
  );
  const homeProductCartListFertilizers = productData.filter(
    (el) => el.category == "fertilizers"
  );
  const homeProductCartListPesticides = productData.filter(
    (el) => el.category == "pesticides"
  );
  const homeProductCartListHerbicides = productData.filter(
    (el) => el.category == "herbicides"
  );
  const homeProductCartListMachinery = productData.filter(
    (el) => el.category == "machinery"
  );
  const homeProductCartListIrrigation = productData.filter(
    (el) => el.category == "irrigation"
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Direct Delivery to Farmers {" "}
            <span className="text-green-600">Our AgriCart</span>
          </h2>
          <p className="py-3 text-base">
            Welcome to AgriMart, your one-stop e-commerce platform for all agricultural needs! 
            We provide a wide range of high-quality seeds, fertilizers, pesticides, and other 
            essential farming products to help you cultivate healthy crops and maximize yields. 
            Our platform ensures easy access to trusted products, helping farmers save time and 
            make informed purchasing decisions. With reliable delivery services, AgriMart is dedicated to supporting farmers in every step of their agricultural journey. Shop with confidence and grow your farm with us!
          </p>
          <Link to={"cart"}>
            <button className="font-bold bg-green-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index + "loading"} loading={"Loading..."} />;
              })}
        </div>
      </div>

      {/* Quality Seeds Section */}
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-green-700 mb-4">Quality Seeds</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListSeeds[0]
            ? homeProductCartListSeeds.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "seeds"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                    userEmail={userData.email} // Add email field here
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "seedsLoading"} />
              ))}
        </div>
      </div>

      {/* Fertilizers Section */}
      <div className="mt-5">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-green-700 mb-4">Quality Fertilizers</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListFertilizers[0]
            ? homeProductCartListFertilizers.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "fertilizers"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                    userEmail={userData.email} // Add email field here
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "fertilizersLoading"} />
              ))}
        </div>
      </div>

      {/* Pesticides Section */}
      <div className="mt-5">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-green-700 mb-4">Quality Pesticides</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListPesticides[0]
            ? homeProductCartListPesticides.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "pesticides"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                    userEmail={userData.email} // Add email field here
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "pesticidesLoading"} />
              ))}
        </div>
      </div>

      {/* Herbicides Section */}
      <div className="mt-5">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-green-700 mb-4">Quality Herbicides</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListHerbicides[0]
            ? homeProductCartListHerbicides.map((el) => {
                return (
                  <CardFeature
                  key={el._id + "herbicides"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                  userEmail={userData.email} // Add email field here
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "herbicidesLoading"} />
            ))}
      </div>
    </div>

    {/* Machinery Section */}
    <div className="mt-5">
      <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-green-700 mb-4">Quality Machinery</h2>
        <div className="ml-auto flex gap-4">
          <button
            onClick={preveProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
          >
            <GrNext />
          </button>
        </div>
      </div>
      <div
        className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
        ref={slideProductRef}
      >
        {homeProductCartListMachinery[0]
          ? homeProductCartListMachinery.map((el) => {
              return (
                <CardFeature
                  key={el._id + "machinery"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                  userEmail={userData.email} // Add email field here
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "machineryLoading"} />
            ))}
      </div>
    </div>

    {/* Irrigation Section */}
    <div className="mt-5">
      <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-green-700 mb-4">Irrigation Supplies</h2>
        <div className="ml-auto flex gap-4">
          <button
            onClick={preveProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
          >
            <GrNext />
          </button>
        </div>
      </div>
      <div
        className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
        ref={slideProductRef}
      >
        {homeProductCartListIrrigation[0]
          ? homeProductCartListIrrigation.map((el) => {
              return (
                <CardFeature
                  key={el._id + "irrigation"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                  userEmail={userData.email} // Add email field here
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "irrigationLoading"} />
            ))}
      </div>
    </div>

    <AllProduct heading={"Your Product"} />
  </div>
);
};

export default Home;

