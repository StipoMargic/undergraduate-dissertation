import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faAward } from "@fortawesome/free-solid-svg-icons";

const AwardDetail = () => {
  return (
    <>
      <li>
        <div className="qa-skill-box">
          <h4 className="qa-skill-title">
            <FontAwesomeIcon icon={faAward} className="award" />
            Team Leader
            <span className="qa-time">2017 - 2019</span>
          </h4>
          <h5 className="qa-subtitle">Mingoo Infotech</h5>
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

export default AwardDetail;
