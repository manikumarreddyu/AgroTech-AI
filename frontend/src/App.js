import React from 'react';
import { BrowserRouter , Route,  Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/CropRecommendation';
import Car from './components/CarPrice';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/app" element={<Home />} />
          <Route path="/app/crop" element={<Crop />} />
          <Route path="/app/car" element={<Car />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;



