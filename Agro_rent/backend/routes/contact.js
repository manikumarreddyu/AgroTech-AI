const express = require('express');
const router = express.Router();
const {getContacts, getContact, createContact, updateContact, deleteContact} = require('../controllers/contactController');

router.get('/all', getContacts);
router.get('/', getContact);
router.post('/', createContact);
router.put('/', updateContact);
router.delete('/', deleteContact);

module.exports = router;
