import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = "http://localhost:4000";

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
      <h1 className="text-3xl font-bold text-[#5c73db] mb-6">My Jobs</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-lg">You have not posted any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-500 text-sm mb-2">
                {job.location} • {job.jobType}
              </p>
              <p className="text-gray-700 mb-2 line-clamp-2">
                {job.description}
              </p>
              <p className="text-sm text-gray-400">
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
