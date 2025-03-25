import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; 

export default function DiseaseArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8080/diseases/${id}`);
        setDisease(response.data);
      } catch (err) {
        setError('Failed to load the disease. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisease();
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: disease.name,
      text: `Learn about ${disease.name} in dogs: ${disease.description}`,
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
      toast.error('Failed to share the article.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className=" p-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" p-4">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className=" p-4">
        <div className="text-gray-500 text-center">Disease not found.</div>
      </div>
    );
  }

  return (
    <motion.div
      className=" p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/diseases')}
          className="flex items-center gap-2 text-blue-600 hover:text-primary-dark"
        >
          <FaArrowLeft />
          <span>Back to Diseases</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-blue-600 hover:text-primary-dark"
        >
          <FaShareAlt />
          <span>Share</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-heading mb-4">{disease.name}</h1>
      <p className="text-body mb-6">{disease.description}</p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-heading mb-3">Symptoms</h2>
        <ul className="list-disc list-inside space-y-2">
          {disease.symptoms.map((symptom, index) => (
            <li key={index} className="text-body">{symptom}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-heading mb-3">Treatments</h2>
        <ul className="list-disc list-inside space-y-2">
          {disease.treatments.map((treatment, index) => (
            <li key={index} className="text-body">{treatment}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-heading mb-3">Article</h2>
        <h3 className="text-xl font-medium text-subheading mb-2">{disease.article.title}</h3>
        <p className="text-body whitespace-pre-line">{disease.article.content}</p>
      </div>
    </motion.div>
  );
}