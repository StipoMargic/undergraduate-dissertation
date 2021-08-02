/* eslint-disable no-unused-vars */
import "./styles.scss";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router";
import { makeLoginData } from "./makeLoginData";
import { GlobalContext } from "../../Context/global";
import logo from "../../Assets/images/logo.png";
import { ADMIN, COMPANY, FREELANCER } from "../../Constants/roles";

const loginInitData = {
  username: "",
  password: "",
};

function useOutsideAlerter(ref, setModal) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Header = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { setTokenWithCookie, role, username, removeAllCookies } =
    useContext(GlobalContext);
  const [, setSignIn] = useState(false);
  const [loginData, setLoginData] = useState(loginInitData);
  const [loginError, setLoginError] = useState(false);
  const ttl = Cookies.get("ttl");
  const loginRef = useRef();
  useOutsideAlerter(loginRef, setSignIn);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setSignIn(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  if (ttl !== "") {
    if (new Date(ttl * 1000).getTime() < new Date().getTime()) {
      removeAllCookies();
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://apizavrsni.udruga-liberato.hr/api/login",
        makeLoginData(loginData)
      )
      .then((res) => {
        setTokenWithCookie(
          res.data.token,
          res.data.timestamp,
          res.data.username,
          res.data.role
        );
        window.location.reload();
      })
      .catch(() => setLoginError(true));
    window.scrollTo(0, 0);
  };
  const onInputChange = (value) => (e) => {
    e.persist();

    setLoginData((prevState) => ({
      ...prevState,
      [value]: e.target.value,
    }));
  };

  const renderSignInModal = () => {
    return (
      <div ref={loginRef}>
        <div
          className="modal fade"
          id="loginModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered login-pop-form"
            role="document"
          >
            <div className="modal-content" id="registermodal">
              <div className="modal-header">
                <h4>Sign In</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faWindowClose} color="red" />
                </button>
              </div>
              <div className="modal-body">
                <div className="login-form">
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label htmlFor="username">User Name</label>
                      <input
                        id="username"
                        onChange={onInputChange("username")}
                        type="text"
                        className="w-100 form-control"
                        placeholder="Username"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        onChange={onInputChange("password")}
                        id="password"
                        type="password"
                        className="w-100 form-control"
                        placeholder="*******"
                      />
                    </div>

                    <div className="form-group">
                      <button
                        onClick={handleLogin}
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <div className="mf-link">
                  {loginError && (
                    <p className="text-danger">
                      Something went wrong! Try again...
                    </p>
                  )}
                  <FontAwesomeIcon icon={faUser} /> Not a member yet?
                  <Link to="/register" className="ml-1">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#F4F9FD" }}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">
              <img src={logo} style={{ width: "150px" }} alt="" />
            </a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className={pathname === "/" ? "active nav-item" : "nav-item"}>
                <Link className="nav-link" to="/">
                  Home{" "}
                </Link>
              </li>

              {role !== FREELANCER && (
                <li
                  className={
                    pathname === "/freelancers" ? "active nav-item" : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/freelancers">
                    Freelancers
                  </Link>
                </li>
              )}

              {role !== COMPANY && (
                <li
                  className={
                    pathname === "/jobs" ? "active nav-item" : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/jobs">
                    Jobs
                  </Link>
                </li>
              )}

              <li
                className={
                  pathname === "/about" ? "active nav-item" : "nav-item"
                }
              >
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li
                className={
                  pathname === "/contact" ? "active nav-item" : "nav-item"
                }
              >
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
            {username ? (
              <>
                <Link className="mr-2" to={`/profile/${username}`}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Hi {username}
                </Link>
                <Link to="/logout">
                  <button
                    type="button"
                    className="btn btn-outline-primary text-dark mr-1"
                  >
                    Logout
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#loginModal"
                  className="btn btn-outline-primary mr-1 my-2 my-sm-0"
                >
                  <FontAwesomeIcon icon={faUser} /> Sign in
                </button>
                <Link to="/register">
                  <button
                    className="btn btn-outline-success mr-1 my-2 my-sm-0"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faLock} /> Register
                  </button>
                </Link>
              </>
            )}
            {role === ADMIN ? (
              <Link to="/admin/analytics">
                <button type="button" className="btn btn-danger">
                  Admin
                </button>
              </Link>
            ) : role === COMPANY || role === FREELANCER ? (
              <Link to="/add-job">
                <button className="btn btn-primary" type="button">
                  Add job ad
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
      {renderSignInModal()}
    </>
  );
};
export default Header;
