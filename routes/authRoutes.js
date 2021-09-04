const express = require('express');

const router = express.Router();
const authController = require('../controllers/authControllers.js');
const authMiddleware = require('../middleware/authMiddleware.js');



router.post(
  '/auth/register',
  authMiddleware.validateRegisterNewUser,
  authController.register
);

router.post('/auth/login', authMiddleware.validateLoginUser, authController.login);

module.exports = router;
