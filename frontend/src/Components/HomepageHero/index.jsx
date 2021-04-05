import React from "react";
import heroPicture from "../../Assets/images/a-2.png";
import "./styles.scss";

const HomepageHero = () => {
  return (
    <div className="hero-banner full jumbo-banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-8">
            <a href="/" className="header-promo light w-inline-block">
              <div className="label bg-success">NEW</div>
              <div className="header-promo-text">
                Liberato is launching new app
              </div>
            </a>
            <h1>
              Find <span className="text-info">your job</span> & make sure goal!
            </h1>
            <p className="lead">Your dream job is waiting for you.</p>
            <form className="search-big-form banner-search shadow mt-3 mb-2">
              <div className="row pt-2 pl-4">
                <div className="col-lg-8 col-md-8 col-sm-12 p-0">
                  <div className="form-group">
                    <i className="ti-search" />
                    <input
                      type="text"
                      className="form-control b-0 b-r l-radius"
                      placeholder="Job Title or Keywords"
                    />
                  </div>
                </div>

                <div className="col-lg-2 col-md-3 col-sm-12 p-0">
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-sm dark-3 full-width ml-4"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
            <div className="featured-category dark">
              <ul>
                <li>Browse Category:</li>
                <li>
                  <a href="/">Banking</a>
                </li>
                <li>
                  <a href="/">Healthcare</a>
                </li>
                <li>
                  <a href="/">Software</a>
                </li>
                <li>
                  <a href="/">Automotive</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-5 col-md-4">
            <img
              src={heroPicture}
              alt="latest property"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
