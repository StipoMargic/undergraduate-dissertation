import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../Assets/images/logo.png";

const Footer = () => {
  return (
    <div className="sticky-footer">
      <footer className="dark-footer skin-dark-footer">
        <div>
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
              <div className="col-lg-2 col-md-4">
                <div className="footer-widget">
                  <h4 className="widget-title">Useful links</h4>
                  <ul className="footer-menu">
                    <li>
                      <a href="/">About Us</a>
                    </li>
                    <li>
                      <a href="/">FAQs Page</a>
                    </li>
                    <li>
                      <a href="/">Checkout</a>
                    </li>
                    <li>
                      <a href="/">Login</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-4">
                <div className="footer-widget">
                  <h4 className="widget-title">Developers</h4>
                  <ul className="footer-menu">
                    <li>
                      <a href="/">Booking</a>
                    </li>
                    <li>
                      <a href="/">Stays</a>
                    </li>
                    <li>
                      <a href="/">Adventures</a>
                    </li>
                    <li>
                      <a href="/">Author Detail</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-4">
                <div className="footer-widget">
                  <h4 className="widget-title">Useful links</h4>
                  <ul className="footer-menu">
                    <li>
                      <a href="/">About Us</a>
                    </li>
                    <li>
                      <a href="/">Jobs</a>
                    </li>
                    <li>
                      <a href="/">Events</a>
                    </li>
                    <li>
                      <a href="/">Press</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-4">
                <div className="footer-widget">
                  <h4 className="widget-title">Useful links</h4>
                  <ul className="footer-menu">
                    <li>
                      <a href="/">Support</a>
                    </li>
                    <li>
                      <a href="/">Contact Us</a>
                    </li>
                    <li>
                      <a href="/">Privacy &amp; Terms</a>
                    </li>
                  </ul>
                </div>
              </div>
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
      </footer>
    </div>
  );
};

export default Footer;
