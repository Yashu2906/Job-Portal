import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import PostJob from "./components/PostJob";
import MyJobs from "./components/MyJob";
import Applications from "./components/Applications";
import Profile from "./components/Profile";
import CompanyDashboard from "./components/DashBoard";
import CompanyLayout from "./pages/dashBoards/CompanyPanel";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
