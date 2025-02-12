const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5002;

app.use(
  cors({
    origin: "https://task-box-v1-client.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// Routes for authentication
app.use("/auth", authRoutes);
// Secure Task Routes
app.use("/tasks", authMiddleware, taskRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
