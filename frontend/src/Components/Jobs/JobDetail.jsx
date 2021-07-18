import "./styles.scss";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getSingleJob } from "./getSingleJob";
import { GlobalContext } from "../../Context/global";
import { makeCommentData } from "../Freelancers/makeCommentData";

const initialCommentForm = {
  score: 3,
  message: "",
  error: null,
};

const JobDetail = () => {
  const { role, username, token } = useContext(GlobalContext);
  const [job, setJob] = useState();
  const [error, setError] = useState(null);
  const [commentForm, setCommentForm] = useState(initialCommentForm);
  const params = useParams();
  let skills;
  let jobDutiesBulletins;
  let passed;
  let inArray;

  useEffect(() => {
    getSingleJob(params.id, setJob);
  }, []);

  if (job !== undefined) {
    passed = new Date() > new Date(job.data.attributes.activeTill);
    skills = job.data.attributes.skills.split(", ");
    jobDutiesBulletins = job.data.attributes.jobDutiesBulletins.split(", ");
    inArray = job.data.attributes.applied.find(
      (applicant) => applicant === username
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://apizavrsni.udruga-liberato.hr/api/v1/comment",
        makeCommentData(
          job.data.id,
          null,
          username,
          commentForm.score,
          commentForm.message
        ),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => window.location.reload())
      .catch(() =>
        setCommentForm({
          score: commentForm.score,
          message: commentForm.message,
          error: true,
        })
      );
  };

  const deactivateModal = () => {
    window.location.reload();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://apizavrsni.udruga-liberato.hr/api/v1/job/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => deactivateModal())
      .catch(() => setError(true));
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
                      src={`http://apizavrsni.udruga-liberato.hr/${job.included[0].attributes.avatar}`}
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
                {role === "ROLE_USER" && inArray === undefined ? (
                  <div className="_jb_details01_last">
                    <ul className="_flex_btn">
                      <li>
                        <Link
                          to={`/apply-now/${params.id}`}
                          className="_applied_jb"
                          disabled={passed}
                        >
                          Apply Job
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderScore = (score) => {
    switch (score) {
      case 1:
      case 2:
        return (
          <small className="small font-weight-bold">
            Score: <p className="text-danger">{score}</p>
          </small>
        );
      case 3:
        return (
          <small className="small font-weight-bold">
            Score: <p className="text-primary">{score}</p>
          </small>
        );
      case 4:
      case 5:
        return (
          <small className="small font-weight-bold">
            Score: <p className="text-success d-inline">{score}</p>
          </small>
        );
      default:
        return "";
    }
  };

  const renderComments = () => {
    return (
      <div className="container mt-5">
        {job && (
          <div>
            {job.data.attributes.comments.map((comment) => {
              return (
                <div className="my-3">
                  <div className="gray-light rounded ">
                    <div className="row ml-1">
                      <p>Created by: </p>
                      <span className="text-primary">{comment.user}</span>
                      <small className="ml-3 text-muted">
                        {new Date(comment.createdAt).toDateString()}
                      </small>
                    </div>
                    <div className="ml-2  ">{renderScore(comment.score)}</div>
                    <div className="row-mt-1 ml-2">
                      <small className="text-muted">Message:</small>
                      <div className="row p-2 ml-1 small">
                        <p> {comment.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleCommentFormChange = (e) => {
    e.preventDefault();

    setCommentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const renderCommentForm = () => {
    return (
      <div className="container pb-3">
        <h6 className="text-muted text-uppercase pb-2">Comment form</h6>
        <form className="form-group" onSubmit={handleCommentSubmit}>
          <div className="row ">
            <div className="col-sm-3">
              <input
                type="number"
                name="score"
                id="score"
                className="form-control"
                placeholder="Score"
                min={0}
                max={5}
                step={1}
                value={commentForm.score}
                onChange={handleCommentFormChange}
              />
            </div>
            <div className="col-sm-9">
              <textarea
                name="message"
                id="message"
                className="form-control"
                placeholder="Your comment..."
                onChange={handleCommentFormChange}
                value={commentForm.message}
              />
            </div>
          </div>
          <button
            className="btn btn-outline-primary fa-pull-right mt-3"
            type="submit"
            onClick={handleCommentSubmit}
          >
            Comment
          </button>
        </form>
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
                  {inArray && renderCommentForm()}
                  {renderComments()}
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
                      <Link
                        to={`/apply-now/${params.id}`}
                        disabled={passed}
                        className="_applied_jb btn btn-outline-primary w-100"
                      >
                        Apply Job
                      </Link>
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
                      src={`http://apizavrsni.udruga-liberato.hr/${job.included[0].attributes.avatar}`}
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
                        {job.data.attributes.disableFriendly === true ? (
                          <span className="text-success">True</span>
                        ) : (
                          <span className="text-danger">False</span>
                        )}
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
      ) : (role === "ROLE_ADMIN" ||
          username === job.included[0].attributes.username) &&
        job.data.attributes.deletedAt === null ? (
        <>
          {renderHeader()}
          <div className="container pt-3">
            {error && (
              <h4 className="text-danger">
                Something went wrong with deactivation.
              </h4>
            )}
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
      ) : job.data.attributes.deletedAt === null ? (
        <>
          {renderHeader()}
          {renderBody()}
        </>
      ) : (
        <div className="deactivated">
          <h3 className="text-danger">This job is deactivated!</h3>
        </div>
      )}
    </>
  );
};

export default JobDetail;
