
const express = require('express');
const { getListings, addListing, updateListing, deleteListing } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getListings).post(protect, addListing);
router.route('/:id').put(protect, updateListing).delete(protect, deleteListing);

module.exports = router;
