import React from "react";
import Navbar from "../components/Navbar";

import JobPage from "./JobPage";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <JobPage />
      </div>
    </div>
  );
};

export default Home;
