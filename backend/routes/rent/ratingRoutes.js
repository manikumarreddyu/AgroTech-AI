
   
const express = require('express');
const { ratingController } = require('../../controllers/rent/RatingController');

const router = express.Router();

router.post('/products/:productId/review', ratingController)



module.exports = router;
