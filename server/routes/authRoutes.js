const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require("passport");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route to handle Google OAuth login
router.post("/google", async (req, res) => {
  const { credential } = req.body;
  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];

    // Check if user exists in the database
    let user = await User.findOne({ googleId: userId });

    // If user does not exist, create a new user
    if (!user) {
      user = await User.create({
        googleId: userId,
        name: payload["name"],
        email: payload["email"],
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in a cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error verifying Google ID token:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// Route to handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Set the token in a cookie
    res.cookie("authToken", req.user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.json({ user: req.user.user });
  }
);

// Route to handle logout
router.post("/logout", (req, res) => {
  // Clear the auth token cookie
  res.clearCookie("authToken");
  res.status(200).send("Logged out");
});

module.exports = router;
