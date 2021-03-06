import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

const Job = ({ id, name, position, typeOfPosition, image }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
      <div className="job_grid_02">
        <FontAwesomeIcon
          icon={faStar}
          className="_featured_jbs text-primary"
          size="2x"
        />
        <div className="jobs-like">
          <label htmlFor="check" className="toggler toggler-danger">
            <input type="checkbox" id="check" />
            <i className="fa fa-heart" />
          </label>
        </div>
        <div className="jb_types fulltime">{typeOfPosition}</div>
        <div className="jb_grid_01_thumb">
          <img
            src={`http://apizavrsni.udruga-liberato.hr/${image}`}
            className="img-fluid"
            alt="employer details"
          />
        </div>
        <div className="jb_grid_01_caption">
          <h4 className="_jb_title">
            <Link to={`jobs/${id}`}>{position}</Link>
          </h4>
          <div className="_emp_jb">{name}</div>
        </div>
        <div className="jb_grid_01_footer">
          <Link to={`jobs/${id}`} className="_jb_apply">
            View Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Job;
