import React from "react";
import "./styles.scss";
import JobCard from "./JobCard";

const Jobs = () => {
  return (
    <>
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="ipt-title">Search Jobs</h2>
              <span className="ipn-subtitle">Browse All Jobs</span>
            </div>
          </div>
        </div>
      </div>
      <section className="gray-bg py-5">
        <div className="container">
          <div className="row">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
