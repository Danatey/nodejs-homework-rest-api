const multer = require("multer");
const { HttpCode } = require("../config/HttpCode");

require("dotenv").config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const limitsFieldSize = 2000000;

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: limitsFieldSize },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }

    // Вы можете всегда вернуть ошибку, если что-то пошло не так:
    cb(new Error(HttpCode.BAD_REQUEST, "Wrong format for avatar"));
  },
});

module.exports = upload;
