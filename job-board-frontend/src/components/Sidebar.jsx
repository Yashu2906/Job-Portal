import React from "react";
import CitySearchBox from "../config/CItySearchBox";

const Sidebar = ({ filters, setFilters }) => {
  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const currentValues = prev[category] || [];

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [category]: [...currentValues, value] };
      }
    });
  };

  const isSelected = (category, value) => {
    return filters[category]?.includes(value);
  };

  return (
    <div className="m-3 md:m-6">
      <div className="w-full bg-white/70 py-4 md:py-6 backdrop-blur-md shadow-lg rounded-xl p-3 md:p-4 flex flex-col gap-4 md:gap-6 border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-[#7494ec] mb-1">
          Filters
        </h2>

        {/* Job Type */}
        <div>
          <p className="text-base md:text-lg font-semibold mb-2">Job Type</p>
          <div className="flex flex-wrap gap-2">
            {["Internship", "Part-time", "Full-time", "Remote"].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange("jobType", type)}
                className={`py-2 px-4 rounded-lg border text-sm md:text-base font-medium transition-all duration-300 cursor-pointer
              ${
                isSelected("jobType", type)
                  ? "bg-[#7494ec] text-white shadow-md border-[#7494ec]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-[#7494ec] hover:text-white"
              }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-base md:text-lg font-semibold mb-2">Location</p>
          <CitySearchBox
            onSelectCity={(city) => handleFilterChange("location", city)}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.location.map((city, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#eef2ff] text-[#4a5ec1] rounded-md text-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="text-base md:text-lg font-semibold mb-2">Experience</p>
          <div className="flex flex-wrap gap-2">
            {["0-2 years", "2-5 years", "5+ years"].map((exp) => (
              <button
                key={exp}
                onClick={() => handleFilterChange("experienceLevel", exp)}
                className={`grow py-2 px-4 rounded-lg border text-sm md:text-base font-medium transition-all duration-300 cursor-pointer
                  ${
                    isSelected("experienceLevel", exp)
                      ? "bg-[#7494ec] text-white shadow-md border-[#7494ec]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-[#7494ec] hover:text-white"
                  }`}
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
