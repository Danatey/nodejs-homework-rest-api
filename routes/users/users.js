const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../../controllers/users");
const guard = require("../../helpers/guard");

const { validationUser } = require("./validation");

router.post("/signup", validationUser, signup);
router.post("/login", login);
router.post("/logout", guard, logout);

module.exports = router;
