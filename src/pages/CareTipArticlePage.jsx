import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function CareTipArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [careTip, setCareTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareTip = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8080/api/care-tips/${id}`);
        console.log('CareTip response:', response.data); 
        setCareTip(response.data);
      } catch (err) {
        console.error('Error fetching care tip:', err.response || err); 
        setError('Failed to load the care tip. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareTip();
  }, [id]);

  const handleShare = async () => {
    if (!careTip) return;

    const shareData = {
      title: careTip.title, 
      text: `Check out this care tip for dogs: ${careTip.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      toast.error('Failed to share the care tip.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!careTip) {
    return (
      <div className="p-4">
        <div className="text-gray-500 text-center">Care tip not found.</div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/care-tips')}
          className="flex items-center gap-2 text-blue-600 hover:text-primary-dark"
        >
          <FaArrowLeft />
          <span>Back to Care Tips</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-blue-600 hover:text-primary-dark"
        >
          <FaShareAlt />
          <span>Share</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-heading mb-4">{careTip.title}</h1>
      <p className="text-body mb-6">{careTip.description}</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-heading mb-3">Article</h2>
        {careTip.article ? (
          <>
            <h3 className="text-xl font-medium text-subheading mb-2">{careTip.article.title}</h3>
            <p className="text-body whitespace-pre-line">{careTip.article.content}</p>
          </>
        ) : (
          <p className="text-gray-500">No article available for this care tip.</p>
        )}
      </div>
    </motion.div>
  );
}