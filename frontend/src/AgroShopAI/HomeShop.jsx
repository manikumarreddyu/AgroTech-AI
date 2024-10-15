import HeroSectionShop from "./components/HeroSectionShop";
import Categories from "./components/Categories"
import CardRelay from "./components/CardRelay"
import { slides } from "./hero-banner"
import {categories, topSellingItems} from "./home-data";

const HomeShop = ()=>{
    return (
        <div className="shop-container">

            <HeroSectionShop  images = {slides}/>
            <Categories categories= {categories}/>
            <img src="/shop-asset/home_banner_1.jpg" alt="" />
            <CardRelay items= {topSellingItems}/>
        </div>

        
    )
}
export default HomeShop;