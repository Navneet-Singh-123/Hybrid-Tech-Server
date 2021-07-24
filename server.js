const express = require("express");
const app = express();

// Define routes
const authRoutes = require("./routes/auth");

// Middlewares
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
