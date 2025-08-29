const application = require("../models/applicationModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const { jobModel } = require("../models/jobModel");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume is required" });
    }

    // Wrap Cloudinary upload_stream in a Promise
    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "Resumes" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    // Wait for Cloudinary upload
    const uploadResult = await uploadStream();

    // Save application in DB
    const newApp = new application({
      jobId: jobId,
      applicant: req.user.id,
      resumeUrl: uploadResult.secure_url,
    });

    const savedApp = await newApp.save();

    res.status(201).json({
      success: true,
      message: "Application submitted",
      application: savedApp,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getApplicationByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const applications = await application
      .find({ jobId })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await application
      .find({ applicant: userId })
      .populate("jobId", "title company location status")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { applyJob, getApplicationByJob, getUserApplications };
