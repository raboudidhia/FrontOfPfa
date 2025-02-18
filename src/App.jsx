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
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className='app-container w-full min-h-svh bg-white'>
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

          {/* Login Route */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected Route: Dashboard */}
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="/signout" element={<SignOut setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {!isLoggedIn && <Footer />}

      </div>
    </Router>
  );
}

export default App;
