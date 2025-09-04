import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import JobCard from "../components/JobCard";

const JobPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    jobType: "",
    experienceLevel: "",
    location: "",
  });

  return (
    <div className="flex">
      {/* Sidebar (20%) */}
      <Sidebar setFilters={setFilters} />

      {/* Main Content (80%) */}
      <div className="w-full p-6">
        <Searchbar setFilters={setFilters} />
        <JobCard filters={filters} />
      </div>
    </div>
  );
};

export default JobPage;
