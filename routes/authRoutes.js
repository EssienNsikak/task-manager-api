const express = require('express');

const router = express.Router();
const authController = require('../controllers/authControllers.js');
const authMiddleware = require('../middleware/authMiddleware.js');



router.post(
  '/register',
  authMiddleware.validateRegisterNewUser,
  authController.register
);

router.post('/login', authMiddleware.validateLoginUser, authController.login);

module.exports = router;
