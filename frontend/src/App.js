import React from 'react';
import { BrowserRouter , Route,  Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/CropRecommendation';
import Home from './pages/Home'
import Fertilizer from './components/Fertilizer';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/crop" element={<Crop />} />
          <Route path="/app/fertilizer" element={<Fertilizer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;



