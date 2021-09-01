const express = require('express');

const router = express.Router();
const taskController = require('../controllers/taskControllers.js');
const taskMiddleware = require('../middleware/taskMiddleware.js');



router.post(
  '/',
  taskMiddleware.validateCreateTask,
  taskController.create
);

router.get('/', taskController.list);

router.get('/:id', taskController.view);

router.put(
  '/:id',
  taskMiddleware.validateUpdateTask,
  taskController.update
);

router.delete('/:id', taskController.delete);

module.exports = router;
