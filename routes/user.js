const express = require("express");
const router = express.Router();

// Import validators

const { userUpdateValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

// Import from controllers

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
const { read, update } = require("../controllers/user");

// Routes

router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);

router.put(
  "/user",
  userUpdateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  update
);

module.exports = router;
