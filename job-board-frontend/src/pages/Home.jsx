import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <div className="flex">
        <Sidebar />
        <JobCard />
      </div>
    </div>
  );
};

export default Home;
