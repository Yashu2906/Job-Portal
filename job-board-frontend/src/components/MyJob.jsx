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
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5c73db] mb-6">
        My Jobs
      </h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-lg sm:text-xl">You have not posted any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-5 sm:p-6 md:p-7 border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>

              <p className="text-lg sm:text-xl text-gray-500 mb-2 font-semibold">
                {job.company}
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-2">
                {job.location} • {job.jobType}
              </p>

              <p className="text-sm sm:text-md md:text-lg text-gray-700 mb-2 line-clamp-2">
                {job.description}
              </p>

              <p className="text-sm sm:text-base text-gray-600">
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
