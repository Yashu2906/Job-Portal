import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaBars } from "react-icons/fa";

const CompanyLayout = () => {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (name, path) => {
    setActive(name);
    navigate(path);
    setSidebarOpen(false); // close sidebar on mobile
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#5c73db] text-white transform 
          transition-transform duration-300 lg:static lg:translate-x-0 rounded-none lg:rounded-2xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h2 className="flex justify-center text-2xl sm:text-3xl font-bold p-6">
            Company Panel
          </h2>
          <nav className="flex flex-col gap-2 sm:gap-4 p-4">
            {[
              { name: "Dashboard", path: "/company" },
              { name: "Post Job", path: "/company/post-job" },
              { name: "My Jobs", path: "/company/my-jobs" },
              { name: "Applications", path: "/company/applications" },
              { name: "Profile", path: "/company/profile" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name, item.path)}
                className={`py-3 sm:py-4 rounded-xl text-base sm:text-lg lg:text-xl font-semibold transition 
                  ${
                    active === item.name
                      ? "bg-white text-[#5c73db] font-bold"
                      : "hover:bg-[#4a5ec1]"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 backdrop-blur-xs bg-transparent z-30 lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-100 overflow-y-auto">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mb-4 flex text-xl items-center gap-2 text-[#5c73db] font-semibold"
          >
            <FaBars /> Menu
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;
