import React, { useState } from 'react';
import { MdMenuOpen } from "react-icons/md";
import { GoUpload } from "react-icons/go";
import { FaProductHunt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoLogoBuffer } from "react-icons/io";
import { FaDog } from "react-icons/fa";
import { FaDisease } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { Link } from 'react-router-dom';

// Menu items with icons and labels
const menuItems = [
  {
    icons: <FaDog size={30} />,
    label: 'MyDog',
    path: '/dog'
  },
  {
    icons: <FaProductHunt size={30} />,
    label: 'Products',
    path: '/products'
  },
  {
    icons: <MdOutlineTipsAndUpdates size={30} />,
    label: 'Care Tips',
    path: '/care-tips'
  },
  {
    icons: <FaDisease size={30} />,
    label: 'Diseases',
    path: '/diseases'
  },
  {
    icons: <GoUpload size={30} />,
    label: 'Upload',
    path: '/upload'
  },
  {
    icons: <FaHistory size={30} />,
    label: 'History',
    path: '/history'
  }
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <nav className={`   top-0 left-0 shadow-md h-screen p-2 flex flex-col duration-500 bg-gray-800 text-gray-200 ${open ? 'w-60' : 'w-16'}`}>
      {/* Header with Menu Toggle */}
      <div className=' px-3 py-2 h-20 flex justify-between items-center'>
        <div>
          <MdMenuOpen 
            size={34} 
            className={`duration-500 cursor-pointer ${!open && 'rotate-180'}`} 
            onClick={() => setOpen(!open)} 
          />
        </div>
      </div>

      {/* Sidebar Body */}
      <ul className='flex-1'>
        {
          menuItems.map((item, index) => {
            return (
              <li key={index} className='px-3 py-2 my-2 hover:bg-gray-700 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                <Link to={item.path || '#'} className='flex gap-2 items-center'>
                  <div>{item.icons}</div>
                  <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                </Link>
                <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>
                  {item.label}
                </p>
              </li>
            )
          })
        }
      </ul>

      {/* Footer with User Profile */}
      <div className='flex items-center gap-2 px-3 py-2'>
        <div><FaUserCircle size={30} /></div>
        <div className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
          <p>Saheb</p>
          <span className='text-xs'>saheb@gmail.com</span>
        </div>
      </div>
    </nav>
  );
}
