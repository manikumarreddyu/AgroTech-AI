import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import UseScrollToTop from './components/UseScrollToTop';
import Preloader from "./components/PreLoader";
import ProgressScrollDown from "./components/ProgressScrollDown";
import React, { useState, useEffect } from "react";
const MainContent = () => {
  UseScrollToTop();
  const rentalPages = ['/rental', '/register', '/about'];
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
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </>

  );
};

export default MainContent;
