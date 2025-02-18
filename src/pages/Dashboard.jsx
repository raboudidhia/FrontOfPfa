import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import Sidebar component

const Dashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    setIsLoggedIn(false); // Update the login state
    navigate('/'); // Redirect to the home or login page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
        <p className="mt-4">Here is your personalized dashboard where you can view your details and other information.</p>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="absolute top-6 right-6 inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:from-red-600 hover:to-red-500 transform transition duration-300 ease-in-out"
        >
          <span className="mr-2"></span> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
