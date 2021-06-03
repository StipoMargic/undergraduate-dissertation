import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getSingleJob } from "./getSingleJob";

const JobDetail = () => {
  const [job, setJob] = useState();
  const params = useParams();
  let skills;
  useEffect(() => {
    getSingleJob(params.id, setJob);
  }, []);

  if (job !== undefined) skills = job.data.attributes.skills.split(" | ");

  const renderDetail = () => {
    return (
      <>
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

                  <div className="_jb_details01_last">
                    <ul className="_flex_btn">
                      <li>
                        <a
                          href={`mailto:${job.included[0].attributes.email}`}
                          className="_applied_jb"
                        >
                          Apply Job
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    <p>
                      We&apos;re looking for someone with the creative spark,
                      eye for illustration and design, passion for graphics and
                      ability to produce high quality design collaterals
                      end-to-end.
                    </p>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Draft mockups of website designs, brochures,
                        iconography, and any other marketing materials required
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Collaborate with marketing teams and management to
                        discuss which mockups are effective, and use their
                        feedback to develop final drafts
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Revise the work of previous designers to create a
                        unified aesthetic for our brand materials
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Work on multiple projects at once, and consistently meet
                        draft deadlines
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Communicate frequently with clients to update them on
                        the progress of the project and to answer any questions
                        they might have
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Work on multiple projects at once, and consistently meet
                        draft deadlines
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        can start the part time job/internship between 4th
                        Mar&apos;21 and 8th Apr&apos;21
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        have already graduated or are currently in any year of
                        study
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Revise the work of previous designers to create a
                        unified aesthetic for our brand materials
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faChevronRight} />
                        Other duties as requested
                      </li>
                    </ul>
                  </div>

                  {skills.length && (
                    <div className="_job_detail_single">
                      <h4>Skill & Experience</h4>
                      <ul>
                        {skills.map((skill) => {
                          return (
                            <li>
                              <FontAwesomeIcon icon={faChevronRight} />
                              {skill}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  <div className="_job_detail_single flexeo">
                    <a
                      href={`mailto:${job.included[0].attributes.email}`}
                      className="_applied_jb btn btn-outline-primary w-100"
                    >
                      Apply Job
                    </a>
                  </div>
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
                      Post Date:<span>{job.data.attributes.createdAt}</span>
                    </li>
                    <li>
                      Expire Date:<span>{job.data.attributes.activeTill}</span>
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
  return <>{job !== undefined ? renderDetail() : "Loading"}</>;
};

export default JobDetail;
