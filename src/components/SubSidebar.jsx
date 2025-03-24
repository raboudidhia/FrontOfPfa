// src/components/SubSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function SubSidebar({ title, items }) {
  return (
    <div className="w-64 h-screen p-4 bg-gray-100 shadow-md fixed left-60 top-0">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="my-2">
            <Link to={item.link} className="text-blue-600 hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}