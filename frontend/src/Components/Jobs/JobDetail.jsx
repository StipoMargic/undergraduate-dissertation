import "./styles.scss";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getSingleJob } from "./getSingleJob";
import { GlobalContext } from "../../Context/global";

const JobDetail = () => {
  const { role, username, token } = useContext(GlobalContext);
  const [job, setJob] = useState();
  const params = useParams();
  let skills;
  let jobDutiesBulletins;
  let passed;
  useEffect(() => {
    getSingleJob(params.id, setJob);
  }, []);

  if (job !== undefined) {
    passed = new Date() > new Date(job.data.attributes.activeTill);
    skills = job.data.attributes.skills.split(", ");
    jobDutiesBulletins = job.data.attributes.jobDutiesBulletins.split(", ");
  }

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://127.0.0.1:8000/api/v1/job/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => console.log("succes"))
      .catch((err) => console.log(err));
  };

  const renderHeader = () => {
    return (
      <div className="page-title search-form dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="_jb_details01">
                <div className="_jb_details01_flex">
                  <div className="_jb_details01_authors">
                    <img
                      src={`http://127.0.0.1:8000/${job.included[0].attributes.avatar}`}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="_jb_details01_authors_caption">
                    <h4 className="jbs_title">
                      {job.data.attributes.jobPositionName}
                      <img
                        src="assets/img/verify.svg"
                        className="ml-1"
                        width="12"
                        alt=""
                      />
                    </h4>
                    <ul className="jbx_info_list">
                      <li>
                        <span>
                          <i className="ti-briefcase" />
                          {job.included[0].attributes.username}
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-credit-card" />
                          {job.data.attributes.salary}
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-location-pin" />
                          {job.included[0].attributes.address},
                          {job.included[0].attributes.city}
                        </span>
                      </li>
                    </ul>
                    <ul className="jbx_info_list">
                      <li>
                        <div className="jb_types fulltime">
                          {job.data.attributes.typeOfPosition}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {role === "ROLE_USER" && (
                  <div className="_jb_details01_last">
                    <ul className="_flex_btn">
                      <li>
                        <button
                          type="submit"
                          className="_applied_jb"
                          disabled={passed}
                        >
                          Apply Job
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12">
                <div className="_job_detail_box my-5 p-5 shadow-lg">
                  <div className="_job_detail_single">
                    <h4>Job Summary</h4>
                    <p>{job.data.attributes.jobSummary}</p>
                  </div>

                  <div className="_job_detail_single">
                    <h4>Job Duties:</h4>
                    <p>{job.data.attributes.jobDutiess}</p>
                    <ul>
                      {jobDutiesBulletins.map((bulletin) => {
                        return (
                          <li key={bulletin}>
                            <FontAwesomeIcon icon={faChevronRight} />
                            {bulletin}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {skills.length && (
                    <div className="_job_detail_single">
                      <h4>Skill & Experience</h4>
                      <ul>
                        {skills.map((skill) => {
                          return (
                            <li key={skill}>
                              <FontAwesomeIcon icon={faChevronRight} />
                              {skill}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  {role === "ROLE_USER" ? (
                    <div className="_job_detail_single flexeo">
                      <button
                        type="button"
                        disabled={passed}
                        className="_applied_jb btn btn-outline-primary w-100"
                      >
                        Apply Job
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  {!role && (
                    <h6>
                      Login as Freelancer to be able to apply for this job!
                    </h6>
                  )}
                </div>
              </div>

              <div className="col-lg-4 col-md-12 col-sm-12 mt-5">
                <div className="_jb_summary">
                  <div className="_jb_summary_thumb">
                    <img
                      src={`http://127.0.0.1:8000/${job.included[0].attributes.avatar}`}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="_jb_summary_caption">
                    <h4>{job.included[0].attributes.username}</h4>
                  </div>
                  <div className="_jb_summary_body">
                    <ul>
                      <li>
                        Company Industry:
                        <span>{job.included[0].attributes.occupation}</span>
                      </li>
                      <li>
                        Email:<span>{job.included[0].attributes.email}</span>
                      </li>
                      <li>
                        Phone<span>{job.included[0].attributes.phone}</span>
                      </li>
                      <li>
                        Location
                        <span>
                          {job.included[0].attributes.address},{" "}
                          {job.included[0].attributes.city}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="_jb_summary">
                  <h4>Job Explain</h4>
                  <ul>
                    <li>
                      Company:<span>{job.included[0].attributes.username}</span>
                    </li>
                    <li>
                      Vacancy:<span>{job.data.attributes.vacancy} Open</span>
                    </li>
                    <li>
                      Post Date:
                      <span>
                        {new Date(job.data.attributes.createdAt).toDateString()}
                      </span>
                    </li>
                    <li>
                      Expire Date:
                      <span className={passed ? "text-danger" : "text-success"}>
                        {new Date(
                          job.data.attributes.activeTill
                        ).toDateString()}
                      </span>
                    </li>
                    <li>
                      Location:<span>{job.data.attributes.location}</span>
                    </li>
                    <li>
                      Salary:<span>{job.data.attributes.salary}</span>
                    </li>
                    <li>
                      Disabled Friendly:
                      <span>
                        {job.data.attributes.disableFriendly === true
                          ? "true"
                          : "false"}
                      </span>
                    </li>
                    <li>
                      Hours:<span>{job.data.attributes.hours}/week</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      {job === undefined ? (
        "Loading"
      ) : username === job.included[0].attributes.username ? (
        <>
          {renderHeader()}
          <div className="container pt-3">
            <button
              type="submit"
              className="btn btn-lg btn-danger"
              onClick={handleDelete}
            >
              Deactivate
            </button>
          </div>
          {renderBody()}
        </>
      ) : (
        <>
          {renderHeader()}
          {renderBody()}
        </>
      )}
    </>
  );
};

export default JobDetail;
