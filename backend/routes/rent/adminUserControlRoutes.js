const express = require('express');
const { createUser, updateUser, updateUserRole, deleteUser, getUserById, getAllUsers, toggleUserStatus } = require('../../controllers/rent/AdminUserController');
const router = express.Router();

// CRUD Operations
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);
router.get('/users/:userId', getUserById);
router.get('/users', getAllUsers);

// Role & Permission Updates
router.put('/users/:userId/role', updateUserRole);

// Account Status Toggle
router.put('/users/:userId/status', toggleUserStatus);

module.exports = router;
