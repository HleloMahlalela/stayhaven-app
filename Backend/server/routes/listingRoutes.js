const express = require('express');
const {
  authMiddleware,
  authorize,
} = require('../middleware/authMiddleware');
const {
  getApprovedListings,
  getListingById,
  createListing,
  getHostListings,
  updateListingStatus,
} = require('../controllers/listingController');

const router = express.Router();

router.get('/', getApprovedListings);
router.get('/host', authMiddleware, authorize('houseAdmin'), getHostListings);
router.get('/:id', getListingById);
router.post('/', authMiddleware, authorize('houseAdmin'), createListing);
router.patch(
  '/:id/status',
  authMiddleware,
  authorize('appAdmin'),
  updateListingStatus
);

module.exports = router;
