const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Set the JWT token in an HttpOnly cookie
    res.cookie("authToken", req.user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
