const application = require("../models/applicationModel");
const { jobModel } = require("../models/jobModel");

// Group applications for all jobs posted by a company
const getCompanyApplications = async (req, res) => {
  try {
    // Step 1: Find all jobs created by logged-in company
    const jobs = await jobModel.find({ postedBy: req.user.id });

    if (!jobs.length) {
      return res.json({ success: true, applications: {} });
    }

    const jobIds = jobs.map((job) => job._id);

    // Step 2: Find applications for these jobs
    const applications = await application
      .find({ jobId: { $in: jobIds } })
      .populate("jobId", "title location")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    // Step 3: Group applications by job
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
  getCompanyApplications, // ✅ export it
};
