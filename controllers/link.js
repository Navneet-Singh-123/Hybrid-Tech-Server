const Link = require("../models/link");
const slugify = require("slugify");
const Category = require("../models/category");
const User = require("../models/user");
const { linkPublishedParams } = require("../helpers/email");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({
  apiVersion: "2010-12-01",
});

exports.create = async (req, res) => {
  const { title, url, categories, type, medium } = req.body;
  // console.table({ title, url, categories, type, medium });
  const slug = url;
  let link = new Link({ title, url, categories, type, medium, slug });
  // posted by user
  link.postedBy = req.user._id;
  var data, users;
  try {
    data = await link.save();
    res.json(data);
  } catch (error) {
    return res.status(400).json({
      error: "Link already exist",
    });
  }

  try {
    users = await User.find({ categories: { $in: categories } });
  } catch (error) {
    console.log("Error finding users to send email on link publish");
    throw new Error(error);
  }

  try {
    const result = await Category.find({ _id: { $in: categories } });
    data.categories = result;
  } catch (error) {
    console.log("Error finding categories to send email on link publish");
  }

  for (let i = 0; i < users.length; i++) {
    const params = linkPublishedParams(users[i].email, data);
    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
      .then((success) => {
        console.log("Email submitted through SES: ", success);
        return;
      })
      .catch((failure) => {
        console.log("Error on email submitted through SES: ", failure);
        return;
      });
  }
};

exports.list = async (req, res) => {
  let { limit, skip } = req.query;
  console.log("Limit: ", limit, "Skip: ", skip);
  limit = limit ? parseInt(limit) : 10;
  skip = skip ? parseInt(skip) : 0;

  try {
    const data = await Link.find({})
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json(data);
  } catch (error) {
    return res.status(400).json({
      error: "Could not list links",
    });
  }
};

exports.read = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Link.findOne({ _id: id });
    res.json(data);
  } catch (error) {
    return res.status(400).json({
      error: "Error finding link",
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, url, categories, type, medium } = req.body;
  const updatedLink = { title, url, categories, type, medium };
  try {
    const updated = await Link.findOneAndUpdate({ _id: id }, updatedLink, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    return res.status(400).json({
      error: "Error updating the link",
    });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Link.findOneAndRemove({ _id: id });
    res.json({
      message: "Link removed successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error removing the link",
    });
  }
};

exports.clickCount = async (req, res) => {
  const { linkId } = req.body;
  try {
    const result = await Link.findByIdAndUpdate(
      linkId,
      { $inc: { clicks: 1 } },
      { upsert: true, new: true }
    );
    res.json(result);
  } catch (error) {
    return res.status(400).json({
      error: "Could not update view count",
    });
  }
};

exports.popular = async (req, res) => {
  console.log("called");

  try {
    const links = await Link.find()
      .populate("postedBy", "name")
      .sort({ clicks: -1 })
      .limit(3);
    return res.json(links);
  } catch (error) {
    return res.status(400).json({
      error: "Links not found",
    });
  }
};

exports.popularInCategory = async (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  var category, links;
  try {
    category = await Category.findOne({ slug });
  } catch (error) {
    return res.status(400).json({
      error: "Could not load categories",
    });
  }
  try {
    links = await Link.find({ categories: category })
      .sort({ clicks: -1 })
      .limit(3);
  } catch (error) {
    return res.status(400).json({
      error: "Links not found",
    });
  }
  res.json(links);
};
