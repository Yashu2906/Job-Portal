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
      const token = localStorage.getItem("token");
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
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5c73db] mb-4 sm:mb-6">
        Dashboard
      </h1>

      {/* Welcome message */}
      <p className="text-base sm:text-lg lg:text-2xl text-gray-700">
        Welcome to your company dashboard. Here you can manage jobs, view
        applications, and update your company profile.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
        <div className="p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg shadow-md bg-white text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Jobs Posted
          </h3>
          <p className="text-[#5c73db] text-2xl sm:text-3xl lg:text-4xl mt-2 sm:mt-4">
            {stats.jobsPosted}
          </p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg shadow-md bg-white text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Applications
          </h3>
          <p className="text-[#5c73db] text-2xl sm:text-3xl lg:text-4xl mt-2 sm:mt-4">
            {stats.applications}
          </p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg shadow-md bg-white text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Active Jobs
          </h3>
          <p className="text-[#5c73db] text-2xl sm:text-3xl lg:text-4xl mt-2 sm:mt-4">
            {stats.activeJobs}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
