import React from "react";
import CitySearchBox from "../config/CItySearchBox";

const Sidebar = ({ setFilters }) => {
  return (
    <div className="m-8 w-[px]">
      <div className="w-full bg-white/70 py-10 backdrop-blur-md shadow-2xl rounded-2xl p-6 flex flex-col gap-8 border border-gray-200">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#7494ec] mb-2">Filters</h2>

        {/* Job Type */}
        <div>
          <p className="text-2xl font-semibold mb-3">Job Type</p>
          <div className="flex flex-wrap gap-3">
            {["Internship", "Part-time", "Full-time", "Remote"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, jobType: type }))
                }
                className="grow py-3 px-5 rounded-xl border border-gray-300 shadow-sm text-xl font-medium bg-white hover:bg-[#7494ec] hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-2xl font-semibold mb-3">Location</p>
          <CitySearchBox
            onSelectCity={(city) =>
              setFilters((prev) => ({ ...prev, location: city }))
            }
          />
        </div>

        {/* Experience */}
        <div>
          <p className="text-2xl font-semibold mb-3">Experience</p>
          <div className="flex flex-wrap gap-3">
            {["0-2 years", "2-5 years", "5+ years"].map((exp) => (
              <button
                key={exp}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, experienceLevel: exp }))
                }
                className="grow py-3 px-5 rounded-xl border border-gray-300 shadow-sm text-xl font-medium bg-white hover:bg-[#7494ec] hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {exp}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
