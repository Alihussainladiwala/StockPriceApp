import React from "react";
import "./Filter.css";

function Filter({ list, onButtonClick }) {
  return (
    <div>
      <select
        name="stocks"
        id="stockId"
        className="filter"
        onChange={(e) => {
          onButtonClick(e.target.value);
        }}
      >
        <option value="All" key="All" className="filter-element">
          All
        </option>
        {list.map((ele) => (
          <option value={ele} key={ele} className="filter-element">
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
