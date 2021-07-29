import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import ScrollToTop from "../ScrollToTop";

const Footer = () => {
  return (
    <div className="sticky-footer">
      <footer className="dark-footer skin-dark-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <img
                  src={logo}
                  className="img-fluid f-logo"
                  width="120"
                  alt=""
                />
                <p>
                  Kopilica 5, 21000 Split
                  <br />
                  Croatia (local: Hrvatska)
                </p>
                <ul className="footer-bottom-social">
                  <li>
                    <a href="/">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 foot-link">
              <Link to="/about">About us</Link>
            </div>
            <div className="col-lg-2 col-md-6 foot-link">
              <Link to="/jobs">Jobs</Link>
            </div>
            <div className="col-lg-2 col-md-6 foot-link">
              <Link to="/freelancers">Freelancers</Link>
            </div>
            <div className="col-lg-2 col-md-6 foot-link">
              <Link to="/contact">Contact us</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12 text-center">
                <p className="mb-0">
                  © {new Date().getFullYear()} LiberatoJob. Made By{" "}
                  <a href="https://instagram.com/stipo.margic">Stipo Margić</a>{" "}
                  All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
        <ScrollToTop />
      </footer>
    </div>
  );
};

export default Footer;
