import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import {
  faList,
  faMedal,
  faSmile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../Context/global";

const AboutNumbers = () => {
  const { jobs, portfolios } = useContext(GlobalContext);

  return (
    <section className="gray-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Power Success For <span className="theme-cl-2">Brand</span>
              </h2>
              <p>Some numbers that maybe will intrigue you</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="achievement-wrap">
              <div className="achievement-content">
                <div className="ache-icon purple">
                  <FontAwesomeIcon icon={faList} />
                </div>
                <h4>
                  <span className="cto">{jobs.length}</span>
                </h4>
                <p>Jobs Posted</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="achievement-wrap">
              <div className="achievement-content">
                <div className="ache-icon green">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <h4>
                  <span className="cto">{portfolios.length}</span>
                </h4>
                <p>Total Freelancers</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="achievement-wrap">
              <div className="achievement-content">
                <div className="ache-icon yellow">
                  <FontAwesomeIcon icon={faMedal} />
                </div>
                <h4>
                  <span className="cto">7</span>
                </h4>
                <p>Win Awards</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="achievement-wrap">
              <div className="achievement-content">
                <div className="ache-icon red">
                  <FontAwesomeIcon icon={faSmile} />
                </div>
                <h4>
                  <span className="cto">{jobs.length + portfolios.length}</span>
                </h4>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNumbers;
