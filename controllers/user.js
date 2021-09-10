const User = require("../models/user");
const Link = require("../models/link");

exports.read = (req, res) => {
  User.findOne({ _id: req.user._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    Link.find({ postedBy: user._id })
      .populate("categories", "name slug")
      .populate("postedBy", "name")
      .sort({ createdAt: -1 })
      .exec((err, links) => {
        if (err) {
          return res.status(400).json({
            error: "Could not find links",
          });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({ user, links });
      });
  });
};
