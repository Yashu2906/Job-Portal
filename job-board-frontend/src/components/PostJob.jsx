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
    <div className="flex flex-col px-4 sm:px-6 lg:px-10 overflow-y-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5c73db] mb-6">
        Post a Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
      >
        {/* Left Side */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-lg sm:text-xl lg:text-2xl">Job Title</span>
            <input
              type="text"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl border rounded-md border-gray-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-lg sm:text-xl lg:text-2xl">Company</span>
            <input
              type="text"
              value={job.company}
              onChange={(e) => setJob({ ...job, company: e.target.value })}
              className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl border rounded-md border-gray-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-lg sm:text-xl lg:text-2xl">Location</span>
            <input
              type="text"
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
              className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl border rounded-md border-gray-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-lg sm:text-xl lg:text-2xl">Salary</span>
            <input
              type="number"
              value={job.salary}
              onChange={(e) => setJob({ ...job, salary: e.target.value })}
              className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl border rounded-md border-gray-400"
              required
            />
          </label>

          {/* Requirements */}
          <div>
            <span className="text-lg sm:text-xl lg:text-2xl">Requirements</span>
            {job.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) =>
                    handleRequirementChange(index, e.target.value)
                  }
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl border rounded-md border-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="px-4 sm:px-5 py-1 sm:py-2 bg-[#5c73db] text-white text-lg sm:text-xl font-bold rounded-md cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="mt-3 px-4 sm:px-5 py-2 sm:py-3 bg-[#5c73db] text-white rounded-lg cursor-pointer"
            >
              + Add Requirement
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-lg sm:text-xl lg:text-2xl">Job Type</span>
            <select
              value={job.jobType}
              onChange={(e) => setJob({ ...job, jobType: e.target.value })}
              className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl border rounded-md border-gray-400"
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
            <span className="text-lg sm:text-xl lg:text-2xl">
              Experience Level
            </span>
            <select
              value={job.experienceLevel}
              onChange={(e) =>
                setJob({ ...job, experienceLevel: e.target.value })
              }
              className="w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl border rounded-md border-gray-400"
              required
            >
              <option value="">Select</option>
              <option value="0-2 years">0-2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </label>

          <label className="block">
            <span className="text-lg sm:text-xl lg:text-2xl">Description</span>
            <textarea
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              rows="5"
              className="w-full text-base sm:text-lg lg:text-xl mt-2 px-3 py-2 sm:px-4 sm:py-3 border rounded-md border-gray-400"
              required
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 lg:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="px-10 sm:px-16 lg:px-20 py-3 sm:py-4 bg-[#5c73db] text-white text-lg sm:text-xl font-bold rounded-xl hover:bg-[#4a5ec1] transition cursor-pointer"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
