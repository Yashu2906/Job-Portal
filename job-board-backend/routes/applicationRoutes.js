const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const {
  applyJob,
  getApplicationByJob,
  getUserApplications,
} = require("../controllers/applicationController");
const {
  getCompanyApplications,
} = require("../controllers/getCompanyApplications");
const applicationRouter = express.Router();

applicationRouter.post("/apply", userAuth, upload.single("resume"), applyJob);
applicationRouter.get("/company/:jobId", userAuth, getApplicationByJob);
applicationRouter.get("/user", userAuth, getUserApplications);
applicationRouter.get("/company", userAuth, getCompanyApplications);
module.exports = applicationRouter;
