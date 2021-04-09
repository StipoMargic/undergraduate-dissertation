import React from "react";
import "./styles.scss";

const Team = () => {
  return (
    <section className="min-sec">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="sec-heading">
              <h2>
                Our Professional <span className="theme-cl-2">Team</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="team-grid shadow-lg">
              <div className="teamgrid-user">
                <img
                  src="https://via.placeholder.com/400x400"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <div className="teamgrid-content">
                <h4>Stipo Margić</h4>
                <span>Student</span>
              </div>

              <div className="teamgrid-social">
                <ul>
                  <li>
                    <a href="/" className="f-cl" tabIndex="0">
                      <i className="ti-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="/" className="t-cl" tabIndex="0">
                      <i className="ti-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="/" className="i-cl" tabIndex="0">
                      <i className="ti-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="/" className="l-cl" tabIndex="0">
                      <i className="ti-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="team-grid shadow-lg">
              <div className="teamgrid-user">
                <img
                  src="https://via.placeholder.com/400x400"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <div className="teamgrid-content">
                <h4>Marina Rodić</h4>
                <span>Mentor</span>
              </div>

              <div className="teamgrid-social">
                <ul>
                  <li>
                    <a href="/" className="f-cl" tabIndex="0">
                      <i className="ti-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="/" className="t-cl" tabIndex="0">
                      <i className="ti-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="/" className="i-cl" tabIndex="0">
                      <i className="ti-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="/" className="l-cl" tabIndex="0">
                      <i className="ti-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
