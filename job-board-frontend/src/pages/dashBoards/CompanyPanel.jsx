import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CompanyLayout = () => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const handleNavClick = (name, path) => {
    setActive(name);
    navigate(path);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#5c73db] text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Company Panel</h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => handleNavClick("Dashboard", "/company")}
            className={`px-4 py-2 rounded-lg transition ${
              active === "Dashboard"
                ? "bg-white text-[#5c73db] font-bold"
                : "hover:bg-[#4a5ec1]"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick("Post Job", "/company/post-job")}
            className={`px-4 py-2 rounded-lg transition ${
              active === "Post Job"
                ? "bg-white text-[#5c73db] font-bold"
                : "hover:bg-[#4a5ec1]"
            }`}
          >
            Post Job
          </button>
          <button
            onClick={() => handleNavClick("My Jobs", "/company/my-jobs")}
            className={`px-4 py-2 rounded-lg transition ${
              active === "My Jobs"
                ? "bg-white text-[#5c73db] font-bold"
                : "hover:bg-[#4a5ec1]"
            }`}
          >
            My Jobs
          </button>
          <button
            onClick={() =>
              handleNavClick("Applications", "/company/applications")
            }
            className={`px-4 py-2 rounded-lg transition ${
              active === "Applications"
                ? "bg-white text-[#5c73db] font-bold"
                : "hover:bg-[#4a5ec1]"
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => handleNavClick("Profile", "/company/profile")}
            className={`px-4 py-2 rounded-lg transition ${
              active === "Profile"
                ? "bg-white text-[#5c73db] font-bold"
                : "hover:bg-[#4a5ec1]"
            }`}
          >
            Profile
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;
