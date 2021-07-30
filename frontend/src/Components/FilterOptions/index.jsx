import React, { useContext } from "react";
import { GlobalContext } from "../../Context/global";
import "./styles.scss";

const FilterOptions = ({ options, type }) => {
  const { setPortfolioFilter, setJobFilter } = useContext(GlobalContext);

  return (
    <div className="row position-relative filter-row">
      <div className="filter-options">
        <label htmlFor="filter">Filter: </label>
        <select
          id="filter"
          className="form-control"
          onChange={(e) =>
            type === "portfolios"
              ? setPortfolioFilter(e.target.value)
              : setJobFilter(e.target.value)
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
  );
};
export default FilterOptions;
