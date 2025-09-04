import React, { useEffect, useState } from "react";
import axios from "axios";

const JobCard = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const backendUrl = "http://localhost:4000";

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/job`, {
        params: filters, // ✅ Send filters as query
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {jobs.map((job) => (
        <div key={job._id} className="p-6 border rounded-lg shadow-md">
          <h1 className="text-xl font-bold">{job.title}</h1>
          <p className="text-gray-600">
            {job.company} • {job.location}
          </p>
          <p className="mt-2">
            {job.jobType} • {job.salary}
          </p>
          <p className="text-sm italic">Posted {job.postedAgo}</p>
          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 border rounded-md">View</button>
            <button className="px-4 py-2 bg-[#5c73db] text-white rounded-md">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCard;
