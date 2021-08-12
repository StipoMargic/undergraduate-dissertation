import React, { useContext, useState } from "react";
import { GlobalContext } from "../../Context/global";
import "./styles.scss";

const FilterOptions = ({ options, type }) => {
  const {
    setPortfolioFilter,
    setJobFilter,
    setPortfolioSort,
    setJobSort,
    jobSort,
    portfolioSort,
  } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "portfolios") {
      setPortfolioFilter(searchTerm);
    } else {
      setJobFilter(searchTerm);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mt-3 col-sm-12">
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2 w-75">
              <input
                type="text"
                placeholder={
                  type === "portfolios"
                    ? "Type what skill you are looking for..."
                    : "Type position name you want... (Cook, developer, etc.)"
                }
                className="form-control  mr-1 w-100"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-4 mt-3 col-sm-12">
          <select
            id="sort"
            className="form-control"
            onChange={(e) =>
              type === "portfolios"
                ? setPortfolioSort(e.target.value)
                : setJobSort(e.target.value)
            }
          >
            {type === "jobs" ? (
              <>
                {options.map((option, idx) => {
                  return (
                    <option
                      selected={option.value === jobSort}
                      key={idx}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  );
                })}
              </>
            ) : type === "portfolios" ? (
              <>
                {options.map((option, idx) => {
                  return (
                    <option
                      selected={option.value === portfolioSort}
                      key={idx}
                      value={option.value}
                    >
                      {option.text}
                    </option>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </select>
        </div>
      </div>
    </div>
  );
};
export default FilterOptions;
