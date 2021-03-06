import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import JobCard from "./JobCard";
import { GlobalContext } from "../../Context/global";
import FilterOptions from "../FilterOptions";
import { jobFilterOptions } from "./jobFilterOptions";
import { COMPANY } from "../../Constants/roles";

const initialPagination = {
  start: 0,
  end: 9,
  page: 1,
};

const Jobs = () => {
  const { jobs, role } = useContext(GlobalContext);
  const [pagination, setPagination] = useState(initialPagination);
  const history = useHistory();
  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start + 9,
      end: prev.end + 9,
      page: prev.page + 1,
    }));
  };

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      start: prev.start - 9,
      end: prev.end - 9,
      page: prev.page - 1,
    }));
  };

  const activeJobs = jobs.filter((job) => job.attributes.deletedAt === null);

  useEffect(() => {
    if (role === COMPANY) history.push("/");
  }, []);
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

      <FilterOptions options={jobFilterOptions} type="jobs" />
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
            {activeJobs.slice(pagination.start, pagination.end).map((job) => (
              <JobCard key={job.id} id={job.id} job={job.attributes} />
            ))}
          </div>

          <div className="row justify-content-center mb-2">
            {pagination.start > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="btn btn-outline-info btn-lg mr-3"
              >
                Previous
              </button>
            )}

            {activeJobs.length > pagination.end && (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-outline-primary btn-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
        {activeJobs.length > 0 ? (
          <div className="row justify-content-center">
            You are on page {pagination.page} out of{" "}
            {parseInt(Math.ceil(activeJobs.length / 9), 10)}.
          </div>
        ) : (
          <p className="text-center text-info">No results...</p>
        )}
      </section>
    </>
  );
};

export default Jobs;
