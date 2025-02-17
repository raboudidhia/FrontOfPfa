import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AboutUsSection from './components/AboutUsSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import TopGroomersSection from './components/TopGroomersSection';
import TopNewsSection from './components/TopNewsSection';
import TopSection from './components/TopSection';
import Login from './pages/Login';
import SignOut from './components/SignOut';
import Register from './pages/Register'; // Import Register page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className='app-container w-full min-h-svh bg-white'>
        <Navbar 
         isLoggedIn={isLoggedIn}
         setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<>
            <TopSection />
            <AboutUsSection />
            <ServicesSection />
           
          </>} />
          <Route path="/services" element={<ServicesSection />} /> 
          <Route path="/about" element={<AboutUsSection />} /> 
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signout" element={<SignOut setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} /> {/* Add Register route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;