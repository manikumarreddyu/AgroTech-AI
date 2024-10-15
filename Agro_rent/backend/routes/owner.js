const express = require('express');
const router = express.Router();
const { getOwner, createOwner, updateOwner, deleteOwner} = require('../controllers/ownerController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/', getOwner);
router.post('/', createOwner);
router.put('/', updateOwner);
router.delete('/', deleteOwner);

module.exports = router;
