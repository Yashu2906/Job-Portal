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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
    <div className="max-h-[80vh] overflow-y-auto px-4 sm:px-6 md:px-10">
      <h1 className="text-xl sm:text-2xl font-bold text-[#5c73db] mb-4">
        Post a Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Side */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm sm:text-base">Job Title</span>
            <input
              type="text"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm sm:text-base">Company</span>
            <input
              type="text"
              value={job.company}
              onChange={(e) => setJob({ ...job, company: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm sm:text-base">Location</span>
            <input
              type="text"
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm sm:text-base">Salary</span>
            <input
              type="number"
              value={job.salary}
              onChange={(e) => setJob({ ...job, salary: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
              required
            />
          </label>

          {/* Requirements */}
          <div>
            <span className="text-sm sm:text-base">Requirements</span>
            {job.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) =>
                    handleRequirementChange(index, e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="px-4 py-1 bg-[#5c73db] text-white text-sm font-bold rounded-md"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="mt-2 px-4 py-2 bg-[#5c73db] text-white text-sm rounded-md"
            >
              + Add Requirement
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm sm:text-base">Job Type</span>
            <select
              value={job.jobType}
              onChange={(e) => setJob({ ...job, jobType: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
              required
            >
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm sm:text-base">Experience Level</span>
            <select
              value={job.experienceLevel}
              onChange={(e) =>
                setJob({ ...job, experienceLevel: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
              required
            >
              <option value="">Select</option>
              <option value="0-2 years">0-2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm sm:text-base">Description</span>
            <textarea
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              rows="4"
              className="w-full mt-1 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-400"
              required
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4 mb-20">
          <button
            type="submit"
            className="px-10 sm:px-12 py-2 bg-[#5c73db] text-white text-sm sm:text-base font-semibold rounded-md hover:bg-[#4a5ec1] transition"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
