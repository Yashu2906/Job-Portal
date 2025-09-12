const application = require("../models/applicationModel");
const { jobModel } = require("../models/jobModel");

// Company Applications controller
const getCompanyApplications = async (req, res) => {
  try {
    const jobs = await jobModel.find({ postedBy: req.user.id });

    if (!jobs.length) {
      return res.json({ success: true, applications: {} });
    }

    const jobIds = jobs.map((job) => job._id);

    const applications = await application
      .find({ jobId: { $in: jobIds } })
      .populate("jobId", "title location")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    const grouped = {};
    applications.forEach((app) => {
      const jobTitle = app.jobId?.title || "Unknown Job";
      if (!grouped[jobTitle]) {
        grouped[jobTitle] = [];
      }
      grouped[jobTitle].push(app);
    });

    res.json({ success: true, applications: grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCompanyApplications, 
};
