const express = require("express");
const router = express.Router();

const {
  current,
  signup,
  login,
  logout,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const upload = require("../../helpers/uploads");
const wrapError = require("../../helpers/errorHandler");

const { validationUser } = require("./validation");

router.get("/current", guard, current);
router.post("/signup", validationUser, signup);
router.post("/login", login);
router.post("/logout", guard, logout);

router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:verificationToken", wrapError(verifyUser));
router.post("/verify", repeatEmailForVerifyUser);

module.exports = router;
