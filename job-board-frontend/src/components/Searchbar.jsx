import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Searchbar = ({ setFilters }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: text }));
  };

  return (
    <div className="w-full  mx-auto px-4">
      <div className="relative">
        {/* Input */}
        <input
          type="search"
          placeholder="Search jobs, Company..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full pl-8 py-6 border border-gray-300 rounded-lg shadow-lg 
            focus:outline-[#5c73db] focus:ring focus:ring-[#5c73db] 
            hover:shadow-xl transition-all duration-300 text-2xl"
        />

        {/* Button inside input */}
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 
            px-14 py-3 bg-[#5c73db] text-white text-2xl font-semibold 
            rounded-xl hover:bg-[#4a5ec1] transition"
        >
          Search <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
