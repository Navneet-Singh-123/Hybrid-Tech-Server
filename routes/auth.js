const express = require("express");
const router = express.Router();

// Controllers
const { register, registerActivate, login } = require("../controllers/auth");

// Validators
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");

// Routes
router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLoginValidator, runValidation, login);

module.exports = router;
