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
        {/* Input */}
        <input
          type="search"
          placeholder="Search jobs, Company..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full pl-4 pr-28 py-2 md:py-3 border border-gray-300 rounded-lg shadow-md
          focus:outline-[#5c73db] focus:ring focus:ring-[#5c73db] 
          hover:shadow-lg transition-all duration-300 text-sm md:text-base"
        />

        {/* Button */}
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 
          px-4 md:px-6 py-1.5 md:py-2 bg-[#5c73db] text-white text-sm md:text-base font-semibold 
          rounded-lg hover:bg-[#4a5ec1] transition"
        >
          Search <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
