const express = require("express");
const router = express.Router();

const { login, regenerateAccessToken, logout } = require("../controllers/auth");

router.post("/login", login);
router.put("/logout", logout);
router.post("/token", regenerateAccessToken);

module.exports = router;
