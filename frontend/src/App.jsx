import './App.css'
import { BrowserRouter , Route,  Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/CropRecommendation';
import Home from './pages/Home'
import Fertilizer from './components/Fertilizer';
import SoilQuality from './components/SoilQuality';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import Forecast from './pages/Forecast';
import Prices from './components/Prices';
import Reports from './components/Reports';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <GoTop/>
        <div > 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop" element={<Crop />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/soil" element={<SoilQuality />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
        <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;



