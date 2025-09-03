import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <Sidebar />
    </div>
  );
};

export default Home;
