import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/models/CropRecommendation';
import Disease from './components/Disease';
import AIEngine from './components/AIEngine';
import Submit from './components/Submit';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Fertilizer from './components/models/Fertilizer';
import SoilQuality from './components/models/SoilQuality';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import NotFound from './NotFound';
import Forecast from './pages/Forecast';
import Prices from './components/models/Prices';
import Reports from './components/models/Reports';
import AboutUs from "./components/AboutUs";
import Irrigation from './components/models/Irrigation';
import UseScrollToTop from './components/UseScrollToTop';
import Article from './pages/Article';
import CropCalender from './components/help/CropCalender';
import TaskReminder from './components/help/TaskReminder';
import ChatBot from './pages/ChatBot';
import CropRotationRecommendation from './components/models/CropRotationRecommendation';
import DiseaseRecognition from './components/DiseaseRecognition';
import Preloader from "./components/PreLoader";
import ProgressScrollDown from "./components/ProgressScrollDown";
import React, { useState, useEffect } from "react";
import Climate from './components/help/Climate';
import Products from "./pages/Products";
import AuthPage from './components/AuthPage';
import FertilizerCalculator from './components/tools/FertilizerCalculator';
import WhyAI from './pages/WhyAI'; // Import the WhyAI component
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { AuthProvider } from './context/AuthContext';
import TermsAndConditions from './components/TermsAndConditions';
import CookiePolicy from './components/CookiePolicy';
import PlantTaskReminder from './components/help/PlantTaskReminder';
import CropManagementGuide from './components/help/CropManagementGuide';
import EcoCropManager from './components/help/EcoCropManager';
import FertilizerRequirementsCalculator from './components/tools/FertilizerRequirement';
import SoilMoistureCalculator from './components/tools/SoilMoisture';
import WaterRequirementCalculator from './components/tools/WaterRequirement';
import CropYieldCalculator from './components/tools/CropYield';
import PrivacyPolicy from './components/PrivacyPolicy';
import Feedback from './components/Feedback';

const MainContent = () => {
  UseScrollToTop();
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 5000); // Preloader visible for 5 seconds
    return () => clearTimeout(timer);
  }, []);

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
              <Navbar />
              <Routes>
                <Route path="/thank-you" element={<Feedback />} /> {/* Thank You Page Route */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/" element={<Home />} />
                <Route path="/chatbot" element={<ChatBot />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/crop" element={<Crop />} />
                <Route path="/disease" element={<Disease />} />
                <Route path="/engine/:id" element={<AIEngine />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/fertilizer" element={<Fertilizer />} />
                <Route path="/fertilizer_calculator" element={<FertilizerCalculator />} />
                <Route path="/soil" element={<SoilQuality />} />
                <Route path="/Irrigation" element={<Irrigation />} />
                
                <Route path="/crop_recommendation" element={<CropRotationRecommendation />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/article" element={<Article />} />

                <Route path="/CropCalender" element={<CropCalender />} />

                <Route path="/TaskReminder" element={<TaskReminder />} />

                <Route path="/DiseaseRecognition" element={<DiseaseRecognition />} />
                <Route path="/PlantTaskReminder" element={<PlantTaskReminder />} />
                <Route path="/CropManagementGuide" element={<CropManagementGuide />} />
                <Route path="/EcoCropManager" element={<EcoCropManager />} />

                <Route path="/FertilizerCalculator" element={<FertilizerCalculator />} />
                <Route path="/Climate" element={<Climate />} />
                <Route path="/FertilizerRequirementsCalculator" element={<FertilizerRequirementsCalculator />} />
                <Route path="/SoilMoistureCalculator" element={<SoilMoistureCalculator />} />
                <Route path="/WaterRequirementCalculator" element={<WaterRequirementCalculator />} />
                <Route path="/CropYieldCalculator" element={<CropYieldCalculator />} />

                <Route path="/products" element={<Products />} />
                <Route path="/Auth-page" element={<AuthPage />} />
                <Route path="/whyai" element={<WhyAI />} /> {/* Add the route for Why AI */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/terms" element={<TermsAndConditions />}></Route>
                <Route path="/cookie-policy" element={<CookiePolicy />}></Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </AuthProvider>
        </div>
      )}
    </>
  );
};

export default MainContent;
