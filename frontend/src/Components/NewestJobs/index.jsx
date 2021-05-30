import React, { useContext } from "react";
import "./styles.scss";
import { GlobalContext } from "../../Context/global";
import Job from "./job";

const NewestJob = () => {
  const { jobs } = useContext(GlobalContext);

  return (
    <section className="min-sec">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Top Featured <span className="theme-cl-2">Jobs</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {jobs.slice(0, 8).map((job) => {
            return (
              <Job
                key={job.id}
                id={job.id}
                name={job.attributes.name}
                position={job.attributes.jobPositionName}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default NewestJob;
