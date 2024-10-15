const express = require('express');
const { getImagesByMachineId } = require('../controllers/imageController');

const router = express.Router();

// Route to get images by machineId
router.get('/', getImagesByMachineId);

module.exports = router;
