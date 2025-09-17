import React from "react";
import Navbar from "../components/Navbar";
import JobPage from "./JobPage";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9faff]">
      <Navbar />
      <div className="flex-1">
        <JobPage />
      </div>
    </div>
  );
};

export default Home;
