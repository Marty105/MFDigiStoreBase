import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import SellForm from '../components/SellForm';
import ProductList from '../components/ProductList';
import { useAuth } from '../context/AuthContext';

const Listings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axiosInstance.get('/api/listings', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setListings(response.data);
      } catch (error) {
        alert('Failed to fetch Listings.');
      }
    };

    fetchListings();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <SellForm
        listings={listings}
        setListings={setListings}
        editingListing={editingListing}
        setEditingListing={setEditingListing}
      />
      <ProductList listings={listings} setListings={setListings} setEditingListing={setEditingListing} />
    </div>
  );
};

export default Listings;
