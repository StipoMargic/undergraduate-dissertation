import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import {
  faChevronRight,
  faEnvelope,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import QualificationDetail from "./QualificationDetail";
import AwardDetail from "./AwardDetail";
import { getSinglePortfolio } from "./getSinglePortfolio";
import { GlobalContext } from "../../Context/global";
import { makeCommentData } from "./makeCommentData";
import Spinner from "../AboutNumbers/Spinner";

const initialCommentForm = {
  score: 0,
  message: "",
  error: null,
};

const FreelancerDetail = () => {
  const { role, username, token, loading } = useContext(GlobalContext);
  const [portfolio, setPortfolio] = useState();
  const [commentForm, setCommentForm] = useState(initialCommentForm);
  const [error, setError] = useState(null);
  const params = useParams();
  const qualifications = [];
  const experiences = [];
  const user = [];
  let skills = [];
  let advancedKnowledgeBulletins = [];
  let isInArray;

  useEffect(() => {
    getSinglePortfolio(params.id, setPortfolio);
  }, []);

  if (portfolio !== undefined) {
    isInArray = portfolio.data.attributes.hiredBy.find(
      (name) => name === username
    );

    skills = portfolio.data.attributes.skills.split(", ");
    advancedKnowledgeBulletins =
      portfolio.data.attributes.advancedKnowledgeBulletins.split(", ");
    portfolio.included.map((include) => {
      if (include.type === "qualification") {
        return qualifications.push(include.attributes);
      }
      if (include.type === "experience") {
        return experiences.push(include.attributes);
      }
      if (include.type === "user") {
        return user.push(include.attributes);
      }
      return null;
    });
  }

  const handleCommentFormChange = (e) => {
    e.preventDefault();

    setCommentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(
        `http://apizavrsni.udruga-liberato.hr/api/v1/portfolios/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => window.location.reload())
      .catch(() => setError(true));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://apizavrsni.udruga-liberato.hr/api/v1/comment",
        makeCommentData(
          portfolio.data.id,
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
        {portfolio && portfolio.data.attributes.comments.length > 0 && (
          <div>
            <small className="small text-muted">
              Average score is{" "}
              {portfolio.data.attributes.averageScore.toFixed(2)}
              /5
            </small>
            {portfolio.data.attributes.comments.map((comment) => {
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

  const handleScoreChange = (value) => (e) => {
    e.preventDefault();

    setCommentForm((prev) => ({
      ...prev,
      score: value,
    }));
  };

  const renderCommentForm = () => {
    return (
      <div className="container pb-3">
        <h6 className="text-muted text-uppercase pb-2">Comment form</h6>
        <form className="form-group" onSubmit={handleCommentSubmit}>
          <div className="row">
            <small className="text-muted small ml-2">
              Rate your relation with this freelancer
            </small>
            <ul className="d-flex">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <li onClick={handleScoreChange(1)}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={
                    commentForm.score === 1 ||
                    commentForm.score === 2 ||
                    commentForm.score === 3 ||
                    commentForm.score === 4 ||
                    commentForm.score === 5
                      ? "gold"
                      : "gray"
                  }
                  size="lg"
                  className="mr-1 star"
                />
              </li>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <li onClick={handleScoreChange(2)}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={
                    commentForm.score === 2 ||
                    commentForm.score === 3 ||
                    commentForm.score === 4 ||
                    commentForm.score === 5
                      ? "gold"
                      : "gray"
                  }
                  size="lg"
                  className="mr-1 star"
                />
              </li>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <li onClick={handleScoreChange(3)}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={
                    commentForm.score === 3 ||
                    commentForm.score === 4 ||
                    commentForm.score === 5
                      ? "gold"
                      : "gray"
                  }
                  size="lg"
                  className="mr-1 star"
                />
              </li>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <li onClick={handleScoreChange(4)}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={
                    commentForm.score === 4 || commentForm.score === 5
                      ? "gold"
                      : "gray"
                  }
                  size="lg"
                  className="mr-1 star"
                />
              </li>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <li onClick={handleScoreChange(5)}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={commentForm.score === 5 ? "gold" : "gray"}
                  size="lg"
                  className="mr-1 star"
                />
              </li>
            </ul>
          </div>
          <div className="row ">
            <textarea
              name="message"
              id="message"
              className="form-control"
              placeholder="Your comment..."
              onChange={handleCommentFormChange}
              value={commentForm.message}
            />
          </div>
          {commentForm.message.trim() === "" && (
            <small className="small text-danger">Message is required!</small>
          )}
          <button
            className="btn btn-outline-primary fa-pull-right mt-3"
            type="submit"
            onClick={handleCommentSubmit}
            disabled={commentForm.message.trim() === ""}
          >
            Comment
          </button>
        </form>
      </div>
    );
  };

  const renderBody = () => {
    return (
      <section className="gray-bg ">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="_job_detail_box">
                <div className="_wrap_box_slice">
                  <div className="_job_detail_single">
                    <h4>About User</h4>
                    <p>{user[0].about}</p>
                  </div>

                  <div className="_job_detail_single">
                    <h4>Advance Knowledge</h4>
                    <p>{portfolio.data.attributes.advancedKnowledge}</p>
                    <ul>
                      {advancedKnowledgeBulletins.map((bulletin, index) => {
                        return (
                          <li key={index}>
                            <FontAwesomeIcon icon={faChevronRight} />
                            {bulletin}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="_job_detail_single">
                    <h4>Skill & Experience</h4>
                    <ul className="skilss">
                      {skills.map((skill) => {
                        return (
                          <li key={skill}>
                            <a href="/">{skill}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {experiences.length > 0 && (
                  <div className="_wrap_box_slice">
                    <div className="_job_detail_single">
                      <h4>Award & Experience</h4>
                      <ul className="qa-skill-list">
                        {experiences.map((experience, index) => {
                          return (
                            <AwardDetail key={index} expirience={experience} />
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}

                {qualifications.length > 0 && (
                  <div className="_wrap_box_slice">
                    <div className="_job_detail_single">
                      <h4>Education & Qualification</h4>
                      <ul className="qa-skill-list">
                        {qualifications.map((qualification, index) => {
                          return (
                            <QualificationDetail
                              key={index}
                              qualification={qualification}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {commentForm.error && (
                <h4 className="text-danger">Your comment can not be added! </h4>
              )}
              {isInArray && renderCommentForm()}
              {renderComments()}
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="_jb_summary light_box">
                <div className="_jb_summary_thumb">
                  <img
                    src={`http://apizavrsni.udruga-liberato.hr${user[0].avatar}`}
                    className="img-fluid circle"
                    alt=""
                  />
                </div>
                <div className="_jb_summary_caption">
                  <h4>{user[0].username}</h4>
                  <span>{user[0].occupation}</span>
                </div>
                <div className="_jb_summary_body">
                  {role === "ROLE_EMPLOYER" ? (
                    <div className="_view_dis_908">
                      <Link to={`/freelancers/${params.id}/hire-now`}>
                        <button type="button" className="btn btn-primary w-100">
                          Hire now
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <small className="text-dark text-center">
                      Login with company account to hire this freelancer!
                    </small>
                  )}
                  <div className="row justify-content-center">
                    <small className="text-muted mt-2">
                      This freelancer is hired{" "}
                      {portfolio.data.attributes.hiredBy.length} times.
                    </small>
                  </div>
                  <div className="d-flex justify-content-center">
                    {role === "ROLE_ADMIN" && (
                      <p>
                        Hired by:{" "}
                        <small>
                          {portfolio.data.attributes.hiredBy.map(
                            (company) => company
                          )}
                        </small>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="_jb_summary light_box p-4">
                <h4>User Info</h4>
                <ul>
                  <li>
                    Location:
                    <span>
                      {user[0].address}, {user[0].city}
                    </span>
                  </li>
                  <li>
                    Rate:
                    <span>${portfolio.data.attributes.rate} hourly</span>
                  </li>
                  <li>
                    Hours:
                    <span>{portfolio.data.attributes.hour}h/week</span>
                  </li>
                  <li>
                    Disability percent:{" "}
                    <span>{portfolio.data.attributes.disabilityPercent}%</span>
                  </li>
                </ul>
              </div>

              <div className="_jb_summary light_box p-4">
                <h4>Social Info</h4>
                <ul className="shares_jobs">
                  {user[0].facebook && (
                    <li>
                      <a
                        target="_blank"
                        href={user[0].facebook}
                        className="share fb"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    </li>
                  )}
                  {user[0].twitter && (
                    <li>
                      <a
                        target="_blank"
                        href={user[0].twitter}
                        className="share tw"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </li>
                  )}
                  {user[0].linkedin && (
                    <li>
                      <a
                        target="_blank"
                        href={user[0].linkedin}
                        className="share ln"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </li>
                  )}
                  <li>
                    <a href={`mailto: ${user[0].email}`} className="share ln">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : user.length < 1 ? (
        "Loading"
      ) : (username === user[0].username || role === "ROLE_ADMIN") &&
        portfolio.data.attributes.deletedAt === null ? (
        <>
          <div className="container mt-5">
            {error && (
              <h4 className="text-danger">
                Something went wrong and portfolio is not deactivated.
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
      ) : portfolio.data.attributes.deletedAt === null ? (
        renderBody()
      ) : (
        <div className="deactivated">
          <h3 className="text-danger text-center">
            This portfolio portfolio is deactivated
          </h3>
        </div>
      )}
    </>
  );
};
export default FreelancerDetail;
