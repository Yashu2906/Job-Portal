const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const {
  applyJob,
  getApplicationByJob,
  getUserApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const {
  getCompanyApplications,
} = require("../controllers/getCompanyApplications");
const roleMiddleWare = require("../middlewares/roleMiddleware");
const applicationRouter = express.Router();

applicationRouter.post("/apply", userAuth, upload.single("resume"), applyJob);
applicationRouter.get("/company/:jobId", userAuth, getApplicationByJob);
applicationRouter.get("/user", userAuth, getUserApplications);
applicationRouter.get("/company", userAuth, getCompanyApplications);
applicationRouter.patch(
  "/:id/status",
  userAuth,
  roleMiddleWare(["Company"]),
  updateApplicationStatus
);
module.exports = applicationRouter;
