import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PostJob = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
    requirements: [""],
    jobType: "",
    experienceLevel: "",
  });

  const backendUrl = "http://localhost:4000";

  // ✅ Add/Remove Requirements
  const handleRequirementChange = (index, value) => {
    const updated = [...job.requirements];
    updated[index] = value;
    setJob({ ...job, requirements: updated });
  };

  const addRequirement = () => {
    setJob({ ...job, requirements: [...job.requirements, ""] });
  };

  const removeRequirement = (index) => {
    const updated = job.requirements.filter((_, i) => i !== index);
    setJob({ ...job, requirements: updated });
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${backendUrl}/api/job/createJob`, job, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("Job posted successfully!");
        setJob({
          title: "",
          description: "",
          location: "",
          salary: "",
          company: "",
          requirements: [""],
          jobType: "",
          experienceLevel: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#5c73db] mb-6">Post a Job</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl"
      >
        {/* Title */}
        <label className="block mb-4">
          <span className="font-medium">Job Title</span>
          <input
            type="text"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          />
        </label>

        {/* Company */}
        <label className="block mb-4">
          <span className="font-medium">Company</span>
          <input
            type="text"
            value={job.company}
            onChange={(e) => setJob({ ...job, company: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          />
        </label>

        {/* Location */}
        <label className="block mb-4">
          <span className="font-medium">Location</span>
          <input
            type="text"
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          />
        </label>

        {/* Salary */}
        <label className="block mb-4">
          <span className="font-medium">Salary</span>
          <input
            type="number"
            value={job.salary}
            onChange={(e) => setJob({ ...job, salary: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          />
        </label>

        {/* Job Type */}
        <label className="block mb-4">
          <span className="font-medium">Job Type</span>
          <select
            value={job.jobType}
            onChange={(e) => setJob({ ...job, jobType: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </label>

        {/* Experience Level */}
        <label className="block mb-4">
          <span className="font-medium">Experience Level</span>
          <select
            value={job.experienceLevel}
            onChange={(e) =>
              setJob({ ...job, experienceLevel: e.target.value })
            }
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="0-2 years">0-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
        </label>

        {/* Requirements */}
        <div className="mb-4">
          <span className="font-medium">Requirements</span>
          {job.requirements.map((req, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 px-4 py-2 bg-gray-200 rounded-md"
          >
            + Add Requirement
          </button>
        </div>

        {/* Description */}
        <label className="block mb-6">
          <span className="font-medium">Description</span>
          <textarea
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            rows="4"
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          />
        </label>

        <button
          type="submit"
          className="px-6 py-3 bg-[#5c73db] text-white rounded-md hover:bg-[#4a5ec1] transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
