import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
    <div className="max-h-[80vh] overflow-y-auto p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-[#5c73db] mb-4">
        Applications
      </h1>

      {loading ? (
        <p className="text-base sm:text-lg">Loading applications...</p>
      ) : Object.keys(applications).length === 0 ? (
        <p className="text-base sm:text-lg">
          No applications found for your jobs.
        </p>
      ) : (
        <div className="space-y-4 overflow-y-auto no-scrollbar">
          {Object.entries(applications).map(([jobTitle, apps]) => (
            <div
              key={jobTitle}
              className="bg-white border border-gray-300 p-3 sm:p-4 rounded-lg shadow-md"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                {jobTitle}
              </h2>
              <div className="space-y-3">
                {apps.map((app) => (
                  <div
                    key={app._id}
                    className="p-3 border border-gray-200 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    {/* Applicant Info */}
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-gray-700 text-sm sm:text-base">
                        {app.applicant?.name} ({app.applicant?.email})
                      </p>
                      <p className="text-sm text-gray-600">
                        Status:{" "}
                        <span className="capitalize font-semibold">
                          {app.status}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Applied on{" "}
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleOpenResume(app._id, app.resumeUrl)}
                        className="px-3 py-1 text-xs sm:text-sm text-white font-semibold rounded bg-[#5c73db] hover:bg-[#4a5ec1] transition"
                      >
                        View Resume
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(app._id, "shortlisted")
                        }
                        className="px-3 py-1 text-xs sm:text-sm text-white font-semibold rounded bg-green-500 hover:bg-green-600 transition"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        className="px-3 py-1 text-xs sm:text-sm text-white font-semibold rounded bg-red-500 hover:bg-red-600 transition"
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
