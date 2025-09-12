import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backendUrl}/api/application/company`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setApplications(res.data.applications);
    } catch (error) {
      toast.error("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenResume = async (appId, resumeUrl) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${backendUrl}/api/application/${appId}/status`,
        { status: "reviewed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications();

      const downloadUrl = resumeUrl.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "resume");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Failed to download resume");
    }
  };

  const handleStatusUpdate = async (appId, status) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${backendUrl}/api/application/${appId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Application ${status}`);
      fetchApplications();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5c73db] mb-6 overflow-y-auto">
        Applications
      </h1>

      {loading ? (
        <p className="text-lg sm:text-xl">Loading applications...</p>
      ) : Object.keys(applications).length === 0 ? (
        <p className="text-lg sm:text-xl">
          No applications found for your jobs.
        </p>
      ) : (
        <div className="space-y-8">
          {Object.entries(applications).map(([jobTitle, apps]) => (
            <div
              key={jobTitle}
              className="bg-white border border-gray-400 p-4 sm:p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                {jobTitle}
              </h2>
              <div className="space-y-4">
                {apps.map((app) => (
                  <div
                    key={app._id}
                    className="p-4 sm:p-6 border border-gray-300 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    {/* Applicant Info */}
                    <div className="flex flex-col gap-2">
                      <p className="font-medium text-gray-700 text-base sm:text-lg md:text-xl">
                        {app.applicant?.name} ({app.applicant?.email})
                      </p>
                      <p className="text-base sm:text-lg text-gray-600">
                        Status:{" "}
                        <span className="capitalize font-semibold">
                          {app.status}
                        </span>
                      </p>
                      <p className="text-sm sm:text-base text-gray-500">
                        Applied on{" "}
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex  sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleOpenResume(app._id, app.resumeUrl)}
                        className="px-4 py-2 sm:px-6 sm:py-3 text-white text-sm sm:text-lg font-semibold rounded-lg bg-[#5c73db] hover:bg-[#4a5ec1] transition"
                      >
                        View Resume
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(app._id, "shortlisted")
                        }
                        className="px-4 py-2 sm:px-6 sm:py-3 text-white text-sm sm:text-lg font-semibold rounded-lg bg-green-500 hover:bg-green-600 transition"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        className="px-4 py-2 sm:px-6 sm:py-3 text-white text-sm sm:text-lg font-semibold rounded-lg bg-red-500 hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
