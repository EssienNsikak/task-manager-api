const express = require('express');

const router = express.Router();
const userController = require('../controllers/userControllers.js');
const userMiddleware = require('../middleware/userMiddleware.js');


router.get('/users/:id', userController.view);

router.put(
  '/users/:id',
  userMiddleware.validateUpdateUser,
  userController.update
);

router.delete('/users/:id', userController.delete);

module.exports = router;
