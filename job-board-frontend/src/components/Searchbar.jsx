import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Searchbar = ({ setFilters }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: text }));
  };

  return (
    <div className="w-full mx-auto px-2 md:px-4">
      <div className="relative">
        <input
          type="search"
          placeholder="Search jobs, Company..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full pl-6 pr-28 py-4 md:py-6 border border-gray-300 rounded-lg shadow-lg 
        focus:outline-[#5c73db] focus:ring focus:ring-[#5c73db] 
        hover:shadow-xl transition-all duration-300 text-base md:text-2xl"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 
        px-6 md:px-14 py-2 md:py-3 bg-[#5c73db] text-white text-base md:text-2xl font-semibold 
        rounded-xl hover:bg-[#4a5ec1] transition"
        >
          Search <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
