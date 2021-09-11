const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {

  // Get a User
  view: async (req, res) => {
    try {
      const user = await User.findById({
        _id: mongoose.Types.ObjectId(req.params.id),
      });
      if (!user) {
        res.status(404).send({message: 'User not found'});
      }
      const { password, updatedAt, ...other } = user._doc
      return res.send({ data: { other }, code: 200 });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // Update User
  update: async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    if (req.body.userId === req.params.id) {

      if (req.body.password) {
        try {
          req.body.password = bcrypt.hashSync(req.body.password, 10)
        } catch (err) {
          return res.status(500).send(err);
        }
      }

      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).send({ message: 'Your account has been UPDATED successfully' })
      } catch (err) {
        return res.status(500).send(err);
      }

    } else {
      return res.status(403).send('You can only UPDATE your account!')
    }
  },

  
  // Delete User
  delete: async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    if (req.body.userId === req.params.id) {

      try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ message: 'Your account has been DELETED successfully' })
      } catch (err) {
        return res.status(500).send(err);
      }

    } else {
      return res.status(403).send('You can only DELETE your account!')
    }
  },
};