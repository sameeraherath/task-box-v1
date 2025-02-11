const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require("passport"); // Import passport

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];

    let user = await User.findOne({ googleId: userId });

    if (!user) {
      user = await User.create({
        googleId: userId,
        name: payload["name"],
        email: payload["email"],
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

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

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    res.cookie("authToken", req.user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.json({ user: req.user.user });
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).send("Logged out");
});

module.exports = router;
