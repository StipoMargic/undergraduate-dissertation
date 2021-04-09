import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.scss";
import {
  faCar,
  faDesktop,
  faMoneyBill,
  faPhone,
  faPiggyBank,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import {
  faArtstation,
  faGoogleDrive,
} from "@fortawesome/free-brands-svg-icons";

const HomeTopCategory = () => {
  return (
    <section className="gray-light p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Popular Jobs <span className="theme-cl-2">Category</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faMoneyBill} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Accounting & Finance</a>
                </h3>
                <span>310 Jobs Found</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faArtstation} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Art & Design</a>
                </h3>
                <span>200 Jobs Found</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faCar} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Transportation</a>
                </h3>
                <span>100k Jobs Found</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faPhone} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Telecommunications</a>
                </h3>
                <span>507 Jobs Found</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faDesktop} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Designing & Multimedia</a>
                </h3>
                <span>10k Jobs Found</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faSchool} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Education Training</a>
                </h3>
                <span>102 Jobs Found</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faGoogleDrive} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Automotive Jobs</a>
                </h3>
                <span>45 Jobs Found</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="urip_cated shadow">
              <FontAwesomeIcon icon={faPiggyBank} size="3x" color="#0b85ec" />
              <div className="urip_cated_caps">
                <h3 className="cats_urip_title">
                  <a href="/">Banking Jobs</a>
                </h3>
                <span>32 Jobs Found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTopCategory;
