const Joi = require("joi");
const reqularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { HttpCode } = require("../../config/HttpCode");

const schemaUser = Joi.object({
  password: Joi.string().alphanum().min(5).max(25).required(),
  email: Joi.string().pattern(new RegExp(reqularEmail)).required(),
  subscription: Joi.string().alphanum(),
  token: Joi.string().alphanum(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(HttpCode).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Ошибка от Joi или другой библиотеки валидации",
    });
  }
};

module.exports.validationUser = async (req, res, next) => {
  return await validate(schemaUser, req.body, res, next);
};
