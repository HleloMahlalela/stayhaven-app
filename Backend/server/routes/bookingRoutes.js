const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  createBooking,
  getMyBookings,
  getHostBookings,
  updateBookingStatus
} = require('../controllers/bookingController');

router.post('/',protect, authorize('guest'), createBooking);
router.get('/my-bookings', protect, authorize('guest'), getMyBookings);
router.get('/host-bookings', protect, authorize('host'), getHostBookings);
router.put('/:id/status', protect, authorize('host'), updateBookingStatus);

module.exports = router;