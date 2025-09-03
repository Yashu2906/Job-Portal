import React from "react";
import CitySearchBox from "../config/CItySearchBox";

const Sidebar = () => {
  return (
    <div className="flex m-12 max-w-[20%]">
      <div className="w-full border-1 h-full p-7 flex flex-col gap-4">
        <p className="text-[24px]">Job Type</p>
        <div className="flex flex-wrap gap-4">
          <button className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105   hover:outline-none  cursor-pointer">
            Internship
          </button>
          <button className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105   hover:outline-none  cursor-pointer">
            Part-time
          </button>
          <button className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105   hover:outline-none  cursor-pointer">
            Full-time
          </button>
          <button className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105   hover:outline-none  cursor-pointer">
            Remote
          </button>
        </div>
        <div>
          <p className="text-[24px]">Location</p>
          <CitySearchBox />
        </div>
        <div>
          <p className="text-[24px]">Experience</p>
          <div className="flex flex-wrap gap-4">
            <button className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105   hover:outline-none  cursor-pointer">
              0-2 years
            </button>
            <button className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105   hover:outline-none  cursor-pointer">
              2-5 years
            </button>
            <button className="grow py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105   hover:outline-none  cursor-pointer">
              5+ years
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
