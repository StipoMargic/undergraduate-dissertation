import "./styles.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faKey,
  faUser,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/images/logo.png";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleDropdown = (value) => {
    setDropdown(value);
  };
  const handleSignIn = (value) => {
    setSignIn(value);
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
                  <form>
                    <div className="form-group">
                      <label htmlFor="username">
                        User Name
                        <input
                          id="username"
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
                          id="password"
                          type="password"
                          className="form-control"
                          placeholder="*******"
                        />
                      </label>
                    </div>

                    <div className="form-group">
                      <button
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
                  <FontAwesomeIcon icon={faUser} /> Have not An Account?
                  <Link to="/login" className="theme-cl">
                    Sign Up
                  </Link>
                </div>
                <div className="mf-forget ml-2">
                  <Link to="/forget-password">
                    <FontAwesomeIcon icon={faKey} /> Forget Password
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
                      <Link to="/explore">Explore</Link>
                    </li>

                    <li>
                      <Link to="/explore">Explore</Link>
                    </li>

                    <li
                      onMouseOver={() => handleDropdown(true)}
                      onFocus={() => handleDropdown(true)}
                      onMouseOut={() => handleDropdown(false)}
                      onBlur={() => handleDropdown(false)}
                    >
                      <Link to="/explore">
                        Dropdown Pages <FontAwesomeIcon icon={faChevronDown} />
                      </Link>
                      <ul
                        className={`nav-dropdown nav-submenu ${
                          dropdown ? "show-dropdown" : ""
                        }`}
                      >
                        <li>
                          <Link to="/explore">Explore</Link>
                        </li>
                        <li>
                          <Link to="/explore">Explore</Link>
                        </li>
                        <li>
                          <Link to="/explore">Explore</Link>
                        </li>
                        <li>
                          <Link to="/explore">Explore</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <ul className="nav-menu align-to-right">
                    <li>
                      <button
                        type="button"
                        className="btn btn-outline-primary text-dark mr-4 mt-4"
                        onClick={() => handleSignIn(true)}
                      >
                        <FontAwesomeIcon icon={faUser} /> Sign in
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix" />
      {signIn ? renderSignInModal() : ""}
    </>
  );
};
export default Header;
