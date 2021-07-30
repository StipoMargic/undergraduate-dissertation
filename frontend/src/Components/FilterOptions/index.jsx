import React, { useContext, useState } from "react";
import { GlobalContext } from "../../Context/global";
import "./styles.scss";

const FilterOptions = ({ options, type }) => {
  const { setPortfolioFilter, setJobFilter, setPortfolioSort, setJobSort } =
    useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "portfolios") {
      setPortfolioFilter(searchTerm);
    } else if (type === "iobs") {
      setJobFilter(searchTerm);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 mt-3">
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={
                type === "portfolios"
                  ? "Type what skill you are looking for..."
                  : "Type position name you want... (Cook, developer, etc.)"
              }
              className="form-control w-75 mr-1"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              type="submit"
              className="btn btn-primary my-1"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-4 mt-3">
          <select
            id="sort"
            className="form-control"
            onChange={(e) =>
              type === "portfolios"
                ? setPortfolioSort(e.target.value)
                : setJobSort(e.target.value)
            }
          >
            {options.map((option, idx) => {
              return (
                <option key={idx} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
export default FilterOptions;
