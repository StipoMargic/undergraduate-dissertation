import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

const Job = ({ id, name }) => {
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
        <div className="jb_types fulltime">Full Time</div>
        <div className="jb_grid_01_thumb">
          <img
            src="https://via.placeholder.com/100x100"
            className="img-fluid"
            alt="employer details"
          />
        </div>
        <div className="jb_grid_01_caption">
          <h4 className="_jb_title">
            <a href="job-detail.html">Nazoiv posla</a>
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
