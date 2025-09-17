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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f9faff]">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 border-r border-gray-200 bg-white/80 backdrop-blur-md shadow-lg">
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Searchbar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md px-4 md:px-6 py-3">
          <Searchbar setFilters={setFilters} />
        </div>

        {/* Job Cards */}
        <div
          className="
            px-4 md:px-6 py-6 bg-[#f9faff]
            md:flex-1 md:overflow-y-auto md:min-h-0
          "
        >
          <JobCard filters={filters} />
          <div className="pb-20" />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
