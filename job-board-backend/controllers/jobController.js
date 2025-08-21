const jobModel = require("../models/jobModel");

const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, company, requirements, jobType, experienceLevel } = req.body;

    if (!title || !description || !location || !salary || !company || !requirements || !jobType || !experienceLevel) {
      return res.status(400).json({ success: false, message: "Please fill all details" });
    }

    if (req.user.role !== "Company") {
      return res.status(403).json({ success: false, message: "Only company accounts can post a job" });
    }

    const newJob = new jobModel({
      title,
      description,
      requirements,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      postedBy: req.user._id,
      status: "pending",
    });

    await newJob.save();

    return res.status(201).json({ success: true, message: "Job created successfully", job: newJob });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createJob;
