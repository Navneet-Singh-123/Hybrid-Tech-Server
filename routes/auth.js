const express = require("express");
const router = express.Router();

// Controllers
const { register } = require("../controllers/auth");

// Validators
const { userRegisterValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

router.post("/register", userRegisterValidator, runValidation, register);

module.exports = router;
