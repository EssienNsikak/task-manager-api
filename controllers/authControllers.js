const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  // Signup
  register: async (req, res) => {
    try {      
      const newUser = new User({
        ...req.body,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });

      // save user and return response
      
      const user = await newUser.save();
      res.status(201).json(user)
      
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json('User not found!')
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        res.status(400).json('Invalid Password!')
      }

      res.status(200).json(user);
      
    } catch (err) {
      res.status(500).json(err);
    }
  },

};