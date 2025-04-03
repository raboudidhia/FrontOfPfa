import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaPaw } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function CareTips() {
  const [careTipItems, setCareTipItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareTips = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8080/api/care-tips');
        console.log('CareTips response:', response.data); // Debug log
        setCareTipItems(response.data);
        setFilteredItems(response.data);
      } catch (err) {
        console.error('Error fetching care tips:', err.response || err); // Debug log
        setError('Failed to load care tips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareTips();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(careTipItems);
    } else {
      const filtered = careTipItems.filter(item => {
        const title = item.title && typeof item.title === 'string' ? item.title.toLowerCase() : '';
        return title.includes(searchTerm.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  }, [searchTerm, careTipItems]);

  return (
    <div className="p-6 flex-1 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dog Care Tips</h1>

      <div className="relative mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search care tips..."
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
        <div className="text-gray-500 text-center">No care tips found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((careTip) => (
            <motion.div
              key={careTip.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={`/care-tips/${careTip.id}`}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 flex items-start gap-3"
              >
                <FaPaw className="text-blue-500 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{careTip.title || 'Unnamed Care Tip'}</h2>
                  <p className="text-gray-600 line-clamp-3">{careTip.description || 'No description available.'}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}