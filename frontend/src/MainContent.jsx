import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/CropRecommendation';
import Disease from './components/Disease';
import AIEngine from './components/AIEngine';
import Submit from './components/Submit';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Fertilizer from './components/Fertilizer';
import SoilQuality from './components/SoilQuality';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import NotFound from './NotFound';
import Forecast from './pages/Forecast';
import Prices from './components/Prices';
import Reports from './components/Reports';
import AboutUs from "./components/AboutUs";
import Irrigation from './components/Irrigation';
import UseScrollToTop from './components/UseScrollToTop';
import Article from './pages/Article';
import CropCalender from './components/CropCalender';
import TaskReminder from './components/TaskReminder';
import ChatBot from './pages/ChatBot';
import CropRotationRecommendation from './components/CropRotationRecommendation';
import DiseaseRecognition from './components/DiseaseRecognition';
import Preloader from "./components/PreLoader";
import ProgressScrollDown from "./components/ProgressScrollDown";
import React, { useState, useEffect } from "react";
import Climate from './components/Climate';
import Products from "./pages/Products";
import AuthPage from './components/AuthPage';
import FertilizerCalculator from './components/FertilizerCalculator';
import WhyAI from './pages/WhyAI'; // Import the WhyAI component

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
          <GoTop />
          <ProgressScrollDown />
          <div>
            <Navbar />
            <Routes>
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
              <Route path="/climate" element={<Climate />} />
              <Route path="/crop_recommendation" element={<CropRotationRecommendation />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/article" element={<Article />} />
              <Route path="/cropcalender" element={<CropCalender />} />
              <Route path="/taskreminder" element={<TaskReminder />} />
              <Route path="/DiseaseRecognition" element={<DiseaseRecognition />} />
              <Route path="/products" element={<Products />} />
              <Route path="/Auth-page" element={<AuthPage />} />
              <Route path="/whyai" element={<WhyAI />} /> {/* Add the route for Why AI */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default MainContent;
