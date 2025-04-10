import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageCareTips = () => {
  const [careTips, setCareTips] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCareTips();
  }, []);

  const fetchCareTips = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/admin/care-tips', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCareTips(response.data);
    } catch (error) {
      console.error('Error fetching care tips:', error);
      toast.error('Failed to fetch care tips');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`http://localhost:8080/admin/care-tips/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Care tip updated successfully');
      } else {
        await axios.post('http://localhost:8080/admin/care-tips', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Care tip created successfully');
      }
      setFormData({ title: '', content: '' });
      setEditingId(null);
      fetchCareTips();
    } catch (error) {
      console.error('Error saving care tip:', error);
      toast.error('Failed to save care tip');
    }
  };

  const handleEdit = (careTip) => {
    setFormData({
      title: careTip.title,
      content: careTip.content,
    });
    setEditingId(careTip._id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/admin/care-tips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Care tip deleted successfully');
      fetchCareTips();
    } catch (error) {
      console.error('Error deleting care tip:', error);
      toast.error('Failed to delete care tip');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Care Tips</h1>

      {/* Form for Creating/Editing Care Tips */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Care Tip' : 'Add New Care Tip'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {editingId ? 'Update Care Tip' : 'Add Care Tip'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setFormData({ title: '', content: '' });
              setEditingId(null);
            }}
            className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
      </form>

      {/* List of Care Tips */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Care Tip List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careTips.map((careTip) => (
            <div key={careTip._id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{careTip.title}</h3>
              <p className="text-gray-600">{careTip.content.substring(0, 100)}...</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(careTip)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(careTip._id)}
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

export default ManageCareTips;