const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String, required: false },
    status: {
      type: String,
      enum: ["submitted", "reviewed", "shortlisted", "rejected"],
      default: "submitted",
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
