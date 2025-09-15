import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const JobCard = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Posted time helper
  const getPostedAgo = (date) => {
    const postedDate = new Date(date);
    const diffMs = Date.now() - postedDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // ✅ Fetch jobs
  const fetchJobs = async () => {
    try {
      const queryParams = {
        ...filters,
        jobType: filters.jobType.join(","),
        experienceLevel: filters.experienceLevel.join(","),
        location: filters.location.join(","),
      };

      const response = await axios.get(`${backendUrl}/api/job`, {
        params: queryParams,
      });

      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };

  // ✅ Apply
  const handleApply = async (jobId) => {
    if (!resume) {
      alert("Please upload your resume!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobId", jobId);

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/application/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="p-4 sm:p-5 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform bg-white"
        >
          <h1 className="text-lg sm:text-xl font-bold text-[#5c73db] mb-1">
            {job.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-1">
            {job.company} • {job.location}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Type:</span> {job.jobType} <br />
            <span className="font-semibold">Salary:</span> {job.salary}/month
          </p>

          <p className="text-xs italic text-gray-500">
            Posted {getPostedAgo(job.createdAt)}
          </p>

          <div className="mt-3">
            <button
              onClick={() => setSelectedJob(job)}
              className="w-full py-2 bg-[#5c73db] text-white text-sm font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
            >
              View Details <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-xl w-[95%] sm:w-[80%] lg:w-[50%] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              ✖
            </button>

            <h2 className="text-2xl text-[#5c73db] font-bold mb-3">
              {selectedJob.title}
            </h2>
            <p className="text-base text-gray-600 mb-2">
              {selectedJob.company} • {selectedJob.location} •{" "}
              {selectedJob.jobType}
            </p>

            <div className="mb-3">
              <p className="text-sm font-medium">
                Salary: {selectedJob.salary}/month
              </p>
              <p className="text-xs italic text-gray-500">
                Posted {getPostedAgo(selectedJob.createdAt)}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Job Description</h3>
              <p className="mt-1 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>

            {selectedJob.requirements && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Requirements</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(Array.isArray(selectedJob.requirements)
                    ? selectedJob.requirements
                    : selectedJob.requirements.split("\n")
                  ).map((req, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#eef2ff] text-[#4a5ec1] text-xs font-medium rounded-md shadow-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Upload Resume:
              </label>

              <div className="flex items-center justify-between border rounded-lg p-2 bg-white shadow-sm hover:shadow-md transition">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />

                <label
                  htmlFor="resumeUpload"
                  className="cursor-pointer px-3 py-1.5 bg-[#5c73db] text-white text-sm font-semibold rounded-md hover:bg-[#4a5ec1] transition"
                >
                  Choose File
                </label>

                <span className="ml-2 text-gray-600 text-xs truncate">
                  {resume ? resume.name : "No file chosen"}
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Accepted formats: .pdf, .doc, .docx
              </p>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => handleApply(selectedJob._id)}
              disabled={loading}
              className="mt-4 w-full px-4 py-2 bg-[#5c73db] text-white text-sm font-bold rounded-lg hover:bg-[#4a5ec1] transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Applying...
                </>
              ) : (
                "Apply Now"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
