const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      max: 256,
    },
    url: {
      type: String,
      trim: true,
      required: true,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    type: {
      type: String,
      default: "Free",
    },
    medium: {
      type: String,
      default: "Video",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);
