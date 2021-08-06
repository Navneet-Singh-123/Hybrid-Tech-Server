const express = require("express");
const router = express.Router();

// Controllers
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/category");

// Validators
const {
  categoryCreateValidator,
  categoryUpdateValidator,
} = require("../validators/category");
const { runValidation } = require("../validators");

// Routes
router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);

router.get("/categories", list);
router.get("/category/:slug", read);

router.put(
  "/category/:slug",
  categoryUpdateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  update
);

router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
