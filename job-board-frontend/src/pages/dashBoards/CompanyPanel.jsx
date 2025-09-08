import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const CompanyLayout = () => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const handleNavClick = (name, path) => {
    setActive(name);
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-[18%] bg-[#5c73db] text-white flex flex-col p-6 rounded-2xl">
          <h2 className="flex justify-center text-3xl font-bold mb-6">
            Company Panel
          </h2>
          <nav className="flex flex-col gap-6 ">
            <button
              onClick={() => handleNavClick("Dashboard", "/company")}
              className={` py-4 rounded-xl text-xl font-semibold transition ${
                active === "Dashboard"
                  ? "bg-white text-[#5c73db] font-bold"
                  : "hover:bg-[#4a5ec1]"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick("Post Job", "/company/post-job")}
              className={`py-4 rounded-xl text-xl font-semibold transition ${
                active === "Post Job"
                  ? "bg-white text-[#5c73db] font-bold"
                  : "hover:bg-[#4a5ec1]"
              }`}
            >
              Post Job
            </button>
            <button
              onClick={() => handleNavClick("My Jobs", "/company/my-jobs")}
              className={`py-4 rounded-xl text-xl font-semibold transition ${
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
              className={`py-4 rounded-xl text-xl font-semibold transition ${
                active === "Applications"
                  ? "bg-white text-[#5c73db] font-bold"
                  : "hover:bg-[#4a5ec1]"
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => handleNavClick("Profile", "/company/profile")}
              className={`py-4 rounded-xl text-xl font-semibold transition ${
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
    </div>
  );
};

export default CompanyLayout;
