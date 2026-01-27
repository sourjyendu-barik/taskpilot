import React from "react";
import ReactSelect from "./ReactSelect";
const SelectStatus = ({ value, onChange }) => {
  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Blocked", label: "Blocked" },
  ];

  return (
    <>
      <ReactSelect
        label="Select a status: "
        name="status"
        isMulti={false}
        value={value}
        onChange={onChange}
        options={statusOptions}
        placeholder="select project"
      />
    </>
  );
};

export default SelectStatus;
