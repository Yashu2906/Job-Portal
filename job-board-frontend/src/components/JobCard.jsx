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

  // ✅ Helper function to calculate "Posted X days ago"
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

  // JobCard.jsx
  const fetchJobs = async () => {
    try {
      const queryParams = {
        ...filters,
        jobType: filters.jobType.join(","), // ✅ fix
        experienceLevel: filters.experienceLevel.join(","), // ✅ fix
        location: filters.location.join(","), // ✅ fix
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

  const handleApply = async (jobId) => {
    if (!resume) {
      alert("Please upload your resume!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobId", jobId);

    try {
      setLoading(true); // start loader
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="p-6 sm:p-8 border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.001] bg-white"
        >
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-[#5c73db] mb-2">
            {job.title}
          </h1>

          <p className="text-xl sm:text-lg lg:text-[24px] text-gray-600 mb-2">
            {job.company} • {job.location}
          </p>

          <p className="text-md sm:text-base lg:text-xl text-gray-700 mb-3">
            <span className="font-semibold">Type:</span> {job.jobType} <br />
            <span className="font-semibold">Salary:</span> {job.salary} /month
          </p>

          <p className="text-md sm:text-sm lg:text-lg italic text-gray-500">
            Posted {getPostedAgo(job.createdAt)}
          </p>

          <div className="mt-4 sm:mt-5">
            <button
              onClick={() => setSelectedJob(job)}
              className="w-full py-3 sm:py-4 bg-[#5c73db] text-white text-lg sm:text-lg lg:text-xl font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
            >
              View Details <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
      ))}

      {selectedJob && (
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 ">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-[95%] sm:w-[80%] lg:w-[50%] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-[gray-500] hover:text-black text-3xl"
            >
              ✖
            </button>

            <h2 className="text-4xl text-[#5c73db] font-bold mb-5">
              {selectedJob.title}
            </h2>
            <p className="text-2xl text-gray-600 mt-2">
              {selectedJob.company}
              {"  "} • {selectedJob.location} • {selectedJob.jobType}
            </p>

            <div className="mt-4">
              <p className="text-xl font-medium">
                Salary : {selectedJob.salary}/month
              </p>
              <p className="text-lg italic text-gray-500">
                Posted {getPostedAgo(selectedJob.createdAt)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-3xl font-semibold">Job Description</h3>
              <p className="mt-2 text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>

            {selectedJob.requirements && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold">Requirements</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {(Array.isArray(selectedJob.requirements)
                    ? selectedJob.requirements
                    : selectedJob.requirements.split("\n")
                  ).map((req, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#eef2ff] text-[#4a5ec1] text-base font-medium rounded-lg shadow-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Upload */}
            <div className="mt-6">
              <label className="block text-xl font-medium text-gray-800 mb-3">
                Upload Resume:
              </label>

              <div className="flex items-center justify-between border  rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition">
                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />

                <label
                  htmlFor="resumeUpload"
                  className="cursor-pointer px-5 py-2 bg-[#5c73db] text-white font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
                >
                  Choose File
                </label>

                {/* Show selected file name */}
                <span className="ml-4 text-gray-600 text-lg truncate">
                  {resume ? resume.name : "No file chosen"}
                </span>
              </div>

              <p className="mt-2 text-lg text-gray-500">
                Accepted formats: .pdf, .doc, .docx
              </p>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => handleApply(selectedJob._id)}
              disabled={loading} // disable when loading
              className="mt-6 w-full cursor-pointer px-5 py-5 bg-[#5c73db] text-white text-xl font-bold rounded-xl hover:bg-[#4a5ec1] transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6 text-white"
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
