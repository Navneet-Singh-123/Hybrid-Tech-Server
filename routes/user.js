const express = require("express");
const router = express.Router();

// Controllers
const { read } = require("../controllers/user");
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

// Routes
router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);

module.exports = router;
