const express = require("express");
const router = express.Router();

// Controller functions
const { register } = require("../controllers/auth");

router.get("/register", register);

module.exports = router;
