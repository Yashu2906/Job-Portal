import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const JobCard = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);

  const backendUrl = "http://localhost:4000";

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/job`, {
        params: filters, // ✅ Send filters as query
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };

  const handleApply = async (jobId) => {
    if (!resume) {
      alert("Please upload your resume!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobId", jobId);

    try {
      const response = await axios.post(
        `${backendUrl}/api/application/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ send JWT token
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedJob(null);
        setResume(null);
      }
    } catch (error) {
      console.error("Error applying:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {jobs.map((job) => (
        <div key={job._id} className="p-6 border rounded-lg shadow-md">
          <h1 className="text-xl font-bold">{job.title}</h1>
          <p className="text-gray-600">
            {job.company} • {job.location}
          </p>
          <p className="mt-2">
            {job.jobType} • {job.salary}
          </p>
          <p className="text-sm italic">Posted {job.postedAgo}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setSelectedJob(job);
              }}
              className="px-4 py-2 bg-[#5c73db] text-white rounded-md"
            >
              View
            </button>
          </div>
          {selectedJob && (
            <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-xl w-[600px] max-h-[90vh] overflow-y-auto relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                >
                  ✖
                </button>

                {/* Job Title */}
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedJob.title}
                </h2>
                <p className="text-lg text-gray-600 mt-2">
                  {selectedJob.company} • {selectedJob.location}
                </p>

                {/* Job Info */}
                <div className="mt-4">
                  <p className="text-lg font-medium">
                    {selectedJob.jobType} • {selectedJob.salary}
                  </p>
                  <p className="text-sm italic text-gray-500">
                    Posted {selectedJob.postedAgo}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold">Job Description</h3>
                  <p className="mt-2 text-base text-gray-700 leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                {selectedJob.requirements && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold">Requirements</h3>
                    <p className="mt-2 text-base text-gray-700 leading-relaxed">
                      {selectedJob.requirements}
                    </p>
                  </div>
                )}

                {/* Resume Upload */}
                <div className="mt-6">
                  <label className="block text-lg font-medium text-gray-800">
                    Upload Resume:
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="mt-3 border border-gray-300 p-3 rounded-lg w-full text-base"
                  />
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => handleApply(selectedJob._id)}
                  className="mt-6 w-full px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobCard;
