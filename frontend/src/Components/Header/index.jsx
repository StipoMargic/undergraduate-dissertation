import "./styles.scss"
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faKey, faUser, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/images/logo.png";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const renderSignInModal = () => {
    return (
      <div>
        <div className="modal-open" id="login" tabIndex="-1" role="dialog" aria-labelledby="registermodal"
             aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
            <div className="modal-content" id="registermodal">
              <div className="modal-header">
                <h4>Sign In</h4>
                <button type="button" onClick={() => setSignIn(false)} className="close" aria-label="Close"><span
                  aria-hidden="true"><FontAwesomeIcon icon={faWindowClose} size="2x" color="red"/></span></button>
              </div>
              <div className="modal-body">

                <div className="login-form">
                  <form>

                    <div className="form-group">
                      <label>User Name</label>
                      <input type="text" className="form-control" placeholder="Username"/>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="*******"/>
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-lg w-100">Login</button>
                    </div>

                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <div className="mf-link"><FontAwesomeIcon icon={faUser}/> Haven't An Account?<a

                  className="theme-cl"> Sign
                  Up</a></div>
                <div className="mf-forget ml-2"><a href="#"><FontAwesomeIcon icon={faKey}/> Forget Password</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="header header-transparent dark-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <nav id="navigation" className="navigation navigation-landscape">
                <div className="nav-header">
                  <a className="nav-brand" href="#">
                    <img src={logo} className="logo" alt=""/>
                  </a>
                </div>
                <div className="nav-menus-wrapper">
                  <ul className="nav-menu">

                    <li className="active"><a href="#">Home</a></li>

                    <li><a href="#">Explore</a></li>

                    <li><a href="dashboard.html">Dashboard</a></li>

                    <li onMouseOver={() => setDropdown(true)}
                        onMouseOut={() => setDropdown(false)}><a href="#">Pages <FontAwesomeIcon icon={faChevronDown}/></a>
                      <ul className={`nav-dropdown nav-submenu ${dropdown ? "show-dropdown" : ""}`}>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQ's</a></li>
                      </ul>
                    </li>

                  </ul>

                  <ul className="nav-menu align-to-right">
                    <li onClick={() => setSignIn(true)}>
                      <a>
                        <FontAwesomeIcon icon={faUser}/> Sign in
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"/>
      {signIn ? renderSignInModal() : ""}
    </>
  );
}
export default Header;
