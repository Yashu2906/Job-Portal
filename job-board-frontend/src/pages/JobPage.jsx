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
      {/* Sidebar (Fixed height, scrolls separately if needed) */}
      <div className="w-full md:w-1/4 border-r border-gray-200 h-full overflow-y-auto">
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 flex flex-col h-full">
        {/* Searchbar (fixed at top of main content) */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <Searchbar setFilters={setFilters} />
        </div>

        {/* Job Cards (scrollable area) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
          <JobCard filters={filters} />
          {/* Spacer to prevent last card being cut */}
          <div className="pb-15" />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
