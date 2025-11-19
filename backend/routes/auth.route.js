const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateToken } = require('../middleware/auth.middleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/me', validateToken, authController.getMe); 
router.put('/change-password', validateToken, authController.changePassword);
router.post('/logout', validateToken, authController.logout);
router.delete('/delete-account', validateToken, authController.deleteAccount);

module.exports = router;