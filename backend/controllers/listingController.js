const Listing = require('../models/Listing');

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find({ userId: req.user.id });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addListing = async (req, res) => {
  try {
    const listing = await Listing.create({ ...req.body, userId: req.user.id });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getListings, addListing, updateListing, deleteListing };