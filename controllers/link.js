const Link = require("../models/link");
const slugify = require("slugify");

exports.create = async (req, res) => {
  const { title, url, categories, type, medium } = req.body;
  let link = new Link({ title, url, categories, type, medium });
  link.postedBy = req.user._id;
  try {
    const data = await link.save();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Error submitting link, duplicate entry",
    });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await Link.find({});
    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      error: "Could not fetch links",
    });
  }
};

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};

exports.clickCount = async (req, res) => {
  const { id } = req.body;
  try {
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return res.json(updatedLink);
  } catch (error) {
    return res.status(400).json({
      error: "Could not update view count",
    });
  }
};
