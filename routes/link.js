const express = require("express");
const router = express.Router();

// Controllers
const { requireSignin, authMiddleware } = require("../controllers/auth");
const { create, list, read, update, remove } = require("../controllers/link");

// Validators
const {
  linkCreateValidator,
  linkUpdateValidator,
} = require("../validators/link");
const { runValidation } = require("../validators");

// Routes
router.post(
  "/link",
  linkCreateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  create
);

router.get("/links", list);
router.get("/link/:slug", read);

router.put(
  "/link/:slug",
  linkUpdateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  update
);

router.delete("/link/:slug", requireSignin, authMiddleware, remove);

module.exports = router;
