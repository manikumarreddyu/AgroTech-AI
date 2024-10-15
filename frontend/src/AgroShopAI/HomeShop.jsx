import HeroSectionShop from "./HeroSectionShop"
import { slides } from "./hero-banner"
const HomeShop = ()=>{
    return (
        <div className="shop-container">

            <HeroSectionShop  images = {slides}/>
        </div>

        
    )
}
export default HomeShop;