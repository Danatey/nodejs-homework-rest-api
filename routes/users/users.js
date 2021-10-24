const express = require("express");
const router = express.Router();

const { current, signup, login, logout } = require("../../controllers/users");
const guard = require("../../helpers/guard");

const { validationUser } = require("./validation");

router.get("/current", guard, current);
router.post("/signup", validationUser, signup);
router.post("/login", login);
router.post("/logout", guard, logout);

module.exports = router;
