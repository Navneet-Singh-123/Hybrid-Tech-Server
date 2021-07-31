const AWS = require("aws-sdk");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { registerEmailParams } = require("../helpers/email");
const shortId = require("shortid");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({
  apiVersion: "2010-12-01",
});

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Generate jwt token
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );

    // Send email
    const params = registerEmailParams(email, token);

    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        console.log("email submitted to SES", data);
        res.json({
          message: `Email has been sent to ${email}, follow the instructions to complete your registration`,
        });
      })
      .catch((error) => {
        console.log("ses email on register", error);
        res.json({
          message: "We could not verify your email, please try again",
        });
      });
  });
};

exports.registerActivate = (req, res) => {
  const { token } = req.body;
  jwt.verify(
    token,
    process.env.JWT_ACCOUNT_ACTIVATION,
    function (err, decoded) {
      if (err) {
        return res.status(401).json({
          error: "Link is expired, please try again",
        });
      }
      const { name, email, password } = jwt.decode(token);
      const username = shortId.generate();
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          return res.status(401).json({
            error: "User already exists with this email",
          });
        }
        // Register new user
        const newUser = new User({
          username,
          name,
          email,
          password,
        });

        newUser.save((err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Error saving user in the database, try later",
            });
          }
          return res.json({
            message: "Registration successful, please login",
          });
        });
      });
    }
  );
};
