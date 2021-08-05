const AWS = require("aws-sdk");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  registerEmailParams,
  forgotPasswordEmailParams,
} = require("../helpers/email");
const shortId = require("shortid");
const expressJwt = require("express-jwt");
const _ = require("lodash");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({
  apiVersion: "2010-12-01",
});

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: "User with this email does not exist, please register",
    });
  }
  if (!user.authenticate(password)) {
    return res.status(400).json({
      error: "Email and password do not match",
    });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const { _id, name, role } = user;
  return res.json({
    token,
    user: { _id, name, email, role },
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.authMiddleware = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  req.profile = user;
  next();
};

exports.adminMiddleware = async (req, res, next) => {
  const adminId = req.user._id;
  const user = await User.findById(adminId);
  if (!user) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  if (user.role !== "admin") {
    return res.status(400).json({
      error: "Admin resource, access denied",
    });
  }
  req.profile = user;
  next();
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: "User with this email does not exist",
    });
  }
  // Generate token and email it to the user
  const token = jwt.sign({ name: user.name }, process.env.JWT_RESET_PASSWORD, {
    expiresIn: "10m",
  });
  // Send it to user
  const params = forgotPasswordEmailParams(email, token);
  // Populate the db with this link
  return user.updateOne({ resetPasswordLink: token }, (err, success) => {
    if (err) {
      return res.status(400).json({
        error: "Password reset failed, try later",
      });
    }
    const sendEmail = ses.sendEmail(params).promise();
    sendEmail
      .then((data) => {
        console.log("SES reset password success: ", data);
        return res.json({
          message: `Email has been sent to ${email}, click on the link to reset your password`,
        });
      })
      .catch((err) => {
        console.log("SES reset password failed: ", err);
        return res.json({
          message: `We could not verify your email, try later`,
        });
      });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    // Check expiry
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      async (err, success) => {
        if (err) {
          return res.status(400).json({
            error: "Expired link, try again",
          });
        }

        var user = await User.findOne({ resetPasswordLink });
        if (!user) {
          return res.status(400).json({
            error: "Invalid token, try later",
          });
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: "",
        };

        user = _.extend(user, updatedFields);

        try {
          await user.save();
          return res.json({
            message:
              "Password updated! Now you can login with your new password",
          });
        } catch (error) {
          return res.status(400).json({
            error: "Password reset failed, try again",
          });
        }
      }
    );
  }
};
