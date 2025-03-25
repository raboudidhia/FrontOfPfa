import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './App.css';
import AboutUsSection from './components/AboutUsSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import TopSection from './components/TopSection';
import Login from './pages/Login';
import SignOut from './components/SignOut';
import Register from './pages/Register'; 
import ResetPassword from './pages/ResetPassword';
import DiseaseArticlePage from './pages/DiseaseArticlePage';
import DogPage from './pages/DogPage';
import Products from './pages/Products';
import CareTips from './pages/CareTips';
import Diseases from './pages/Diseases';
import Upload from './pages/Upload';
import History from './pages/History';
import Sidebar from './components/Sidebar';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails({
        username: response.data.username || 'User',
        email: response.data.email || '',
      });
    } catch (err) {
      console.error('Failed to fetch user details:', err);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUserDetails({ username: '', email: '' });
    }
  };

  return (
    <Router>
      <div className='app-container w-full min-h-svh bg-white flex'>
        {isLoggedIn && (
          <Sidebar
            setIsLoggedIn={setIsLoggedIn}
            username={userDetails.username}
            email={userDetails.email}
          />
        )}
        <div className='content-container flex-1'>
          {!isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopSection />
                  <AboutUsSection />
                  <ServicesSection />
                </>
              }
            />
            <Route path="/services" element={<ServicesSection />} />
            <Route path="/about" element={<AboutUsSection />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />} />
            
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signout" element={<SignOut setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dog"
              element={isLoggedIn ? <DogPage setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />}
            />
            <Route
              path="/products"
              element={isLoggedIn ? <Products /> : <Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />}
            />
            <Route
              path="/care-tips"
              element={isLoggedIn ? <CareTips /> : <Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />}
            />
            <Route
              path="/diseases"
              element={isLoggedIn ? <Diseases /> : <Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />}
            />
            <Route
              path="/diseases/:id" 
              element={isLoggedIn ? <DiseaseArticlePage /> : <Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />}
            />
            <Route
              path="/upload"
              element={isLoggedIn ? <Upload /> : <Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />}
            />
            <Route
              path="/history"
              element={isLoggedIn ? <History /> : <Login setIsLoggedIn={setIsLoggedIn} fetchUserDetails={fetchUserDetails} />}
            />
          </Routes>
          {!isLoggedIn && <Footer />}
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer */}
    </Router>
  );
}

export default App;