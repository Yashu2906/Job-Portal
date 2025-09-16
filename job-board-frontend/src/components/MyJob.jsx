import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backendUrl}/api/job/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setJobs(res.data.jobs);
        } else {
          toast.error("Failed to fetch jobs");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <div className="px-4 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-[#5c73db] mb-4">
        My Jobs
      </h1>

      {loading ? (
        <p className="text-sm text-gray-600">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-base text-gray-600">
          You have not posted any jobs yet.
        </p>
      ) : (
        // Scrollable container
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="p-4 border border-gray-200 bg-white rounded-md shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {job.title}
                </h2>

                <p className="text-sm font-medium text-gray-600 mb-1">
                  {job.company}
                </p>

                <p className="text-xs text-gray-500 mb-1">
                  {job.location} • {job.jobType}
                </p>

                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {job.description}
                </p>

                <p className="text-xs text-gray-500">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
