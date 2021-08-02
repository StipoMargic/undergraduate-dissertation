import React, { useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/global";
import ScrollToTop from "../ScrollToTop";
import { COMPANY, FREELANCER } from "../../Constants/roles";
import logo from "../../Assets/images/logo.png";

const Footer = () => {
  const { role, username } = useContext(GlobalContext);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 pt-2">
              <img src={logo} className="img-fluid" width="120" alt="" />
              <p className="text-muted small">
                Kopilica 5, 21000 Split Croatia (local: Hrvatska)
              </p>
            </div>
            <div className="col-lg-2 col-md-6 foot-link">
              <Link to="/about">About us</Link>
            </div>
            {role === FREELANCER ? (
              <>
                <div className="col-lg-2 col-md-6 foot-link">
                  <Link to="/jobs">Jobs</Link>
                </div>
                <div className="col-lg-2 col-md-6 foot-link">
                  <Link to={`/profile/${username}`}>Profile</Link>
                </div>
              </>
            ) : role === COMPANY ? (
              <>
                <div className="col-lg-2 col-md-6 foot-link">
                  <Link to="/freelancers">Freelancers</Link>
                </div>
                <div className="col-lg-2 col-md-6 foot-link">
                  <Link to={`/profile/${username}`}>Profile</Link>
                </div>
              </>
            ) : (
              <>
                <div className="col-lg-2 col-md-6 foot-link">
                  <Link to="/freelancers">Freelancers</Link>
                </div>
                <div className="col-lg-2 col-md-6 foot-link">
                  <Link to="/jobs">Jobs</Link>1{" "}
                </div>
              </>
            )}
            <div className="col-lg-2 col-md-6 foot-link">
              <Link to="/contact">Contact us</Link>
            </div>
          </div>
          <small className="row d-flex justify-content-center align-items-center text-info small ">
            © {new Date().getFullYear()} LiberatoJob. Made By{" "}
            <a href="https://instagram.com/stipo.margic" className="mx-2">
              {" "}
              Stipo Margić{" "}
            </a>{" "}
            All Rights Reserved
          </small>
        </div>
        <ScrollToTop />
      </footer>
    </>
  );
};

export default Footer;
