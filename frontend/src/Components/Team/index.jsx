import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import stipo from "../../Assets/images/stipo.jpeg";

const Team = () => {
  return (
    <section className="min-sec">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Our Professional <span className="theme-cl-2">Team</span>
              </h2>
              <p>Meet people that makes LiberatoJob possible...</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="team-grid shadow-lg">
              <div className="teamgrid-user">
                <img src={stipo} alt="" className="img-fluid" />
              </div>

              <div className="teamgrid-content">
                <h4>Stipo Margić</h4>
                <span>Student</span>
              </div>

              <div className="teamgrid-social">
                <ul className="shares_jobs">
                  <li>
                    <a
                      target="_blank"
                      href="https://web.facebook.com/stipo.margic/"
                      className="share fb"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/stipo-margic-7922b817a/"
                      className="share ln"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>
                  <li>
                    <a href="mailto: stipo@liberato.io" className="share ln">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
