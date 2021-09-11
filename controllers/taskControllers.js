const Task = require('../models/taskModel.js');
const mongoose = require('mongoose');


module.exports = {
  //Create task
  create: async (req, res) => {
    try {
      const task = await Task.create(req.body);
      if (!task) {
        res.status(500).send({message: 'Task could not be created'});
      }
      return res.send({ data: { task }, code: 201 });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  //List task
  list: async (req, res) => {
    try {
      const tasks = await Task.find();
      return res.send({ data: tasks, code: 200 });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // View task
  view: async (req, res) => {
    try {
      const task = await Task.findById({
        _id: mongoose.Types.ObjectId(req.params.id),
      });
      if (!task) {
        res.status(404).send({message: 'Task not found'});
      }
      return res.send({ data: { task }, code: 200 });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // Update task
  update: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id)
      if (task.userId === req.body.userId) {
        await task.updateOne({ $set: req.body });
        res.status(200).send('Your task have been UPDATED successfully')
      } else {
        res.status(403).send("You don't have the right to UPDATE this task")
      }
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // Delete task
  delete: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id)
      if (task.userId === req.body.userId) {
        await task.deleteOne();
        res.status(200).send('Your task have been DELETED successfully')
      } else {
        res.status(403).send("You don't have the right to DELETE this task")
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }

};
