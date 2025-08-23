const { jobModel } = require("../models/jobModel");

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
      status: false, // default false (pending approval)
    });

    await newJob.save();
    return res.status(201).json({ success: true, message: "Job created successfully", job: newJob });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    const { search, jobType, experienceLevel, location } = req.query; // use query for filters
    const query = { status: true }; // only approved jobs

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } }
      ];
    }

    if (jobType) query.jobType = jobType;
    if (experienceLevel) query.experienceLevel = experienceLevel;
    if (location) query.location = location;

    const jobs = await jobModel.find(query).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createJob, getJob };
