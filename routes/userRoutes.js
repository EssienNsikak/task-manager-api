const express = require('express');

const router = express.Router();
const userController = require('../controllers/userControllers.js');
const userMiddleware = require('../middleware/userMiddleware.js');


router.get('/:id', userController.view);

router.put(
  '/:id',
  userMiddleware.validateUpdateUser,
  userController.update
);

router.delete('/:id', userController.delete);

module.exports = router;
