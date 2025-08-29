const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const { applyJob } = require("../controllers/applicationController");
const applicationRouter = express.Router();

applicationRouter.post("/apply", userAuth, upload.single("resume"), applyJob);

module.exports = applicationRouter;
