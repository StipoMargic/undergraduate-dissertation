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
import logo from "../../Assets/images/logo.png";
import { makeLoginData } from "./makeLoginData";
import { GlobalContext } from "../../Context/global";

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
  const [signIn, setSignIn] = useState(false);
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

  const handleSignIn = (value) => {
    setSignIn(value);
  };

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

        setSignIn(false);

        history.push("/");
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
          className="modal-open"
          id="login"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="registermodal"
          aria-hidden="true"
          onFocusIn={() => handleSignIn(false)}
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
                    <li className={pathname === "/" ? "active" : ""}>
                      <Link to="/">Home </Link>
                    </li>

                    {role !== "ROLE_USER" && (
                      <li
                        className={pathname === "/freelancers" ? "active" : ""}
                      >
                        <Link to="/freelancers">Freelancers</Link>
                      </li>
                    )}

                    {role !== "ROLE_EMPLOYER" && (
                      <li className={pathname === "/jobs" ? "active" : ""}>
                        <Link to="/jobs">Jobs</Link>
                      </li>
                    )}

                    <li className={pathname === "/about" ? "active" : ""}>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li className={pathname === "/contact" ? "active" : ""}>
                      <Link to="/contact">Contact Us</Link>
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
                        <Link to={`/profile/${username}`}>
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
                      </li>
                      {role === "ROLE_ADMIN" ? (
                        <li>
                          <Link to="/admin">
                            <button type="button" className="btn btn-danger">
                              Admin
                            </button>
                          </Link>
                        </li>
                      ) : role === "ROLE_EMPLOYER" || role === "ROLE_USER" ? (
                        <li>
                          <Link to="/add-job">
                            <button className="btn btn-primary" type="button">
                              Add job ad
                            </button>
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
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
