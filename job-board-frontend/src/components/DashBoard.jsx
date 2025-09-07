import React from "react";

const CompanyDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#5c73db] mb-6">Dashboard</h1>
      <p className="text-lg">
        Welcome to your company dashboard. Here you can manage jobs, view
        applications, and update your company profile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">Jobs Posted</h3>
          <p className="text-gray-600 text-lg mt-2">12</p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">Applications</h3>
          <p className="text-gray-600 text-lg mt-2">58</p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">Active Jobs</h3>
          <p className="text-gray-600 text-lg mt-2">4</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
