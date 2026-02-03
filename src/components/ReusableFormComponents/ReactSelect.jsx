import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
const ReactSelect = ({
  label,
  name,
  isMulti = false,
  value,
  onChange,
  options,
  placeholder,
  id = name,
  isCreatable = false,
  ...rest
}) => {
  const Component = isCreatable ? CreatableSelect : Select;

  return (
    <div className="mb-2">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}

      <Component
        isMulti={isMulti}
        inputId={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPlacement="auto"
        {...rest}
      />
    </div>
  );
};

export default ReactSelect;
