const express = require('express');
const router = express.Router();

const {
    createReview,
    getListingReviews
} = require('../controllers/reviewController');

const {
    protect,
    authorize
} = require("../middleware/reviewController");

router.post(
    "/:listingId",
    getListingReviews
);

module.exports = router;
