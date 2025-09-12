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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/4 border-r border-gray-200 h-full overflow-y-auto">
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Searchbar */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <Searchbar setFilters={setFilters} />
        </div>

        {/* Job Cards */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
          <JobCard filters={filters} />
          <div className="pb-16" />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
