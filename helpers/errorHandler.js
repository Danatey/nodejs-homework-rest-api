const { HttpCode } = require("../config/HttpCode");

const wrapper = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case "ValidationError":
        res.status(HttpCode.OK).json({
          status: "error",
          code: HttpCode.OK,
          message: "Validation error",
        });
        break;
      case "CustomError":
        res.status(error.status).json({
          status: "error",
          code: HttpCode.BAD_REQUEST,
          message: "CustomError",
        });
        break;
      default:
        next(error);
        break;
    }
  }
};

module.exports = wrapper;
