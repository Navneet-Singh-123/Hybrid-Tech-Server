const { check } = require("express-validator");

exports.categoryCreateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("image").not().isEmpty().withMessage("Image is required"),
  check("content")
    .isLength({ min: 20 })
    .withMessage("Content is required and should be atleast 20 characters longs"),
];

exports.categoryUpdateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("content")
    .isLength({ min: 20 })
    .withMessage(
      "Content is required and should be atleast 20 characters long"
    ),
];
