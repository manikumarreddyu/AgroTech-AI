const express = require('express');
const router = express.Router();
const {getPayments, getPayment, createPayment, updatePayment, deletePayment} = require('../controllers/paymentController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/all', getPayments);
router.get('/', getPayment);
router.post('/', createPayment);
router.put('/', updatePayment);
router.delete('/', deletePayment);

module.exports = router;