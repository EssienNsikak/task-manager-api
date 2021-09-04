const express = require('express');

const router = express.Router();
const taskController = require('../controllers/taskControllers.js');
const taskMiddleware = require('../middleware/taskMiddleware.js');



router.post(
  '/tasks',
  taskMiddleware.validateCreateTask,
  taskController.create
);

router.get('/tasks', taskController.list);

router.get('/tasks/:id', taskController.view);

router.put(
  '/tasks/:id',
  taskMiddleware.validateUpdateTask,
  taskController.update
);

router.delete('/tasks/:id', taskController.delete);

module.exports = router;
