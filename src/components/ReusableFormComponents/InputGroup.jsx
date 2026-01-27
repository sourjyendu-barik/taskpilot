import React from "react";

const InputGroup = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  id = name,
  autoComplete = "off",
  ...rest //this is for required disabled ect
}) => {
  return (
    <div className="mb-2">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...rest}
      />
    </div>
  );
};

export default InputGroup;
