const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { createReview, getListingReviews } =require('../controllers/reviewController');

router.post('/', protect, authorize('guest'), createReview);
router.get('/:listingId', getListingReviews);

module.exports = router;