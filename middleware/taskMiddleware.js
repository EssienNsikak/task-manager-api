const Joi = require('@hapi/joi');

module.exports = {
  validateCreateTask(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      userId: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error && error.details && error.details.length > 0) {
      const { key } = error.details[0].context;
      const { message } = error.details[0];
      res.status(403).send({ status: 403, key, msg: message });
    } else {
      next();
    }
  },

  validateUpdateTask(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      userId: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error && error.details && error.details.length > 0) {
      const { key } = error.details[0].context;
      const { message } = error.details[0];
      res.status(403).send({ status: 403, key, msg: message });
    } else {
      next();
    }
  },
};
