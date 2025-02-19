import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AboutUsSection from './components/AboutUsSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import TopSection from './components/TopSection';
import Login from './pages/Login';
import SignOut from './components/SignOut';
import Register from './pages/Register'; 

import DogPage from './pages/DogPage';
import Products from './pages/Products';
import CareTips from './pages/CareTips';
import Diseases from './pages/Diseases';
import Upload from './pages/Upload';
import History from './pages/History';
import Sidebar from './components/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className='app-container w-full min-h-svh bg-white flex'>
        {isLoggedIn && <Sidebar />}
        <div className='content-container flex-1'>
          {!isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          <Routes>
            <Route path="/" element={
              <>
                <TopSection />
                <AboutUsSection />
                <ServicesSection />
              </>
            } />
            <Route path="/services" element={<ServicesSection />} /> 
            <Route path="/about" element={<AboutUsSection />} /> 
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            
            <Route path="/signout" element={<SignOut setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dog" element={isLoggedIn ? <DogPage setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/products" element={isLoggedIn ? <Products /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/care-tips" element={isLoggedIn ? <CareTips /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/diseases" element={isLoggedIn ? <Diseases /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/upload" element={isLoggedIn ? <Upload /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/history" element={isLoggedIn ? <History /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
          {!isLoggedIn && <Footer />}
        </div>
      </div>
    </Router>
  );
}

export default App;
