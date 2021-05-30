import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faAward } from "@fortawesome/free-solid-svg-icons";

const AwardDetail = ({ expirience }) => {
  return (
    <>
      <li>
        <div className="qa-skill-box">
          <h4 className="qa-skill-title">
            <FontAwesomeIcon icon={faAward} className="award" />
            {expirience.jobTitle}
            <span className="qa-time">
              {expirience.yearStart} - {expirience.yearEnd}
            </span>
          </h4>
          <h5 className="qa-subtitle">todo firma</h5>
          <div className="qa-content">
            <p>{expirience.description}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default AwardDetail;
