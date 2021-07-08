import React, { useContext } from "react";
import { GlobalContext } from "../../Context/global";
import "./styles.scss";

const FilterOptions = ({ options }) => {
  const { setFilter } = useContext(GlobalContext);

  return (
    <div className="row position-relative filter-row">
      <div className="filter-options">
        <label htmlFor="filter">Filter: </label>
        <select
          id="filter"
          className="form-control"
          onChange={(e) => setFilter(e.target.value)}
        >
          {options.map((option) => {
            return <option value={option.value}>{option.text}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
export default FilterOptions;
