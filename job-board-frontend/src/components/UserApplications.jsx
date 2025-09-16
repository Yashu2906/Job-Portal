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
        const token = localStorage.getItem("token");
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

  if (loading) return <p className="text-center text-sm">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="px-3 sm:px-6 lg:ml-16 w-full mx-auto mt-6">
        <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold mb-4 text-[#7494ec]">
          My Applications
        </h2>
        {applications.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {applications.map((app) => (
              <div
                key={app._id}
                className="p-3 sm:p-4 shadow-md rounded-xl border border-gray-200 
                w-full sm:w-[45%] lg:w-[18%] bg-white"
              >
                <div>
                  <h3 className="text-base sm:text-lg lg:text-lg font-semibold mb-1">
                    {app.jobId?.title || "Job Title"}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                    {app.jobId?.company} • {app.jobId?.location}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm lg:text-base">
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
