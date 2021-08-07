const Category = require("../models/category");
const Link = require("../models/link");
const slugify = require("slugify");
const formidable = require("formidable");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");
const fs = require("fs");

// Configure S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.create = (req, res) => {
  const { name, image, content } = req.body;

  const base64Data = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = image.split(";")[0].split("/")[1];

  const slug = slugify(name);
  let category = new Category({
    name,
    content,
    slug,
  });

  // Upload to s3
  const params = {
    Bucket: "hybrid-tech",
    Key: `category/${uuidv4()}.${type}`,
    Body: base64Data,
    ACL: "public-read",
    ContentType: `image/${type}`,
    ContentEncoding: "base64",
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Upload to s3 failed",
      });
    }
    console.log("AWS data: ", data);
    category.image.url = data.Location;
    category.image.key = data.Key;
    category.postedBy = req.user._id;

    // Save to db
    try {
      const savedCategory = await category.save();
      return res.json(savedCategory);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Error saving image to the database, category already exists",
      });
    }
  });
};

// exports.create = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image upload failed",
//       });
//     }
//     const { name, content } = fields;
//     const { image } = files;
//     const slug = slugify(name);
//     let category = new Category({
//       name,
//       content,
//       slug,
//     });
//     if (image.size > 2000000) {
//       return res.status(400).json({
//         error: "Image should be less than 2MB",
//       });
//     }
//     // Upload to s3
//     const params = {
//       Bucket: "hybrid-tech",
//       Key: `category/${uuidv4()}`,
//       Body: fs.readFileSync(image.path),
//       ACL: "public-read",
//       ContentType: "image/jpg",
//     };

//     s3.upload(params, async (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({
//           error: "Upload to s3 failed",
//         });
//       }
//       console.log("AWS data: ", data);
//       category.image.url = data.Location;
//       category.image.key = data.Key;

//       // Save to db
//       try {
//         const savedCategory = await category.save();
//         return res.json(savedCategory);
//       } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//           error: "Error saving image to the database, category already exists",
//         });
//       }
//     });
//   });
// };

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({
      error: "Could not load categories",
    });
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  let { limit, skip } = req.query;
  console.log("Limit: ", limit, "Skip: ", skip);
  limit = limit ? parseInt(limit) : 3;
  skip = skip ? parseInt(skip) : 0; 

  let category, links;
  try {
    category = await Category.findOne({ slug }).populate(
      "postedBy",
      "_id name username"
    );
  } catch (error) {
    return res.status(400).json({
      error: "Could not load category",
    });
  }
  try {
    links = await Link.find({ categories: category })
      .populate("postedBy", "name username")
      .populate("categories", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
  } catch (error) {
    return res.status(400).json({
      error: "Could not load links for this category",
    });
  }
  return res.json({ category, links });
};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};
