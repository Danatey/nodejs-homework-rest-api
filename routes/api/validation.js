const Joi = require("joi");

const schemaContacts = Joi.object({
  name: Joi.string().alphanum().min(5).max(25).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().optional(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "validate error",
    });
  }
};

module.exports.contactValidation = async (req, res, next) => {
  return await validate(schemaContacts, req.body, res, next);
};

module.exports.favoriteValidation = async (req, res, next) => {
  return await validate(schemaFavorite, req.body, res, next);
};
