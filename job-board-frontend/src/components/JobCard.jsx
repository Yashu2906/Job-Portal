import React from "react";

const JobCard = () => {
  return (
    <div className="m-12 ml-0 border-1 h-auto w-[80%] flex">
      <div className=" border-1  mx-5 my-6 ">
        <div>
          <h1>Title</h1>
          <p>Company Name --- Location</p>
          <p>JobType --- Salary</p>
          <p>Posted x days ago</p>
        </div>
        <div>
          <button>View</button>
          <button>Apply now</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
