import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const QualificationDetail = () => {
  return (
    <>
      <li>
        <div className="qa-skill-box">
          <h4 className="qa-skill-title">
            <FontAwesomeIcon icon={faMedal} className="medal" size="3x" />
            Bachelor Degree
            <span className="qa-time">2010 - 2013</span>
          </h4>
          <div className="qa-content">
            <p>
              Experience with the responsive and adaptive design is strongly
              preferred. Also, an understanding of the entire web development
              process, including design, development, and deployment is
              preferred.
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default QualificationDetail;
