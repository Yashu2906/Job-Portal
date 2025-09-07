import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);
  const backendUrl = "http://localhost:4000";

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

  // Auto-update status when resume opened
  const handleOpenResume = async (appId, resumeUrl) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${backendUrl}/api/application/${appId}/status`,
        { status: "reviewed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications(); // refresh UI
      window.open(resumeUrl, "_blank"); // open resume
    } catch (error) {
      toast.error("Failed to mark as reviewed");
    }
  };

  // Manual status update
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
      <h1 className="text-3xl font-bold text-[#5c73db] mb-6">Applications</h1>

      {loading ? (
        <p>Loading applications...</p>
      ) : Object.keys(applications).length === 0 ? (
        <p className="text-lg">No applications found for your jobs.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(applications).map(([jobTitle, apps]) => (
            <div key={jobTitle} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {jobTitle}
              </h2>
              <div className="space-y-4">
                {apps.map((app) => (
                  <div
                    key={app._id}
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {app.applicant?.name} ({app.applicant?.email})
                      </p>
                      <p className="text-sm text-gray-500">
                        Status:{" "}
                        <span className="capitalize font-semibold">
                          {app.status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Applied on{" "}
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => handleOpenResume(app._id, app.resumeUrl)}
                        className="px-4 py-2 bg-[#5c73db] text-white rounded-md hover:bg-[#4a5ec1] transition"
                      >
                        View Resume
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(app._id, "shortlisted")
                        }
                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
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
