import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const FreelancerCard = ({ id, portfolio }) => {
  const skills = portfolio.skills.split(", ");

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="_freelacers_120 large shadow_0">
        <div className="_freelancers_rate">${portfolio.rate} per hour</div>
        <div className="_freelacers_120_thumb">
          <Link to={`/freelancers/${id}`}>
            <img
              src={`http://apizavrsni.udruga-liberato.hr${portfolio.avatar}`}
              className="img-fluid circle"
              alt=""
            />
          </Link>
        </div>
        <div className="_freelacers_120_caption">
          <div className="_freelan_laft">
            <i className="ti-location-pin mr-1" />
            {portfolio.location}
          </div>
          <h4>
            <Link to={`/freelancers/${id}`}>{portfolio.user}</Link>
          </h4>
          <span className="_freel_spec">{portfolio.category}</span>
        </div>
        <div className="_freelacers_120_body">
          <div className="_free0o9">
            <ul>
              {skills.slice(0, 5).map((skill, idx) => {
                return (
                  <li key={idx}>
                    <span>{skill}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="_freelacers_121_foot">
            <div className="row justify-content-center mb-1">
              {portfolio.averageScore > 0 ? (
                <small className="small text-muted">
                  Average score is {portfolio.averageScore.toFixed(2)}/5
                </small>
              ) : (
                <small className="small text-muted">There is no score!</small>
              )}
            </div>
            <Link
              to={`/freelancers/${id}`}
              className="btn btn-outline-danger w-100"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FreelancerCard;
