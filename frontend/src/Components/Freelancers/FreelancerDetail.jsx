import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useParams } from "react-router";
import QualificationDetail from "./QualificationDetail";
import AwardDetail from "./AwardDetail";
import { getSinglePortfolio } from "./getSinglePortfolio";

const FreelancerDetail = () => {
  const [portfolio, setPortfolio] = useState();
  const params = useParams();
  const qualifications = [];
  const experiences = [];
  const skills = [];

  useEffect(() => {
    getSinglePortfolio(params.id, setPortfolio);
  }, []);

  if (portfolio !== undefined) {
    skills.push(portfolio.data.attributes.skills.split(","));
    portfolio.included.map((include) => {
      if (include.type === "qualification") {
        return qualifications.push(include.attributes);
      }
      if (include.type === "experience") {
        return experiences.push(include.attributes);
      }
      return null;
    });
  }

  return (
    <section className="gray-bg py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="_job_detail_box">
              <div className="_wrap_box_slice">
                <div className="_job_detail_single">
                  <h4>About User</h4>
                  <p>
                    We are one of the leading manufacturers and exporters of
                    finished leather goods from Calcutta, India for the last 20
                    years. We are a 100% EOU and manufacture leather goods for
                    global brands worldwide. We maintain strict quality
                    parameters and ensure total employee retention and
                    satisfaction.
                  </p>
                </div>

                <div className="_job_detail_single">
                  <h4>Advance Knowledge</h4>
                  <p>
                    We&apos;re looking for someone with the creative spark, eye
                    for illustration and design, passion for graphics and
                    ability to produce high quality design collaterals
                    end-to-end.
                  </p>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faChevronRight} />
                      Draft mockups of website designs, brochures, iconography,
                      and any other marketing materials required
                    </li>
                    <li>
                      Collaborate with marketing teams and management to discuss
                      which mockups are effective, and use their feedback to
                      develop final drafts
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faChevronRight} />
                      Revise the work of previous designers to create a unified
                      aesthetic for our brand materials
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faChevronRight} />
                      Work on multiple projects at once, and consistently meet
                      draft deadlines
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faChevronRight} />
                      Communicate frequently with clients to update them on the
                      progress of the project and to answer any questions they
                      might have
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
                      Revise the work of previous designers to create a unified
                      aesthetic for our brand materials
                    </li>
                    <li>Other duties as requested</li>
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
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="_jb_summary light_box">
              <div className="_jb_summary_thumb">
                <img
                  src="https://via.placeholder.com/400x400"
                  className="img-fluid circle"
                  alt=""
                />
              </div>
              <div className="_jb_summary_caption">
                <h4>Adam Mils Malhotra</h4>
                <span>IOS Developer</span>
              </div>
              <div className="_jb_summary_body">
                <div className="_view_dis_908">
                  <a href="/" className="btn btn-primary w-100">
                    Hire Now
                  </a>
                </div>
              </div>
            </div>

            <div className="_jb_summary light_box p-4">
              <h4>User Info</h4>
              <ul>
                <li>
                  Location:<span>Canada, USA</span>
                </li>
                <li>
                  Salary:<span>$40k - $80k</span>
                </li>
                <li>
                  Rate:<span>$20-$25 hourly</span>
                </li>
                <li>
                  Hours:<span>45h/week</span>
                </li>
              </ul>
            </div>

            <div className="_jb_summary light_box p-4">
              <h4>Social Info</h4>
              <ul className="shares_jobs">
                <li>
                  <a href="/" className="share fb">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a href="/" className="share tw">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="/" className="share gp">
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                </li>
                <li>
                  <a href="/" className="share ln">
                    <FontAwesomeIcon icon={faLinkedin} />
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

export default FreelancerDetail;
