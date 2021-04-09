import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import {
  faList,
  faMedal,
  faSmile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const AboutNumbers = () => {
  return (
    <section className="gray-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Power Success For <span className="theme-cl-2">Brand</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
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
                  <span className="cto">9.8</span>M
                </h4>
                <p>Listing Posted</p>
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
                  <span className="cto">200</span>K
                </h4>
                <p>Total Authors</p>
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
                  <span className="cto">99</span>K
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
                  <span className="cto">7.2</span>M
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
