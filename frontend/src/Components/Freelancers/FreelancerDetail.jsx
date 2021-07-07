import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
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

const FreelancerDetail = () => {
  const { role, username, token } = useContext(GlobalContext);
  const [portfolio, setPortfolio] = useState();
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

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://127.0.0.1:8000/api/v1/portfolios/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const renderCommentForm = () => {
    return (
      <div className="container">
        <h6 className="text-muted text-uppercase pb-2">Comment form</h6>
        <form className="form-group">
          <div className="row ">
            <div className="col-sm-3">
              <input
                type="number"
                name="star"
                id="star"
                className="form-control"
                placeholder="Score"
                min={0}
                max={5}
                step={1}
              />
            </div>
            <div className="col-sm-9">
              <textarea
                name="message"
                id="message"
                className="form-control"
                placeholder="Your comment..."
              />
            </div>
          </div>
          <button
            className="btn btn-outline-primary fa-pull-right mt-3"
            type="submit"
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

              {isInArray && renderCommentForm()}
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="_jb_summary light_box">
                <div className="_jb_summary_thumb">
                  <img
                    src={`http://127.0.0.1:8000${user[0].avatar}`}
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
                    Salary:<span>${portfolio.data.attributes.salary}</span>
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
      {user.length < 1 ? (
        "Loading"
      ) : username === user[0].username &&
        portfolio.data.attributes.deletedAt === null ? (
        <>
          <div className="container mt-5">
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
          <h3 className="text-danger">tHIS portfolio is deactivated</h3>
        </div>
      )}
    </>
  );
};
export default FreelancerDetail;
