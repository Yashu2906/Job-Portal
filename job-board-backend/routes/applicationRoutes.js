const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const {
  applyJob,
  getApplicationByJob,
  getUserApplications,
} = require("../controllers/applicationController");
const applicationRouter = express.Router();

applicationRouter.post("/apply", userAuth, upload.single("resume"), applyJob);
applicationRouter.get("/company/:jobId", userAuth, getApplicationByJob);
applicationRouter.get("/user", userAuth, getUserApplications);
module.exports = applicationRouter;
