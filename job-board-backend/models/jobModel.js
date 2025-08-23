const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    company: { type: String, required: true },
    requirements: { type: [String], required: true },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Internship"], required: true },
    experienceLevel: { type: String, enum: ["Fresher", "Mid", "Senior"], required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// ✅ Correct usage: check mongoose.models to prevent recompiling error
const jobModel = mongoose.models.job || mongoose.model("job", jobSchema);

module.exports = { jobModel };
