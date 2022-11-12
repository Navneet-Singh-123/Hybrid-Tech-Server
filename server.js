const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

// Connect Database
connectDB();

// Define routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const linkRotues = require("./routes/link");

// Middlewares: App
app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL }));

// Middlewares: Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", linkRotues);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* Testing */
