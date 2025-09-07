const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createJob,
  getJob,
  getJobById,
  getMyJobs,
  getCompanyStats,
} = require("../controllers/jobController");
const roleMiddleWare = require("../middlewares/roleMiddleware");

const jobRouter = express.Router();

jobRouter.post(
  "/createJob",
  authMiddleware,
  roleMiddleWare(["Company"]),
  createJob
);
jobRouter.get("/my", authMiddleware, getMyJobs);
jobRouter.get(
  "/company/stats",
  authMiddleware,
  roleMiddleWare(["Company"]),
  getCompanyStats
);

jobRouter.get("/", getJob);
jobRouter.get("/:id", getJobById);

module.exports = jobRouter;
