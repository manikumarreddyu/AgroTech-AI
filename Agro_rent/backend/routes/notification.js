const express = require('express');
const router = express.Router();
const {getNotifications, getNotification, createNotification, updateNotification, deleteNotification} = require('../controllers/notificationController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/all', getNotifications);
router.get('/', getNotification);
router.post('/', createNotification);
router.put('/', updateNotification);
router.delete('/', deleteNotification);

module.exports = router;
