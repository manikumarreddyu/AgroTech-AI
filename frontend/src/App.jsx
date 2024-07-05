import './App.css'
import { BrowserRouter , Route,  Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/CropRecommendation';
import Home from './pages/Home'
import Fertilizer from './components/Fertilizer';
import SoilQuality from './components/SoilQuality';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop" element={<Crop />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/soil" element={<SoilQuality />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;



