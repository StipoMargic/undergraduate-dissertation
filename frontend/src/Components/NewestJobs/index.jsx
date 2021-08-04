import React, { useContext } from "react";
import "./styles.scss";
import { GlobalContext } from "../../Context/global";
import Job from "./job";
import FreelancerCard from "../Freelancers/FreelancerCard";

const NewestJob = () => {
  const { jobs, portfolios, role } = useContext(GlobalContext);
  const activeJobs = jobs.filter((job) => job.attributes.deletedAt === null);

  const renderJobs = () => {
    return (
      <>
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Newest <span className="theme-cl-2">Jobs</span>
              </h2>
              <p>Browse through our newest Job listings!</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {jobs.length === 0 && (
            <h6 className="text-muted">Waiting for ads to load...</h6>
          )}
          {activeJobs.slice(0, 8).map((job) => {
            return (
              <Job
                image={job.attributes.logo}
                key={job.id}
                id={job.id}
                name={job.attributes.name}
                typeOfPosition={job.attributes.typeOfPosition}
                position={job.attributes.jobPositionName}
              />
            );
          })}
        </div>
      </>
    );
  };

  const renderPortfolios = () => {
    return (
      <>
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Newest <span className="theme-cl-2">Portfolios</span>
              </h2>
              <p>Browse through our newest Portfolios listings!</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {portfolios.length === 0 && (
            <h6 className="text-muted">Waiting for ads to load...</h6>
          )}
          {portfolios.slice(0, 7).map((portfolio) => {
            if (portfolio.attributes.deletedAt === null) {
              return (
                <FreelancerCard
                  id={portfolio.id}
                  key={portfolio.id}
                  portfolio={portfolio.attributes}
                />
              );
            }
            return null;
          })}
        </div>
      </>
    );
  };

  return (
    <section className="min-sec">
      <div className="container">
        {role === "ROLE_EMPLOYER" ? renderPortfolios() : renderJobs()}
      </div>
    </section>
  );
};
export default NewestJob;
