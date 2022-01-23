const express = require("express");
const router = express.Router();

// Import validators

const {
  linkCreateValidator,
  linkUpdateValidator,
} = require("../validators/link");
const { runValidation } = require("../validators");

// Import from controllers

const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
  canUpdateDeleteLink,
} = require("../controllers/auth");
const {
  create,
  list,
  read,
  update,
  remove,
  clickCount,
  popular,
  popularInCategory,
} = require("../controllers/link");

// Routes

router.post(
  "/link",
  linkCreateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  create
);

router.get("/links", requireSignin, adminMiddleware, list);
router.get("/link/popular", popular);
router.get("/link/popular/:slug", popularInCategory);
router.get("/link/:id", read);

router.put("/click-count", clickCount);
router.put(
  "/link/:id",
  linkUpdateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  canUpdateDeleteLink,
  update
);
router.put(
  "/link/admin/:id",
  linkUpdateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  update
);

router.delete(
  "/link/:id",
  requireSignin,
  authMiddleware,
  canUpdateDeleteLink,
  remove
);
router.delete("/link/admin/:id", requireSignin, adminMiddleware, remove);

module.exports = router;
