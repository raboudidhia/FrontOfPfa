import React, { useState } from 'react';
import PetCareLogo from '../assets/images/pet-care-logo.png';
import PawLogo from '../assets/images/blue-paw-logo.png';
import CustomButton from './CustomButton';

// const Navbar = () => {
//   return (
//     <nav className="bg-[#F5F5F5] w-full">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Left container */}
//           <div className="flex-shrink-0 flex items-center">
//             <img
//               className="block lg:hidden h-8 w-auto rounded-sm"
//               src={PawLogo}
//               alt="Pet Care Logo"
//             />
//             <img
//               className="hidden lg:block h-8 w-auto rounded-sm"
//               src={PawLogo}
//               alt="Pet Care Logo"
//             />
//             <span className="ml-2 text-black text-lg font-semibold">Honest Pets</span>
//           </div>
          
//           {/* Middle container */}
//           <div className="flex justify-center flex-grow">
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
//               <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</a>
//               <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
//               <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Training</a>
//               <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Med-Care</a>
//             </div>
//           </div>
          
//           {/* Right container */}
//           <div className="flex-shrink-0 flex items-center">
//             <CustomButton slim={true} text="Contact Us" />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#F5F5F5] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left container */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="block lg:hidden h-8 w-auto rounded-sm"
              src={PawLogo}
              alt="Pet Care Logo"
            />
            <img
              className="hidden lg:block h-8 w-auto rounded-sm"
              src={PawLogo}
              alt="Pet Care Logo"
            />
            <span className="ml-2 text-black text-lg font-semibold">Honest Pets</span>
          </div>
          
          {/* Middle container */}
          <div className="hidden lg:flex justify-center flex-grow">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Training</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Med-Care</a>
            </div>
          </div>
          
          {/* Right container */}
          <div className="flex-shrink-0 hidden sm:flex items-center">
            <CustomButton slim={true} text="Contact Us" />
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="text-gray-800 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16V4H4v2zm0 5h16v-2H4v2zm16 4H4v-2h16v2zm0 4H4v-2h16v2z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16V4H4v2zm0 5h16v-2H4v2zm0 5h16v-2H4v2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu content */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About Us</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Training</a>
              <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Med-Care</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;