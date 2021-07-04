import React, { useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import { GlobalContext } from "../../Context/global";

const Jobs = () => {
  const { jobs, role } = useContext(GlobalContext);
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
          {role === "ROLE_EMPLOYER" ? (
            <Link to="/add-job">
              <button className="mb-4 btn btn-primary btn-lg" type="button">
                Add job
              </button>
            </Link>
          ) : (
            ""
          )}
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
