const mongoose = require("mongoose");


// Application model
const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job", required: true },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    resumeUrl: { type: String, required: true },

    status: {
      type: String,
      enum: ["submitted", "reviewed", "shortlisted", "rejected"],
      default: "submitted",
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("application", applicationSchema);
