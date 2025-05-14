const joi = require("joi");

const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const signupValidationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .max(15)
    .pattern(passwordPattern)
    .messages({
      "string.pattern.base": "Password is too weak",
    })
    .messages({
      "object.unknown": "Unknown field",
    }),
});

module.exports = signupValidationSchema;
