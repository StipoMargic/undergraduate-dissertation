import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const FreelancerCard = () => {
  const id = 1;
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="_freelacers_120 large shadow_0">
        <div className="_freelancers_rate">$110 hourly</div>
        <div className="_freelacers_120_thumb">
          <img
            src="assets/img/verify.svg"
            className="verified"
            width="15"
            alt=""
          />
          <a href="/reelancer-detail.html">
            <img
              src="https://via.placeholder.com/400x400"
              className="img-fluid circle"
              alt=""
            />
          </a>
        </div>
        <div className="_freelacers_120_caption">
          <div className="_freelan_laft">
            <i className="ti-location-pin mr-1" />
            London, UK
          </div>
          <h4>
            <a href="/reelancer-detail.html">Samantha L. Breaux</a>
          </h4>
          <span className="_freel_spec">Magento Developer</span>
          <div className="_freelan_right">
            <strong>
              <i className="fa fa-star mr-1" />
              4.6
            </strong>
          </div>
        </div>
        <div className="_freelacers_120_body">
          <div className="_free0o9">
            <ul>
              <li>
                <span>HTML5</span>
              </li>
              <li>
                <span>CSS3</span>
              </li>
              <li>
                <span>PHP</span>
              </li>
              <li>
                <span>Bootstrap</span>
              </li>
              <li>
                <span>JavaScript</span>
              </li>
              <li>
                <span>3 More</span>
              </li>
            </ul>
          </div>
          <div className="_freelacers_121_foot">
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
