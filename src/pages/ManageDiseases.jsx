import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [newDisease, setNewDisease] = useState({
    name: '',
    description: '',
    symptoms: '',
    treatments: '',
    article: { title: '', content: '' },
  });
  const [editingDisease, setEditingDisease] = useState(null);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/diseases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDiseases(response.data);
    } catch (err) {
      console.error('Failed to fetch diseases:', err);
      toast.error('Failed to fetch diseases');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('article.')) {
      const articleField = name.split('.')[1];
      if (editingDisease) {
        setEditingDisease({
          ...editingDisease,
          article: { ...editingDisease.article, [articleField]: value },
        });
      } else {
        setNewDisease({
          ...newDisease,
          article: { ...newDisease.article, [articleField]: value },
        });
      }
    } else {
      if (editingDisease) {
        setEditingDisease({ ...editingDisease, [name]: value });
      } else {
        setNewDisease({ ...newDisease, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDisease) {
        const response = await axios.put(
          `http://localhost:8080/admin/diseases/${editingDisease.id}`,
          {
            ...editingDisease,
            symptoms: editingDisease.symptoms ? editingDisease.symptoms.split(',').map(s => s.trim()) : [],
            treatments: editingDisease.treatments ? editingDisease.treatments.split(',').map(t => t.trim()) : [],
            article: editingDisease.article.title || editingDisease.article.content ? editingDisease.article : null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setDiseases(diseases.map((disease) => (disease.id === editingDisease.id ? response.data : disease)));
        setEditingDisease(null);
        toast.success('Disease updated successfully!');
      } else {
        const response = await axios.post(
          'http://localhost:8080/admin/diseases',
          {
            ...newDisease,
            symptoms: newDisease.symptoms ? newDisease.symptoms.split(',').map(s => s.trim()) : [],
            treatments: newDisease.treatments ? newDisease.treatments.split(',').map(t => t.trim()) : [],
            article: newDisease.article.title || newDisease.article.content ? newDisease.article : null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setDiseases([...diseases, response.data]);
        setNewDisease({ name: '', description: '', symptoms: '', treatments: '', article: { title: '', content: '' } });
        toast.success('Disease added successfully!');
      }
    } catch (err) {
      console.error('Failed to save disease:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = err.response.data.errors.map((error) => error.message).join(', ');
        toast.error(`Failed to save disease: ${errorMessages}`);
      } else {
        toast.error('Failed to save disease: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };

  const handleEdit = (disease) => {
    setEditingDisease({
      ...disease,
      symptoms: disease.symptoms ? disease.symptoms.join(', ') : '',
      treatments: disease.treatments ? disease.treatments.join(', ') : '',
      article: disease.article || { title: '', content: '' },
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/diseases/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDiseases(diseases.filter((disease) => disease.id !== id));
      toast.success('Disease deleted successfully!');
    } catch (err) {
      console.error('Failed to delete disease:', err);
      toast.error('Failed to delete disease');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Diseases</h1>

      {/* Form for Adding/Editing Disease */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingDisease ? 'Edit Disease' : 'Add New Disease'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editingDisease ? editingDisease.name : newDisease.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={editingDisease ? editingDisease.description : newDisease.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Symptoms (comma-separated)</label>
            <textarea
              name="symptoms"
              value={editingDisease ? editingDisease.symptoms : newDisease.symptoms}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="e.g., Fever, Cough"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Treatments (comma-separated)</label>
            <textarea
              name="treatments"
              value={editingDisease ? editingDisease.treatments : newDisease.treatments}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="e.g., Rest, Hydration"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Article Title</label>
            <input
              type="text"
              name="article.title"
              value={editingDisease ? editingDisease.article?.title || '' : newDisease.article.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Article Content</label>
            <textarea
              name="article.content"
              value={editingDisease ? editingDisease.article?.content || '' : newDisease.article.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {editingDisease ? 'Update Disease' : 'Add Disease'}
          </button>
          {editingDisease && (
            <button
              type="button"
              onClick={() => setEditingDisease(null)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Disease List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Disease List</h2>
        {diseases.length === 0 ? (
          <p>No diseases found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Symptoms</th>
                  <th className="px-4 py-2 text-left">Treatments</th>
                  <th className="px-4 py-2 text-left">Article Title</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {diseases.map((disease) => (
                  <tr key={disease.id} className="border-b">
                    <td className="px-4 py-2">{disease.name}</td>
                    <td className="px-4 py-2">{disease.description}</td>
                    <td className="px-4 py-2">{disease.symptoms ? disease.symptoms.join(', ') : ''}</td>
                    <td className="px-4 py-2">{disease.treatments ? disease.treatments.join(', ') : ''}</td>
                    <td className="px-4 py-2">{disease.article ? disease.article.title : 'No Article'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(disease)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(disease.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Back to Admin Dashboard Link */}
      <div className="mt-6">
        <Link to="/admin" className="text-blue-500 hover:underline">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ManageDiseases;