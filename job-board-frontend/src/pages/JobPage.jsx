import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import JobCard from "../components/JobCard";

const JobPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    jobType: [],
    experienceLevel: [],
    location: [],
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar (hidden on mobile, visible on desktop) */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 md:w-1/3 lg:w-1/4 xl:w-1/5
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Overlay when sidebar is open (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity z-10 md:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-md px-4 md:px-6 py-3 flex justify-between items-center">
          {/* Mobile filter button */}
          <button
            className="md:hidden px-4  py-1 bg-[#5c73db] hover:bg-[#4a5ec1] transition text-white rounded-lg shadow"
            onClick={() => setSidebarOpen(true)}
          >
            Filters
          </button>
          <Searchbar setFilters={setFilters} />
        </div>

        {/* Job Cards (scrollable only here) */}
        <div
          className="flex-1 overflow-y-auto min-h-0
          bg-[#f9faff] px-4 md:px-6 py-6 no-scrollbar"
        >
          <JobCard filters={filters} />
          <div className="pb-20" />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
