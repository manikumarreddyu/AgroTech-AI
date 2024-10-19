import HeroSectionShop from "../components/HeroSectionShop";
import Categories from "../components/Categories";
import CardRelay from "../components/CardRelay";
import CardContainer from "../components/CardContainer";
import BottomCardContainer from "../components/BottomCardContainer";
import { slides, categories, topSellingItems, ongoingSale, topSellingSeeds, todaysOffers, topSellingFertilizers, organicGardeningItems } from "../utils/home-data";

const HomeShop = () => {
  return (
    <div className="shop-container bg-gray-100">
      <HeroSectionShop images={slides} />
      <Categories categories={categories} />
      <img
        src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/home_banner_1.jpg?raw=true"
        alt=""
        className="w-full mx-2 my-3" // Add this class to make the image responsive
      />
      <CardRelay items={topSellingItems} heading="Best Selling" />
      <div className="flex mx-2 my-3 flex-wrap"> {/* Allow wrapping */}
        <CardContainer items={ongoingSale} text={'Ongoing Sale'} />
        <img
          className=" pl-2 h-fit object-cover flex-grow" // Make the image responsive; takes half width on larger screens
          src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/autumn_sale.jpg?raw=true"
          alt="Autumn Sale"
        />
      </div>
      
      <CardRelay items={todaysOffers} heading="Today's Offer" />
      <img
        src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/home_banner_2.jpg?raw=true"
        alt=""
        className="w-full mx-2 my-3" // Add this class to make the image responsive
      />
        <CardRelay items={topSellingSeeds} heading="Top Seeds" />
        <CardRelay items={topSellingFertilizers} heading="Top Fertilizers" />
      <img
        src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/home_banner_3.jpg?raw=true"
        alt=""
        className="w-full mx-2 my-3" // Add this class to make the image responsive
      />
      <BottomCardContainer items={organicGardeningItems} text={'Organic Farming'}/>
      
    </div>
  );
};

export default HomeShop;
