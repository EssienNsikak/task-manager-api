const Joi = require('@hapi/joi');
const User = require('../models/User');


module.exports = {
  validateRegisterNewUser: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email().lowercase()
        .max(50),
      password: Joi.string().required().min(6).max(25),
      profilePicture: Joi.string().optional()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  },

  validateLoginUser: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required().email().lowercase()
        .max(50),
      password: Joi.string().required().min(6).max(25)
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  },
};
