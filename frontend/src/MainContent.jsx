import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/models/CropRecommendation';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Fertilizer from './components/models/Fertilizer';
import SoilQuality from './components/models/SoilQuality';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import NotFound from './NotFound';
import Prices from './components/models/Prices';
import Reports from './components/models/Reports';
import AboutUs from "./components/AboutUs";
import UseScrollToTop from './components/UseScrollToTop';
import Article from './pages/Article';
import TaskReminder from './components/tools/TaskReminder';
import ChatBot from './pages/ChatBot';
import CropRotationRecommendation from './components/models/CropRotationRecommendation';
import DiseaseRecognition from './pages/Disease/DiseaseRecognition';
import SugarcaneRecognition from './pages/Disease/SugarcaneRecognition';
import PaddyRecognition from './pages/Disease/PaddyRecognition';
import Preloader from "./components/PreLoader";
import ProgressScrollDown from "./components/ProgressScrollDown";
import React, { useState, useEffect } from "react";
import Climate from './components/help/Climate';
import Products from "./pages/Products";
import AuthPage from './components/AuthPage';
import WhyAI from './pages/WhyAI'; // Import the WhyAI component
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PasswordRecoveryPage from './components/PasswordRecoveryPage'; // Import the PasswordRecoveryPage component
import VerifyOtpPage from './components/VerifyOtpPage'; // Import the VerifyOtpPage component
import { AuthProvider } from './context/AuthContext';
import TermsAndConditions from './components/TermsAndConditions';
import CookiePolicy from './components/CookiePolicy';
import PlantTaskReminder from './components/tools/PlantTaskReminder';

import MushroomEdibility from './components/models/Mushroom';
import PrivacyPolicy from './components/PrivacyPolicy';
import Feedback from './components/Feedback';
import SoilTestingCentres from './components/SoilTestingCenters';
import NewsForum from './components/NewsForum';
import ElectricalElectronicsShops from './components/ElectricalElectronicsShops';
//AgroRentAI
import HeroSectionRent from './AgroRentAI/HeroSectionRent';
import NavigateProducts from './AgroRentAI/NavigateProducts';
//AgroShopAI
import HomeShop from './AgroShopAI/pages/HomeShop';
import ShopFooter from './AgroShopAI/components/ShopFooter';
import CategoryPage from './AgroShopAI/pages/CategoryPage';
import ProductPage from './AgroShopAI/pages/ProductPage';
import BestPractices from './pages/BestPractices';
import Profile from './components/Profile';
const MainContent = () => {
  UseScrollToTop();
  const location = useLocation(); // Get the current route
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 5000); // Preloader visible for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Check if the current path is the one you want to hide the Navbar for
  const normalizePath = (path) => path.toLowerCase().replace(/^\/+|\/+$/g, '');
  const hideNavbarRoutes = ['navigateproducts', '404'];
  const agroShopRoute = 'agroshop';
  const normalizedPath = normalizePath(location.pathname);
  const hideNavbar = hideNavbarRoutes.includes(normalizedPath) || normalizedPath.startsWith(agroShopRoute);
  const checkShop = normalizedPath.startsWith(agroShopRoute);
  return (
    <>
      {isPreloaderVisible ? (
        <Preloader />
      ) : (
        <div>
          <AuthProvider>
            <GoTop />
            <ProgressScrollDown />
            <div>
              {!hideNavbar && <Navbar />} {/* Conditional rendering for Navbar */}
              <Routes>
                <Route path="/thank-you" element={<Feedback />} /> {/* Thank You Page Route */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/" element={<Home />} />
                <Route path="/chatbot" element={<ChatBot />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/crop" element={<Crop />} />
                <Route path="/fertilizer" element={<Fertilizer />} />
                <Route path="/soil" element={<SoilQuality />} />
                
                <Route path="/crop_recommendation" element={<CropRotationRecommendation />} />

                <Route path="/prices" element={<Prices />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/article" element={<Article />} />
                <Route path="/soiltestingcentres" element={<SoilTestingCentres />} />
             
                <Route path="/TaskReminder" element={<TaskReminder />} />
                <Route path="/SugarcaneRecognition" element={<SugarcaneRecognition />} />
                <Route path="/PaddyRecognition" element={<PaddyRecognition />} />
                <Route path="/DiseaseRecognition" element={<DiseaseRecognition />} />
                <Route path="/PlantTaskReminder" element={<PlantTaskReminder />} />
              

                <Route path="/Climate" element={<Climate />} />

                <Route path="/MushroomEdibility" element={<MushroomEdibility/>}/>
                <Route path="/products" element={<Products />} />
                <Route path="/Auth-page" element={<AuthPage />} />
                <Route path="/whyai" element={<WhyAI />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<PasswordRecoveryPage />} /> {/* Add the route for Password Recovery */}
                <Route path="/verify-otp" element={<VerifyOtpPage />} /> {/* Add the route for Verify OTP */}
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/news" element={<NewsForum />} />
                <Route path="/ee-shops" element={<ElectricalElectronicsShops/>} />
                <Route path="/BestPractices" element={<BestPractices/>} />
                {/* AgroRentAI Routes */}
                <Route path="/HeroSectionRent" element={<HeroSectionRent />} />
                <Route path="/NavigateProducts" element={<NavigateProducts />} />
                <Route path="*" element={<NotFound />} />
                {/* AgroShopAI Routes */}
                <Route path="/AgroShop" element={<HomeShop/>} />
                <Route path="/AgroShop/Category" element={<CategoryPage/>} />
                <Route path="/AgroShop/Category/:id" element={<CategoryPage/>} />
                <Route path="/AgroShop/Product" element={<ProductPage/>}></Route>
              </Routes>
              {checkShop ? <ShopFooter/> : <Footer/>}
            </div>
          </AuthProvider>
        </div>
      )}
    </>
  );
};

export default MainContent;
