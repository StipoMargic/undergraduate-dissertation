import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const JobCard = ({ id, job }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="job_grid_01 shadow-lg">
        <div className="jb_types parttime">{job.typeOfPosition}</div>
        <div className="jb_grid_01_thumb">
          <Link to={`/jobs/${id}`}>
            <img
              src="https://via.placeholder.com/100x100"
              className="img-fluid"
              alt=""
            />
          </Link>
        </div>
        <div className="jb_grid_01_caption">
          <h4 className="_jb_title">
            <Link to={`/jobs/${id}`}>{job.jobPositionName}</Link>
          </h4>
          <div className="_emp_jb">{job.name}</div>
        </div>
        <div className="jb_grid_01_footer">
          <div className="jb_grid_01_footer_flex">
            <div className="_lot_jb">
              <i className="ti-location-pin mr-1" />
              {job.location}
            </div>
          </div>
          <div className="jb_grid_01_footer_right">
            <Link to={`/freelancers/${id}`} className="btn btn-outline-primary">
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
