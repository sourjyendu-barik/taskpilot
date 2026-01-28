import React from "react";
const Searchbar = ({ placeholder, label, value, onChange }) => {
  return (
    <div className="input-group">
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        aria-label={label}
        value={value}
        onChange={onChange}
      />
      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>
    </div>
  );
};

export default Searchbar;
