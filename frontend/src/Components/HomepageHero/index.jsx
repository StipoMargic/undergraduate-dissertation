import React, { useState } from "react";
import "./styles.scss";
import { useHistory } from "react-router";
import heroPicture from "../../Assets/images/a-2.png";

const HomepageHero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm === "") {
      setError("Can't be empty!");
    } else {
      history.push(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="hero-banner full jumbo-banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-8">
            <div className="header-promo light w-inline-block">
              <div className="label bg-success">NEW</div>
              <div className="header-promo-text">
                Liberato is launching new app
              </div>
            </div>
            <h1>
              Find <span className="text-info">your job</span> & make sure goal!
            </h1>
            <p className="lead">Your dream job is waiting for you.</p>
            <form
              onSubmit={(e) => handleSearch(e)}
              className="search-big-form banner-search shadow mt-3 mb-2"
            >
              <div className="row pt-2 pl-4">
                <div className="col-lg-8 col-md-8 col-sm-12 p-0">
                  <div className="form-group">
                    <i className="ti-search" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control b-0 b-r l-radius"
                      placeholder="Enter company name..."
                    />
                  </div>
                  {error !== "" && (
                    <small className="small text-danger mb-2 ml-2">
                      {error}
                    </small>
                  )}
                </div>

                <div className="col-lg-2 col-md-3 col-sm-12 p-0">
                  <button
                    type="submit"
                    onClick={(e) => handleSearch(e)}
                    className="btn btn-outline-primary ml-4"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
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
