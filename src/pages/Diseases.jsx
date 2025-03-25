import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaPaw } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Diseases() {
  const [diseaseItems, setDiseaseItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8080/diseases');
        setDiseaseItems(response.data);
        setFilteredItems(response.data);
      } catch (err) {
        setError('Failed to load diseases. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(diseaseItems);
    } else {
      const filtered = diseaseItems.filter(item => {
       
        const name = item.name && typeof item.name === 'string' ? item.name.toLowerCase() : '';
        return name.includes(searchTerm.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  }, [searchTerm, diseaseItems]);

  return (
    <div className=" p-6 flex-1 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dog Diseases</h1>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search diseases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-700 shadow-sm"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-gray-500 text-center">No diseases found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((disease) => (
            <motion.div
              key={disease.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/diseases/${disease.id}`}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 flex items-start gap-3"
              >
                <FaPaw className="text-blue-500 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{disease.name || 'Unnamed Disease'}</h2>
                  <p className="text-gray-600 line-clamp-3">{disease.description || 'No description available.'}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}