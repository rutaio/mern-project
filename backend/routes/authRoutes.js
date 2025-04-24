const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Naujo naudotojo registracija
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authController.getCurrentUser);

module.exports = router;
