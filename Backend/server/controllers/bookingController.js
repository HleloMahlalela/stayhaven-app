const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

exports.createBooking = async (req, res) => {
  try {
    const { listing: listingId, checkInDate, checkOutDate } = req.body;

    if (!listingId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: 'listing, checkInDate and checkOutDate are required' });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn) || isNaN(checkOut)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
    if (checkOut <= checkIn) {
      return res.status(400).json({ message: 'Check-out must be after check-in' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const overlap = await Booking.findOne({
      listing: listingId,
      status: { $in: ['pending', 'confirmed'] },
      checkInDate: { $lt: checkOut },
      checkOutDate: { $gt: checkIn },
    });
    if (overlap) {
      return res.status(409).json({ message: 'Listing is not available for those dates' });
    }

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.pricePerNight;

    const booking = await Booking.create({
      listing: listingId,
      guest: req.user._id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice,
    });

    const populated = await booking.populate([
      { path: 'listing' },
      { path: 'guest', select: 'name email' },
    ]);

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate('listing')
      .populate('guest', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHostBookings = async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.user._id }).select('_id');
    const listingIds = listings.map((l) => l._id);

    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate('listing')
      .populate('guest', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Status must be 'confirmed' or 'cancelled'" });
    }

    const booking = await Booking.findById(req.params.id).populate('listing');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not own this listing' });
    }

    booking.status = status;
    await booking.save();
    await booking.populate('guest', 'name email');

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};