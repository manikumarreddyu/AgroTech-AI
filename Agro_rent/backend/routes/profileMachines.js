const express = require('express');
const { getProfileMachines } = require('../controllers/profileMachinesController');
const router = express.Router();

router.get('/:userId', getProfileMachines); // Adjust the path as necessary

module.exports = router;
