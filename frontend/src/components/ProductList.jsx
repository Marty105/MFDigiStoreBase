import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ProductList = ({ listings, setListings, setEditingListing }) => {
  const { user } = useAuth();

    const handleDelete = async (listingId) => {
    try {
      await axiosInstance.delete(`/api/listings/${listingId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    setListings(listings.filter((listing) => listing._id !== listingId));
    } catch (error) {
      alert('Failed to delete Listing.');
    }
  };

  return (
    <div>
       {listings.map((listing) => (
         <div key={listing._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
           {listing.imageUrl && (
             <img src={listing.imageUrl} alt={listing.name} className="w-32 h-32 object-cover mb-2 rounded" />)}
           <h2 className="font-bold">{listing.name}</h2>
           <p className="text-lg">${Number(listing.price).toFixed(2)}</p>
           <p>{listing.description}</p>
          <p className="text-sm text-gray-500">File type: {listing.fileType}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingListing(listing)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(listing._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
