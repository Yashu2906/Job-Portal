const express = require("express");
const { register, login } = require("../controllers/authController");
const userAuth = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = authRouter;
