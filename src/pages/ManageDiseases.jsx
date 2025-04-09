import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    symptoms: [],
    treatments: [],
    article: { title: '', content: '' },
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/admin/diseases', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiseases(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
      toast.error('Failed to fetch diseases');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'symptoms' || name === 'treatments') {
      setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
    } else if (name === 'articleTitle') {
      setFormData({ ...formData, article: { ...formData.article, title: value } });
    } else if (name === 'articleContent') {
      setFormData({ ...formData, article: { ...formData.article, content: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`http://localhost:8080/admin/diseases/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Disease updated successfully');
      } else {
        await axios.post('http://localhost:8080/admin/diseases', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Disease created successfully');
      }
      setFormData({ name: '', description: '', symptoms: [], treatments: [], article: { title: '', content: '' } });
      setEditingId(null);
      fetchDiseases();
    } catch (error) {
      console.error('Error saving disease:', error);
      toast.error('Failed to save disease');
    }
  };

  const handleEdit = (disease) => {
    setFormData({
      name: disease.name,
      description: disease.description,
      symptoms: disease.symptoms,
      treatments: disease.treatments,
      article: disease.article || { title: '', content: '' },
    });
    setEditingId(disease._id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/admin/diseases/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Disease deleted successfully');
      fetchDiseases();
    } catch (error) {
      console.error('Error deleting disease:', error);
      toast.error('Failed to delete disease');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Diseases</h1>

      {/* Form for Creating/Editing Diseases */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Disease' : 'Add New Disease'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Symptoms (comma-separated)</label>
          <input
            type="text"
            name="symptoms"
            value={formData.symptoms.join(', ')}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Treatments (comma-separated)</label>
          <input
            type="text"
            name="treatments"
            value={formData.treatments.join(', ')}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Article Title</label>
          <input
            type="text"
            name="articleTitle"
            value={formData.article.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Article Content</label>
          <textarea
            name="articleContent"
            value={formData.article.content}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {editingId ? 'Update Disease' : 'Add Disease'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setFormData({ name: '', description: '', symptoms: [], treatments: [], article: { title: '', content: '' } });
              setEditingId(null);
            }}
            className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      {/* List of Diseases */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Disease List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diseases.map((disease) => (
            <div key={disease._id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{disease.name}</h3>
              <p className="text-gray-600">{disease.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(disease)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(disease._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageDiseases;