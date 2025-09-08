import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyDashboard = () => {
  const [stats, setStats] = useState({
    jobsPosted: 0,
    applications: 0,
    activeJobs: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token"); // or from context
      const res = await axios.get(
        "http://localhost:4000/api/job/company/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh every 10s for real-time effect
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#5c73db] mb-6">Dashboard</h1>
      <p className="text-2xl">
        Welcome to your company dashboard. Here you can manage jobs, view
        applications, and update your company profile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-8 border border-gray-300 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold">Jobs Posted</h3>
          <p className="text-[#5c73db] text-3xl mt-4">{stats.jobsPosted}</p>
        </div>

        <div className="p-8 border border-gray-300 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold">Applications</h3>
          <p className="text-[#5c73db] text-3xl mt-4">{stats.applications}</p>
        </div>

        <div className="p-8 border border-gray-300 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold">Active Jobs</h3>
          <p className="text-[#5c73db] text-3xl mt-4">{stats.activeJobs}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
