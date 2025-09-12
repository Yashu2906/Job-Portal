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
    <div className="m-4 md:m-8">
      <div className="w-full bg-white/70 py-6 md:py-10 backdrop-blur-md shadow-2xl rounded-2xl p-4 md:p-6 flex flex-col gap-6 md:gap-8 border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-[#7494ec] mb-2">
          Filters
        </h2>

        {/* Job Type */}
        <div>
          <p className="text-lg md:text-2xl font-semibold mb-3">Job Type</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {["Internship", "Part-time", "Full-time", "Remote"].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange("jobType", type)}
                className={`py-3 md:py-3 px-6 md:px-5 rounded-xl border text-lg md:text-xl font-medium transition-all duration-300 cursor-pointer
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
          <p className="text-lg md:text-2xl font-semibold mb-3">Location</p>
          <CitySearchBox
            onSelectCity={(city) => handleFilterChange("location", city)}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.location.map((city, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#eef2ff] text-[#4a5ec1] rounded-lg text-base"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="text-lg md:text-2xl font-semibold mb-3">Experience</p>
          <div className="flex flex-wrap gap-3">
            {["0-2 years", "2-5 years", "5+ years"].map((exp) => (
              <button
                key={exp}
                onClick={() => handleFilterChange("experienceLevel", exp)}
                className={`grow py-3 px-5  rounded-xl border text-xl font-medium transition-all duration-300 cursor-pointer
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
