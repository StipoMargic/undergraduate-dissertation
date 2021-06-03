import React, { useContext } from "react";
import "./styles.scss";
import JobCard from "./JobCard";
import { GlobalContext } from "../../Context/global";

const Jobs = () => {
  const { jobs } = useContext(GlobalContext);

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
            {jobs.map((job) => {
              return <JobCard key={job.id} id={job.id} job={job.attributes} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
