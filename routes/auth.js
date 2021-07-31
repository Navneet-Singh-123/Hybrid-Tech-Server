const express = require("express");
const router = express.Router();

// Controllers
const { register, registerActivate} = require("../controllers/auth");

// Validators
const { userRegisterValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);


module.exports = router;
