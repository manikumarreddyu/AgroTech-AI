import HeroSectionShop from "./components/HeroSectionShop";
import Categories from "./components/Categories"
import CardRelay from "./components/CardRelay"
import {slides, categories, topSellingItems} from "./utils/home-data";

const HomeShop = ()=>{
    return (
        <div className="shop-container">

            <HeroSectionShop  images = {slides}/>
            <Categories categories= {categories}/>
            <img src="https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/home_banner_1.jpg?raw=true" alt="" />
            <CardRelay items= {topSellingItems}/>
        </div>

        
    )
}
export default HomeShop;