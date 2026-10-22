const mongoose = require('mongoose');
const Listing = require('../models/Listing');

const getApprovedListings = async (req, res, next) => {
  try {
    const filter = { status: 'approved' };
    const location = req.query.location || req.query.search;

    if (location) {
      filter.location = { $regex: String(location), $options: 'i' };
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(listings);
  } catch (error) {
    return next(error);
  }
};

const getListingById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const listing = await Listing.findOne({
      _id: req.params.id,
      status: 'approved',
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    return res.status(200).json(listing);
  } catch (error) {
    return next(error);
  }
};

const createListing = async (req, res, next) => {
  try {
    const hostId = req.user && (req.user._id || req.user.id);
    if (!hostId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const listing = await Listing.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      images: req.body.images,
      amenities: req.body.amenities,
      host: hostId,
      status: 'pending',
    });

    return res.status(201).json(listing);
  } catch (error) {
    return next(error);
  }
};

const getHostListings = async (req, res, next) => {
  try {
    const hostId = req.user && (req.user._id || req.user.id);
    if (!hostId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const listings = await Listing.find({ host: hostId }).sort({ createdAt: -1 });
    return res.status(200).json(listings);
  } catch (error) {
    return next(error);
  }
};

const updateListingStatus = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const { status } = req.body;
    if (!['approved', 'suspended'].includes(status)) {
      return res.status(400).json({
        message: "Status must be either 'approved' or 'suspended'",
      });
    }

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    return res.status(200).json(listing);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getApprovedListings,
  getListingById,
  createListing,
  getHostListings,
  updateListingStatus,
};
