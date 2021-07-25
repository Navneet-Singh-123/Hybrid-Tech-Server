const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Define routes
const authRoutes = require("./routes/auth");

// Middlewares: App
app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL }));

// Middlewares: Routes
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
