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
import useTheme from './hooks/useTheme';
import Price from './components/Price';
import Report from './components/Report';


const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <BrowserRouter>
      <div>
        <GoTop/>
        <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#000435', color: theme === 'light' ? '#000435' : '#fff' }}> 
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop" element={<Crop />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/soil" element={<SoilQuality />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/price" element={<Price />} />
          <Route path="/report" element={<Report />} />
        </Routes>
        <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;



