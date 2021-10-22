const express = require("express");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", guard, logout);

module.exports = router;
