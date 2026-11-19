import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const SellForm = ({ listings, setListings, editingListing, setEditingListing }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', price: '', description: '', fileType: '', imageUrl: '' });

  useEffect(() => {
    if (editingListing) {
      setFormData({
        name: editingListing.name,
        price: editingListing.price,
        description: editingListing.description,
        fileType: editingListing.fileType,
        imageUrl: editingListing.imageUrl,
      });
    } else {
      setFormData({ name: '', price: '', description: '', fileType: '', imageUrl: '' });
    }
  }, [editingListing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingListing) {
        const response = await axiosInstance.put(`/api/listings/${editingListing._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setListings(listings.map((listing) => (listing._id === response.data._id ? response.data : listing)));
      } else {
        const response = await axiosInstance.post('/api/listings', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setListings([...listings, response.data]);
      }
      setEditingListing(null);
      setFormData({ name: '', price: '', description: '', fileType: '', imageUrl: '' });
    } catch (error) {
      alert('Failed to save listing.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingListing ? 'Edit existing listing' : 'Sell a Product'}</h1>
      <input
        type="text"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Listing Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price ($)"
        min="0"
        step="0.01"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

        <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
        <select
        value={formData.fileType}
        onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value="">Select file type</option>
        <option value="PDF">PDF</option>
        <option value="ZIP">ZIP</option>
        <option value="PNG">PNG</option>
        <option value="MP3">MP3</option>
        <option value="MP4">MP4</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingListing ? 'Update Listing' : 'Create Listing'}
      </button>
    </form>
  );
};

export default SellForm;
