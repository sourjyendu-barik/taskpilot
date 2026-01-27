import React from "react";

const TextArea = ({ name, onChange, value, placeholder, label, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label} : </label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        className="form-control"
        placeholder={placeholder}
        {...rest}
      ></textarea>
    </div>
  );
};

export default TextArea;
