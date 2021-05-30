import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const QualificationDetail = ({ qualification }) => {
  return (
    <>
      <li>
        <div className="qa-skill-box">
          <h4 className="qa-skill-title">
            <FontAwesomeIcon icon={faMedal} className="medal" size="3x" />
            {qualification.nameOfQualification}
            <span className="qa-time">
              {qualification.yearStart} - {qualification.yearEnd}
            </span>
          </h4>
          <div className="qa-content">
            <p>{qualification.description}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default QualificationDetail;
