import "./styles.scss";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLock,
  faUser,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../../Assets/images/logo.png";
import { makeLoginData } from "./makeLoginData";
import { GlobalContext } from "../../Context/global";

const loginInitData = {
  username: "",
  password: "",
};

const Header = () => {
  const { setTokenWithCookie, username } = useContext(GlobalContext);
  const [dropdown, setDropdown] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [loginData, setLoginData] = useState(loginInitData);
  const [loginError, setLoginError] = useState(false);

  const history = useHistory();
  const handleDropdown = (value) => {
    setDropdown(value);
  };
  const handleSignIn = (value) => {
    setSignIn(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", makeLoginData(loginData))
      .then((res) => {
        setTokenWithCookie(
          res.data.token,
          new Date().getDate(),
          res.data.username,
          res.data.role
        );

        setSignIn(false);

        history.push("/");
        window.location.reload();
      })
      .catch(() => setLoginError(true));
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
      <div>
        <div
          className="modal-open"
          id="login"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="registermodal"
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
                  onClick={() => handleSignIn(false)}
                  className="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <FontAwesomeIcon
                      icon={faWindowClose}
                      size="2x"
                      color="red"
                    />
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="login-form">
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label htmlFor="username">
                        User Name
                        <input
                          id="username"
                          onChange={onInputChange("username")}
                          type="text"
                          className="form-control"
                          placeholder="Username"
                        />
                      </label>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">
                        Password
                        <input
                          onChange={onInputChange("password")}
                          id="password"
                          type="password"
                          className="form-control"
                          placeholder="*******"
                        />
                      </label>
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
                  <FontAwesomeIcon icon={faUser} /> Have not An Account?
                  <Link to="/register" className="theme-cl">
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
      {signIn ? renderSignInModal() : ""}
      <div className="header header-transparent dark-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <nav
                id="navigation"
                className="mt-2 navigation navigation-landscape shadow-sm"
              >
                <div className="nav-header">
                  <a className="nav-brand" href="/">
                    <img src={logo} className="logo" alt="" />
                  </a>
                </div>
                <div className="nav-menus-wrapper">
                  <ul className="nav-menu">
                    <li className="active">
                      <Link to="/">Home </Link>
                    </li>

                    <li>
                      <Link to="/freelancers">Freelancers</Link>
                    </li>

                    <li>
                      <Link to="/jobs">Jobs</Link>
                    </li>

                    <li
                      onMouseOver={() => handleDropdown(true)}
                      onFocus={() => handleDropdown(true)}
                      onMouseOut={() => handleDropdown(false)}
                      onBlur={() => handleDropdown(false)}
                    >
                      <Link to="/about">
                        Liberato Job
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          style={{ marginLeft: "10px" }}
                        />
                      </Link>
                      <ul
                        className={`nav-dropdown nav-submenu ${
                          dropdown ? "show-dropdown" : ""
                        }`}
                      >
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  {!username ? (
                    <ul className="nav-menu align-to-right">
                      <li>
                        <button
                          type="button"
                          className="btn btn-outline-primary text-dark mr-2 mt-4"
                          onClick={() => handleSignIn(!signIn)}
                        >
                          <FontAwesomeIcon icon={faUser} /> Sign in
                        </button>
                      </li>
                      <li>
                        <Link to="/register">
                          <button
                            className="btn btn-primary text-light mr-4 mtminus"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faLock} /> Register
                          </button>
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="nav-menu align-to-right">
                      <li>
                        <Link to="/logout">
                          <button
                            type="button"
                            className="btn btn-outline-primary text-dark mr-2"
                          >
                            <FontAwesomeIcon icon={faUser} /> Logout
                          </button>
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix" />
    </>
  );
};
export default Header;
