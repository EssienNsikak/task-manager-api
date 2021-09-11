const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  // Signup
  register: async (req, res) => {
    try {      
      const newUser = new User({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });

      // save user and return response
      
      const user = await newUser.save();
      return res.send({ data: { user }, code: 201 });
        
    } catch (err) {
      res.status(500).send(err);
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).send({ message: 'User not found!' })
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        res.status(400).send({ message: 'Invalid login credentials!' })
      }

      return res.send({ data: { user }, code: 200 });
          
    } catch (err) {
      res.status(500).send(err);
    }
  },

};