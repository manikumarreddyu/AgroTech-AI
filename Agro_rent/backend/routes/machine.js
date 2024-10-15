const express = require('express');
const router = express.Router();
const {getMachines, getMachine, createMachine, updateMachine, deleteMachine} = require('../controllers/machineController');
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);

router.get('/all', getMachines);
router.get('/', getMachine);
router.post('/', createMachine);
router.put('/', updateMachine);
router.delete('/', deleteMachine);

module.exports = router;
