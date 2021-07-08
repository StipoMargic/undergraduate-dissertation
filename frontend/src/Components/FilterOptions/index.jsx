import React, { useContext } from "react";
import { GlobalContext } from "../../Context/global";
import "./styles.scss";

const FilterOptions = ({ options }) => {
  const { setFilter } = useContext(GlobalContext);

  return (
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
  );
};
export default FilterOptions;
