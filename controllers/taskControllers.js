const Task = require('../model/taskModel.js');
const mongoose = require('mongoose');


module.exports = {
  create: async (req, res) => {
    try {
      const task = await Task.create({ title: req.body.title, description: req.body.description });
      if (!task) {
        res.status(404).json({message: 'Task could not be created'});
      }
      return res.send({ data: { task }, code: 201 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const tasks = await Task.find();
      return res.send({ data: tasks, code: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  view: async (req, res) => {
    try {
      const task = await Task.findById({
        _id: mongoose.Types.ObjectId(req.params.id),
      });
      if (!task) {
        res.status(404).json({message: 'Task not found'});
      }
      return res.send({ data: { task }, code: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      task = await Task.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
        req.body,
        {
          new: true,
        },
      );
      if (!task) {
        res.status(404).json({message: 'Task not found'});
      }

      task.save();

      return res.send({ data: { task }, code: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  delete: async (req, res) => {
    try {
      const task = await Task.findOneAndRemove(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
        }
      );
      if (!task) {
        res.status(404).json({message: 'Task not found'});
      }
      return res.send({ data: 'Task deleted successfully', code: 204 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
