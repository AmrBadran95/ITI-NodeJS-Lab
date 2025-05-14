const Joi = require("joi");

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = updateUserSchema;
