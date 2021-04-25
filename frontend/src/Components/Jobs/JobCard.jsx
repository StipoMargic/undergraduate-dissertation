import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const JobCard = () => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="job_grid_01 shadow-lg">
        <div className="jb_types parttime">Part Time</div>
        <div className="jb_grid_01_thumb">
          <a href="employer-detail.html">
            <img
              src="https://via.placeholder.com/100x100"
              className="img-fluid"
              alt=""
            />
          </a>
        </div>
        <div className="jb_grid_01_caption">
          <h4 className="_jb_title">
            <a href="job-detail.html">WordPress Web Developer</a>
          </h4>
          <div className="_emp_jb">Bikker Inso Inc.</div>
        </div>
        <div className="jb_grid_01_footer">
          <div className="jb_grid_01_footer_flex">
            <div className="_lot_jb">
              <i className="ti-location-pin mr-1" />
              Lucknow, UP
            </div>
          </div>
          <div className="jb_grid_01_footer_right">
            <Link to="/" className="btn btn-outline-primary">
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
