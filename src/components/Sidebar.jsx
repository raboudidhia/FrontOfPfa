import  { useState } from 'react';
import { MdMenuOpen } from "react-icons/md";
import { GoUpload } from "react-icons/go";
import { FaProductHunt, FaUserCircle, FaHistory, FaDog, FaDisease } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


const menuItems = [
  { icon: <FaDog size={30} />, label: 'MyDog', path: '/dog' },
  { icon: <FaProductHunt size={30} />, label: 'Products', path: '/products' },
  { icon: <MdOutlineTipsAndUpdates size={30} />, label: 'Care Tips', path: '/care-tips' },
  { icon: <FaDisease size={30} />, label: 'Diseases', path: '/diseases' },
  { icon: <GoUpload size={30} />, label: 'Upload', path: '/upload' },
  { icon: <FaHistory size={30} />, label: 'History', path: '/history' },
  { icon: <IoLogOut size={30} />, label: 'Disconnect', path: '/signout' },
];

export default function Sidebar({ setIsLoggedIn, username, email }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="flex">
      <nav className={`fixed top-0 left-0 h-screen p-2 bg-gray-800 text-gray-200 shadow-md 
                      duration-500 ${open ? 'w-60' : 'w-16'}`}>
        
        <div className="px-3 py-2 h-20 flex justify-between items-center">
          <MdMenuOpen 
            size={34} 
            className={`cursor-pointer duration-500 ${!open && 'rotate-180'}`} 
            onClick={() => setOpen(!open)} 
          />
        </div>

        
        <ul className="flex-1">
          {menuItems.map((item, index) => (
            <li key={index} className="px-3 py-2 my-2 hover:bg-gray-700 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group">
              {item.label === 'Disconnect' ? (
                <div onClick={handleSignOut} className="flex gap-2 items-center">
                  <div>{item.icon}</div>
                  <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                </div>
              ) : (
                <Link to={item.path || '#'} className="flex gap-2 items-center">
                  <div>{item.icon}</div>
                  <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                </Link>
              )}
              <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white 
                            duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>
                {item.label}
              </p>
            </li>
          ))}
        </ul>

        
        <div className="flex items-center gap-2 px-3 py-2 mt-40">
          <FaUserCircle size={30} />
          <div className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
            <p>{username || 'User'}</p> 
            <span className="text-xs">{email || 'email@example.com'}</span> 
          </div>
        </div>
      </nav>

      <div className={`flex-1 min-h-screen p-5 bg-gray-100 transition-all duration-500 ${open ? 'ml-60' : 'ml-16'}`}>
        
      </div>
    </div>
  );
}