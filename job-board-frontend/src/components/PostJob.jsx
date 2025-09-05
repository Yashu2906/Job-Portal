import React, { useState } from "react";

const PostJob = () => {
  const [job, setJob] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", job);
    alert("Job posted successfully!");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#5c73db] mb-6">Post a Job</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-xl"
      >
        <label className="block mb-4">
          <span className="font-medium">Job Title</span>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Location</span>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Job Type</span>
          <select
            name="type"
            value={job.type}
            onChange={(e) => setJob({ ...job, type: e.target.value })}
            className="w-full mt-2 px-4 py-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Internship">Internship</option>
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
          </select>
        </label>

        <label className="block mb-6">
          <span className="font-medium">Description</span>
          <textarea
            name="description"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            rows="4"
            className="w-full mt-2 px-4 py-2 border rounded-md"
          ></textarea>
        </label>

        <button
          type="submit"
          className="px-6 py-3 bg-[#5c73db] text-white rounded-md hover:bg-[#4a5ec1] transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
