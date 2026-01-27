import React from "react";
import Select from "react-select";

const ReactSelect = ({
  label,
  name,
  isMulti = false,
  value,
  onChange,
  options,
  placeholder,
  id = name,
  ...rest
}) => {
  return (
    <div className="mb-2">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <Select
        isMulti={isMulti}
        inputId={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        classNamePrefix="react-select" // Adds a CSS prefix so we can easily style react-select components
        menuPortalTarget={document.body} // Renders the dropdown menu in <body> to prevent it from being hidden inside modals or overflow containers
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} // Increases dropdown z-index so it appears above modals and other UI layers
        {...rest}
      />
    </div>
  );
};

export default ReactSelect;
