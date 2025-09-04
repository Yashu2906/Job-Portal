import React, { useState } from "react";

const Searchbar = ({ setFilters }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: text }));
  };

  return (
    <div className="flex justify-center items-center mt-10 gap-4">
      <input
        type="search"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-[80%] px-4 py-5 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#5c73db]"
      />
      <button
        onClick={handleSearch}
        className="px-14 py-3 bg-[#5c73db] text-white text-[24px] font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
