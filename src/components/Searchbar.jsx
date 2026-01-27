import React from "react";

const Searchbar = () => {
  return (
    <div className="input-group">
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
      />
      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>
    </div>
  );
};

export default Searchbar;
