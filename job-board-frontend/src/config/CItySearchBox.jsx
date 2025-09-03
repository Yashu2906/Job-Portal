import React, { useState, useEffect } from "react";

const CitySearchBox = () => {
  const [query, setQuery] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Load JSON from public folder
  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => setAllCities(data))
      .catch((err) => console.error("Error loading cities:", err));
  }, []);

  const handleChange = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    // filter only top 5 matches
    const results = allCities.filter((item) =>
      item.city.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestions(results.slice(0, 5));
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search Indian city..."
        className="w-full px-4 py-3 border rounded-lg shadow-md"
      />

      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
          {suggestions.map((city, i) => (
            <li
              key={i}
              onClick={() => {
                setQuery(`${city.city}, ${city.country}`);
                setSuggestions([]);
              }}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {city.city}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearchBox;
