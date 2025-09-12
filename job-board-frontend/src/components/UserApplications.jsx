import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token"); // auth token
        const res = await axios.get(`${backendUrl}/api/application/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="px-4 sm:px-8 lg:ml-20 w-full mx-auto mt-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-[#7494ec]">
          My Applications
        </h2>
        {applications.length === 0 ? (
          <p className="text-gray-600 text-base sm:text-lg">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {applications.map((app) => (
              <div
                key={app._id}
                className="p-4 sm:p-6 shadow-2xl rounded-2xl border border-gray-300 
                w-full sm:w-[48%] lg:w-[20%] bg-white"
              >
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                    {app.jobId?.title || "Job Title"}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                    {app.jobId?.company} • {app.jobId?.location}
                  </p>
                  <p className="mt-2 text-sm sm:text-base lg:text-lg">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={
                        app.status === "shortlisted"
                          ? "text-green-600"
                          : app.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      {app.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApplications;
