const express = require('express');
const router = express.Router();
const {getReviews, getReview, createReview, updateReview, deleteReview} = require('../controllers/reviewController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/all', getReviews);
router.get('/', getReview);
router.post('/', createReview);
router.put('/', updateReview);
router.delete('/', deleteReview);

module.exports = router;
