import React from "react";
import CitySearchBox from "../config/CItySearchBox";

const Sidebar = ({ setFilters }) => {
  return (
    <div className="flex m-12 max-w-[20%]">
      <div className="w-full border-1 h-full p-7 flex flex-col gap-4">
        <p className="text-[24px]">Job Type</p>
        <div className="flex flex-wrap gap-4">
          {["Internship", "Part-time", "Full-time", "Remote"].map((type) => (
            <button
              key={type}
              onClick={() => setFilters((prev) => ({ ...prev, jobType: type }))}
              className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {type}
            </button>
          ))}
        </div>

        <div>
          <p className="text-[24px]">Location</p>
          <CitySearchBox
            onSelectCity={(city) =>
              setFilters((prev) => ({ ...prev, location: city }))
            }
          />
        </div>

        <div>
          <p className="text-[24px]">Experience</p>
          <div className="flex flex-wrap gap-4">
            {["0-2 years", "2-5 years", "5+ years"].map((exp) => (
              <button
                key={exp}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, experienceLevel: exp }))
                }
                className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
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
