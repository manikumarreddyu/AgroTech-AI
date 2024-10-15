import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import your home component
import Products from './pages/Products'; // Import your products component
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductDetailPage from './components/Product/ProductDetailPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import Image from './pages/Image';
import ProductInfoCard from './components/ProductInfoCard/ProductInfoCard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path="/products/:machineId" element={<ProductDetailPage/>} />
        <Route path='/add_tools' element={<ProductRegistrationPage/>} />
        <Route path='/info_card' element={<ProductInfoCard/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/trial' element={<Image />} />

        
        {/* Add more Route components for other pages as needed */}
      </Routes>
    </Router>
  );
}

export default App;
