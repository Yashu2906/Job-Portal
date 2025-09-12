const applicationModel = require("../models/applicationModel");
const { jobModel } = require("../models/jobModel");

// Create Job Controller
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      company,
      requirements,
      jobType,
      experienceLevel,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !company ||
      !requirements ||
      !jobType ||
      !experienceLevel
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all details" });
    }

    if (req.user.role !== "Company") {
      return res.status(403).json({
        success: false,
        message: "Only company accounts can post a job",
      });
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
      status: true, 
    });

    await newJob.save();
    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GetJob Controller
const getJob = async (req, res) => {
  try {
    const { search, jobType, experienceLevel, location } = req.query;
    const query = { status: true }; 

    //  Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (jobType) {
      const jobTypes = jobType.split(","); 
      query.jobType = { $in: jobTypes };
    }

    if (experienceLevel) {
      const levels = experienceLevel.split(",");
      query.experienceLevel = { $in: levels };
    }

    if (location) {
      const locations = location.split(",");
      query.location = { $in: locations };
    }

    //  Fetch filtered jobs
    const jobs = await jobModel.find(query).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GetJob by Id contoller 
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findById(id);

    if (!job) {
      return res.status(500).json({ success: false, message: "Job not found" });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// My Jobs Controller
const getMyJobs = async (req, res) => {
  try {
    if (req.user.role !== "Company") {
      return res.status(403).json({
        success: false,
        message: "Only companies can view their jobs",
      });
    }

    const jobs = await jobModel
      .find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Company State Controller
const getCompanyStats = async (req, res) => {
  try {
    const jobs = await jobModel.find({ postedBy: req.user.id });
    const jobIds = jobs.map((job) => job._id);

    const applicationsCount = await applicationModel.countDocuments({
      jobId: { $in: jobIds },
    });

    const activeJobs = jobs.filter((job) => job.status === true).length;

    res.json({
      success: true,
      stats: {
        jobsPosted: jobs.length,
        applications: applicationsCount,
        activeJobs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createJob, getJob, getJobById, getMyJobs, getCompanyStats };
