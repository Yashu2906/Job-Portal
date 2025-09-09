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
    <div className="flex flex-col md:flex-row">
      {/* Sidebar (Full width on mobile, 25% on desktop) */}
      <div className="w-full md:w-1/4">
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 md:p-6">
        <Searchbar setFilters={setFilters} />
        <JobCard filters={filters} />
      </div>
    </div>
  );
};

export default JobPage;
