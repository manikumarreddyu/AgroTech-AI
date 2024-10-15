const express = require('express');
const router = express.Router();
const {getImgs, getImg, createImg, deleteImg} = require('../controllers/imageController');
const validateToken = require('../middleware/validateTokenHandler');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.use(validateToken);
router.get('/all', getImgs);
router.get('/', getImg);
router.post('/', upload.array('avatar'), createImg);
router.delete('/', deleteImg);


module.exports = router;