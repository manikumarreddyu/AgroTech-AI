/**
* @swagger
* /api/user:
*   post:
*     summary: Create a new user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               mobile:
*                 type: integer
*               password:
*                 type: string
*               age:
*                 type: integer
*               role:
*                 type: string
*               address:
*                 type: string
*               city:
*                 type: string
*               state:
*                 type: string
*               zipCode:
*                 type: integer
*     responses:
*       200:
*         description: Successfully created a new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/UserResponse'
* 
*/

const express = require('express');
const router = express.Router();
const {getUsers, getUser, loginUser, logoutUser, createUser, updateUser, deleteUser, validateUserRole} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');


router.post('/login', loginUser);
router.post('/', createUser);

router.use(validateToken);

router.post('/logout', logoutUser);
router.get('/all', getUsers);
router.get('/', getUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
// Add the new route to validate user role
router.get('/validateRole/:email', validateUserRole);

module.exports = router;

