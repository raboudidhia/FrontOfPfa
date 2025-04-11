import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageCareTips = () => {
  const [careTips, setCareTips] = useState([]);
  const [newCareTip, setNewCareTip] = useState({
    title: '',
    description: '',
    article: { title: '', content: '' },
  });
  const [editingCareTip, setEditingCareTip] = useState(null);

  useEffect(() => {
    fetchCareTips();
  }, []);

  const fetchCareTips = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/care-tips', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCareTips(response.data);
    } catch (err) {
      console.error('Failed to fetch care tips:', err);
      toast.error('Failed to fetch care tips');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('article.')) {
      const articleField = name.split('.')[1];
      if (editingCareTip) {
        setEditingCareTip({
          ...editingCareTip,
          article: { ...editingCareTip.article, [articleField]: value },
        });
      } else {
        setNewCareTip({
          ...newCareTip,
          article: { ...newCareTip.article, [articleField]: value },
        });
      }
    } else {
      if (editingCareTip) {
        setEditingCareTip({ ...editingCareTip, [name]: value });
      } else {
        setNewCareTip({ ...newCareTip, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCareTip) {
        const response = await axios.put(
          `http://localhost:8080/admin/care-tips/${editingCareTip.id}`,
          {
            ...editingCareTip,
            article: editingCareTip.article.title || editingCareTip.article.content ? editingCareTip.article : null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setCareTips(careTips.map((careTip) => (careTip.id === editingCareTip.id ? response.data : careTip)));
        setEditingCareTip(null);
        toast.success('Care tip updated successfully!');
      } else {
        const response = await axios.post(
          'http://localhost:8080/admin/care-tips',
          {
            ...newCareTip,
            article: newCareTip.article.title || newCareTip.article.content ? newCareTip.article : null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setCareTips([...careTips, response.data]);
        setNewCareTip({ title: '', description: '', article: { title: '', content: '' } });
        toast.success('Care tip added successfully!');
      }
    } catch (err) {
      console.error('Failed to save care tip:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = err.response.data.errors.map((error) => error.message).join(', ');
        toast.error(`Failed to save care tip: ${errorMessages}`);
      } else {
        toast.error('Failed to save care tip: ' + (err.response?.data?.message || 'Unknown error'));
      }
    }
  };

  const handleEdit = (careTip) => {
    setEditingCareTip({
      ...careTip,
      article: careTip.article || { title: '', content: '' },
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/care-tips/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCareTips(careTips.filter((careTip) => careTip.id !== id));
      toast.success('Care tip deleted successfully!');
    } catch (err) {
      console.error('Failed to delete care tip:', err);
      toast.error('Failed to delete care tip');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Care Tips</h1>

      {/* Form for Adding/Editing Care Tip */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingCareTip ? 'Edit Care Tip' : 'Add New Care Tip'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editingCareTip ? editingCareTip.title : newCareTip.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={editingCareTip ? editingCareTip.description : newCareTip.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Article Title</label>
            <input
              type="text"
              name="article.title"
              value={editingCareTip ? editingCareTip.article?.title || '' : newCareTip.article.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Article Content</label>
            <textarea
              name="article.content"
              value={editingCareTip ? editingCareTip.article?.content || '' : newCareTip.article.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {editingCareTip ? 'Update Care Tip' : 'Add Care Tip'}
          </button>
          {editingCareTip && (
            <button
              type="button"
              onClick={() => setEditingCareTip(null)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Care Tips List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Care Tips List</h2>
        {careTips.length === 0 ? (
          <p>No care tips found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Article Title</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {careTips.map((careTip) => (
                  <tr key={careTip.id} className="border-b">
                    <td className="px-4 py-2">{careTip.title || 'No Title'}</td>
                    <td className="px-4 py-2">
                      {careTip.description ? careTip.description.substring(0, 50) + '...' : 'No Description'}
                    </td>
                    <td className="px-4 py-2">{careTip.article ? careTip.article.title : 'No Article'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(careTip)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(careTip.id)}
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

      
      <div className="mt-6">
        <Link to="/admin" className="text-blue-500 hover:underline">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ManageCareTips;